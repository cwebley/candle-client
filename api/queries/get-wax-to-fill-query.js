module.exports = function getWaxToFillQuery(db, candles, cb) {
  const sql = `
    SELECT SUM(jr.wax_to_fill_line_ounces) as total
    FROM candles c
    JOIN jars j ON j.id = c.jar_id
    JOIN jar_reference jr ON jr.id = j.reference_id
    WHERE c.hash_id IN (?)
  `;

  db.query(sql, [candles], (err, result) => {
    if (err) {
      console.error(err, {
        sql,
        candles
      });
      return cb(err);
    }

    if (!result) {
      return cb();
    }

    return cb(null, result[0]);
  });
};
