module.exports = function getAdditives(db, { availableOnly = false }, cb) {
  let sql = `
          SELECT a.hash_id AS "hashId", a.weight_ounces AS "weightOunces",
          a.remaining, a.finished, ar.name, ar.slug, ar.id AS "referenceId", 
          ar.flashpoint_temperature_fahrenheit AS "flashpointTemperatureFahrenHeit",
          ar.melting_temperature_fahrenheit AS "meltingTemperatureFahrenheit",
          ar.product_url AS "productUrl", ar.msds_url AS "msdsUrl", ar.info_url AS "infoUrl",
          s.id AS "supplierId", s.name AS "supplierName"
          FROM additives a
          JOIN additive_reference ar ON ar.id = a.reference_id
          JOIN supplier_reference s ON ar.supplier_id = s.id
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
