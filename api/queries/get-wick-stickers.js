module.exports = function getWickStickers(db, { availableOnly = false }, cb) {
  let sql = `
          SELECT w.hash_id AS "hashId", w.name, w.slug,
          w.order_id AS "orderId", w.count, w.remaining, w.finished
          FROM wick_stickers w
        `;
  if (availableOnly) {
    sql += ` WHERE finished != true`;
  }

  db.query(sql, [], (err, result) => {
    if (err) {
      console.error(err, {
        sql,
      });
      return cb(err);
    }

    if (!result) {
      return cb();
    }

    return cb(null, result);
  });
};
