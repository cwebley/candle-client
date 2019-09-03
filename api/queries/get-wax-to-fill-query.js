module.exports = function getWaxToFillQuery(db, candles, cb) {
  const sql = `
    SELECT SUM(j.wax_to_fill_line_ounces) as total
    FROM candles c
    JOIN jars j ON j.id = c.jar_id
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
