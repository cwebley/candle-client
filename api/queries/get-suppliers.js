module.exports = function getSuppliers(db, cb) {
  const sql = `
      SELECT id, name FROM supplier_reference ORDER BY name ASC
    `;

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
