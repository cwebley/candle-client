module.exports = function getJarReferences(db, { supplierId }, cb) {
    let whereClause = "";
    let params = [];
  
    if (supplierId) {
      whereClause += `WHERE jr.supplier_id = ?`;
      params.push(supplierId);
    }
  
    let sql = `
        SELECT jr.id, jr.name, jr.slug,
          jr.product_url AS "productUrl", jr.msds_url AS "msdsUrl", jr.info_url AS "infoUrl",
          jr.overflow_volume_ounces AS "overflowVolumeOunces",
          jr.wax_to_fill_line_ounces AS "waxToFillLineOunces",
          jr.wax_to_overflow_ounces AS "waxToOverflowOunces",
          jr.notes FROM jar_reference jr
        ${whereClause} ORDER BY jr.name ASC
      `;
  
    db.query(sql, params, (err, result) => {
      if (err) {
        console.error(err, {
          sql,
          params,
        });
        return cb(err);
      }
  
      if (!result) {
        return cb();
      }
  
      return cb(null, result);
    });
  };
  