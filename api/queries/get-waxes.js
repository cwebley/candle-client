module.exports = function getWaxes(db, { availableOnly = false }, cb) {
  let sql = `
        SELECT w.hash_id AS "hashId", w.weight_pounds AS "weightPounds",
        w.remaining, w.finished, wr.name, wr.slug, wr.id AS "referenceId", 
        wr.material, wr.flashpoint_temperature_fahrenheit AS "flashpointTemperatureFahrenHeit",
        wr.melting_temperature_fahrenheit AS "meltingTemperatureFahrenheit",
        wr.product_url AS "productUrl", wr.msds_url AS "msdsUrl", wr.info_url AS "infoUrl",
        s.id AS "supplierId", s.name AS "supplierName"
        FROM waxes w
        JOIN wax_reference wr ON wr.id = w.reference_id
        JOIN supplier_reference s ON wr.supplier_id = s.id
      `;
    if (availableOnly) {
        sql += ` WHERE finished != true`
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
