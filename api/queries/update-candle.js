const hashConfig = require("../hash-config");
const async = require("neo-async");
const slug = require("slug");

module.exports = function updateCandleQuery(db, candleHashId, candleData, cb) {
  const { burns, ...candleTableData } = candleData;

  if (burns && burns.length) {
    // if any of the burns have the "finished" property we'll add that to the candle update data
    candleTableData.finished = burns.some((b) => {
      return !!b.finished;
    });
  }

  // begin transaction
  db.beginTransaction((err) => {
    if (err) {
      console.error(err);
      return cb(err);
    }

    updateCandle(db, candleHashId, candleTableData, (err, results) => {
      if (err) {
        return rollback(db, err, cb);
      }

      insertBurnSessions(db, candleHashId, burns, (err, result) => {
        if (err) {
          return rollback(db, err, cb);
        }

        // end transaction
        db.commit((err) => {
          if (err) {
            return rollback(db, err, cb);
          }

          return cb(null, results);
        });
      });
    });
  });
};

function insertBurnSessions(db, candleHashId, burns, cb) {
  if (!burns || !burns.length) {
    return cb();
  }

  const internalSelect = `
    SELECT c.id, ?, ?, ?, ?
    FROM candles c
    WHERE c.hash_id = ?`;

  let sql = `
    INSERT INTO candles_burns
      (candle_id, when_started, when_stopped, stopped_weight_ounces, notes)
  `;
  let params = [];
  burns.forEach((b, i) => {
    if (i !== 0) {
      sql += ` UNION ALL `;
    }
    sql += internalSelect;
    params.push(
      b.whenStarted,
      b.whenStopped,
      b.stoppedWeightOunces,
      b.notes,
      candleHashId
    );
  });

  db.query(sql, params, (err, result) => {
    if (err) {
      console.error(err, {
        sql,
        params,
      });
      return cb(err);
    }
    if (!result.affectedRows) {
      err = new Error(
        "Failed to update candle burn sessions. No affected rows."
      );
      console.error(err, {
        sql,
        params,
      });
      return cb(err);
    }
    cb(null, result);
  });
}

function updateCandle(db, candleHashId, data, cb) {
  if (!data || !Object.keys(data).length) {
    return cb();
  }

  let params = [];
  let atLeastOneSet = false;

  // eventually we need to decrement the remaining column to keep inventories accurate
  let decrementFuncs = [];

  let joinBoxes = "";
  let setBoxes = "";
  if (data.boxHashId) {
    joinBoxes = `INNER JOIN (
      SELECT id FROM boxes
      WHERE hash_id = ?
    ) AS b`;
    params.push(data.boxHashId);
    setBoxes = `${atLeastOneSet ? ", " : ""} c.box_id = b.id`;
    atLeastOneSet = true;

    decrementFuncs.push((done) =>
      decrementResource(
        db,
        "boxes",
        { count: 1, hashId: data.boxHashId, finished: data.boxFinished },
        done
      )
    );
  }
  let joinLids = "";
  let setLids = "";
  if (data.lidHashId) {
    joinLids = `INNER JOIN (
      SELECT id FROM lids
      WHERE hash_id = ?
    ) AS l`;
    params.push(data.lidHashId);
    setLids = `${atLeastOneSet ? ", " : ""} c.lid_id = l.id`;
    atLeastOneSet = true;

    decrementFuncs.push((done) =>
      decrementResource(
        db,
        "lids",
        { count: 1, hashId: data.lidHashId, finished: data.lidFinished },
        done
      )
    );
  }
  let joinWarningLabels = "";
  let setWarningLabels = "";
  if (data.warningLabelHashId) {
    joinWarningLabels = `INNER JOIN (
      SELECT id FROM warning_labels
      WHERE hash_id = ?
    ) AS wl`;
    params.push(data.warningLabelHashId);
    setWarningLabels = `${
      atLeastOneSet ? ", " : ""
    } c.warning_label_id = wl.id`;
    atLeastOneSet = true;
    decrementFuncs.push((done) =>
      decrementResource(
        db,
        "warning_labels",
        {
          count: 1,
          hashId: data.warningLabelHashId,
          finished: data.warningLabelFinished,
        },
        done
      )
    );
  }
  let setCompletedCandleWeight = "";
  if (data.completedCandleWeightOunces) {
    setCompletedCandleWeight = `${
      atLeastOneSet ? ", " : ""
    } c.completed_candle_weight_ounces = ?`;
    atLeastOneSet = true;
    params.push(data.completedCandleWeightOunces);
  }
  let setColorDescription = "";
  if (data.colorDescription) {
    setColorDescription = `${
      atLeastOneSet ? ", " : ""
    } c.color_description = ?`;
    atLeastOneSet = true;
    params.push(data.colorDescription);
  }
  let setVolumeOverflowPercent = "";
  if (data.volumeOverflowPercent) {
    setVolumeOverflowPercent = `${
      atLeastOneSet ? ", " : ""
    } c.volume_overflow_percent = ?`;
    atLeastOneSet = true;
    params.push(data.volumeOverflowPercent);
  }
  let setFinished = "";
  if (data.finished === true || data.finished === false) {
    setFinished = `${atLeastOneSet ? ", " : ""} c.finished = ?`;
    atLeastOneSet = true;
    params.push(data.finished ? "1" : "0");
  }
  let setNotes = "";
  if (data.hasOwnProperty("notes")) {
    setNotes = `${atLeastOneSet ? ", " : ""} c.notes = ?`;
    atLeastOneSet = true;
    params.push(data.notes);
  }
  let setName = "";
  let setSlug = "";
  if (data.name) {
    setName = `${atLeastOneSet ? ", " : ""} c.name = ?`;
    atLeastOneSet = true;
    setSlug = `,  c.slug = ?`;
    params.push(data.name, slug(data.name, { lower: true }));
  }

  let sql = `
    UPDATE candles AS c
      ${joinBoxes}
      ${joinLids}
      ${joinWarningLabels}
    SET
      ${setBoxes}
      ${setLids}
      ${setWarningLabels}
      ${setCompletedCandleWeight}
      ${setColorDescription}
      ${setVolumeOverflowPercent}
      ${setFinished}
      ${setNotes}
      ${setName}
      ${setSlug}
    WHERE c.hash_id = ?
  `;

  params.push(candleHashId);

  db.query(sql, params, (err, result) => {
    if (err) {
      console.error(err, {
        sql,
        params,
      });
      return cb(err);
    }
    if (!result.affectedRows) {
      err = new Error("Failed to update candle. No affected rows.");
      return cb(err);
    }

    // finally, update the remaining column on each resource table for each candle
    async.parallel(decrementFuncs, (err, decrementResult) => {
      if (err) {
        return cb(err);
      }
      return cb(null, result);
    });
  });
}

function decrementResource(db, tableName, { count, hashId, finished }, cb) {
  let params = [count, hashId];

  // by default, don't touch the "finished" field
  let updateFinished = "";

  // if finished was checked, update that field
  // originally this set remaining to 0 also, but it seems unncessary to clear data--ruins future "undo" potential etc
  if (finished) {
    updateFinished = `, finished = ?`;
    params = [count, "1", hashId];
  }

  const sql = `
  UPDATE ${tableName}
    SET remaining = (remaining - ?)
    ${updateFinished}
    WHERE hash_id = ?
  `;

  db.query(sql, params, (err, decrementResult) => {
    if (err) {
      console.error(err, {
        sql,
        params,
      });
      return cb(err);
    }
    return cb(null, decrementResult);
  });
}

function rollback(db, err, cb) {
  db.rollback(() => {
    return cb(err);
  });
}
