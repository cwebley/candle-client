module.exports = function getDyes(db, { availableOnly = false }, cb) {
    let sql = `
            SELECT d.hash_id AS "hashId", d.weight_ounces AS "weightOunces",
            d.remaining, d.finished, dr.name, dr.slug, dr.id AS "referenceId",
            dr.color AS "color", dr.product_url AS "productUrl",
            dr.msds_url AS "msdsUrl", dr.info_url AS "infoUrl",
            s.id AS "supplierId", s.name AS "supplierName"
            FROM dyes d
            JOIN dye_reference dr ON dr.id = d.reference_id
            JOIN supplier_reference s ON dr.supplier_id = s.id
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
  