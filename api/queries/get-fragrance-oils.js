module.exports = function getFragranceOils(db, { availableOnly = false }, cb) {
    let sql = `
          SELECT fo.hash_id AS "hashId", fo.weight_ounces AS "weightOunces",
          fo.remaining, fo.finished, fr.name, fr.slug, fr.id AS "referenceId", 
          fr.flashpoint_temperature_fahrenheit AS "flashpointTemperatureFahrenHeit",
          fr.specific_gravity AS "specificGravity",
          fr.product_url AS "productUrl", fr.msds_url AS "msdsUrl", fr.ifra_url AS "ifraUrl",
          fr.allergin_url AS "allerginUrl",
          fr.vanillin_percentage AS "vanillinPercentage",
          fr.ethyl_vanillin_percentage AS "ethylVanillinPercentage",
          s.id AS "supplierId", s.name AS "supplierName"
          FROM fragrance_oils fo
          JOIN fragrance_reference fr ON fr.id = fo.reference_id
          JOIN supplier_reference s ON fr.supplier_id = s.id
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
  