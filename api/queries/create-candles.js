const hashConfig = require("../hash-config");
const async = require("neo-async");
const slug = require("slug");

module.exports = function createCandles(db, candles, cb) {
  // begin transaction
  db.beginTransaction(err => {
    if (err) {
      console.error(err);
      return cb(err);
    }

    insertCandles(db, candles, (err, results) => {
      if (err) {
        console.error(err);
        return rollback(db, err, cb);
      }

      // end transaction
      db.commit(err => {
        if (err) {
          return rollback(db, err, cb);
        }

        return cb(null, results);
      });
    });
  });
};

function insertCandles(db, data, cb) {
  if (!data.length) {
    return cb();
  }

  const internalSelect = `
    SELECT ?, ?, j.id, ws.id, w.id, ?, ?, ?, ?
    FROM jars j, wick_stickers ws, wicks w
    WHERE j.hash_id = ? AND ws.hash_Id = ? AND w.hash_Id = ?
  `;
  let sql = `
      INSERT INTO candles
        (name, slug,
          jar_id, wick_sticker_id, wick_id,
        wick_count, wick_layout,
        finished, notes)
    `;
  let params = [];

  // keep track of each row because we have to make a separate call to decrement
  // the appropriate amount from the remaining column
  let decrementFuncs = [];
  data.forEach((d, i) => {
    if (i !== 0) {
      sql += ` UNION ALL `;
    }
    sql += internalSelect;
    params.push(
      d.name,
      slug(d.name, { lower: true }),
      d.wickCount,
      d.wickLayout,
      0,
      d.notes,
      d.jarHashId,
      d.wickStickerHashId,
      d.wickHashId
    );

    decrementFuncs.push(done =>
      decrementResource(db, "jars", 1, d.jarHashId, done)
    );
    decrementFuncs.push(done =>
      decrementResource(db, "wicks", d.wickCount, d.wickHashId, done)
    );
    decrementFuncs.push(done =>
      decrementResource(
        db,
        "wick_stickers",
        d.wickCount,
        d.wickStickerHashId,
        done
      )
    );
  });

  db.query(sql, params, (err, result) => {
    if (err) {
      console.error(err, {
        sql,
        params
      });
      return cb(err);
    }
    if (result.affectedRows !== data.length) {
      err = new Error("Failed to add candles to database");

      err.reasons = [
        {
          message: `Failed to post. Double check the hashIds.`
        }
      ];
      return cb(err);
    }

    // now insert the hashIds
    let rowIndices = [];
    for (let i = 0; i < result.affectedRows; i++) {
      rowIndices.push(result.insertId + i);
    }

    const candleIdArray = [];
    const updateFuncs = rowIndices.map(rowIndex => {
      // but save an object containing hashId and id to return to the client
      // if this transaction is successful
      const candleIds = {
        id: rowIndex,
        hashId: hashConfig.candles.encode(rowIndex)
      };
      candleIdArray.push(candleIds);

      return done => {
        const sql = `UPDATE candles SET hash_id = ? WHERE id = ?`;
        const params = [candleIds.hashId, candleIds.id];
        db.query(sql, params, (err, result) => {
          if (err) {
            console.error(err, {
              sql,
              params
            });
          }
          done(err, result);
        });
      };
    });
    async.parallel(updateFuncs, (err, hashUpdateResults) => {
      if (err) {
        return cb(err);
      }
      if (result.affectedRows !== data.length) {
        err = new Error("Failed to add candle hashIds to database");
        return cb(err);
      }

      // finally, update the remaining column on each resource table for each candle
      async.parallel(decrementFuncs, (err, decrementResult) => {
        if (err) {
          return cb(err);
        }
        return cb(null, candleIdArray);
      });
    });
  });
}

function decrementResource(db, tableName, count, hashId, cb) {
  const sql = `
  UPDATE ${tableName}
    SET remaining = (remaining - ?)
    WHERE hash_id = ?
  `;
  const params = [count, hashId];

  db.query(sql, params, (err, decrementResult) => {
    if (err) {
      console.error(err, {
        sql,
        params
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
