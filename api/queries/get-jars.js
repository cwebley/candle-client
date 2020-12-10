module.exports = function getJars(db, { availableOnly = false }, cb) {
    let sql = `
          SELECT j.hash_id AS "hashId", j.color, j.count, j.remaining,
          j.finished, jr.name, jr.slug, jr.id AS "referenceId",
          jr.product_url AS "productUrl", jr.msds_url AS "msdsUrl", jr.info_url AS "infoUrl",
          s.id AS "supplierId", s.name AS "supplierName"
          FROM jars j
          JOIN jar_reference jr ON jr.id = j.reference_id
          JOIN supplier_reference s ON jr.supplier_id = s.id
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
  