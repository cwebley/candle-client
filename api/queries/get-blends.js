module.exports = function getBlends(db, { availableOnly = false }, cb) {
  let sql = `
    SELECT b.id, b.hash_id AS "hashId", b.name, b.slug,
    b.total_wax_weight_ounces AS "totalWaxWeightOunces",
    b.total_additive_weight_ounces AS "totalAdditiveWeightOunces",
    b.remaining_ounces AS "remainingOunces",
    b.when_created AS "whenCreated",
    b.finished AS "finished"
    FROM blends b
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
