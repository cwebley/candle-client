module.exports = function getWickReferences(db, { supplierId }, cb) {
    let whereClause = "";
    let params = [];
  
    if (supplierId) {
      whereClause += `WHERE wr.supplier_id = ?`;
      params.push(supplierId);
    }
  
    let sql = `
        SELECT wr.id, wr.name, wr.slug, wr.series, wr.size,
          wr.product_url AS "productUrl", wr.msds_url AS "msdsUrl", wr.info_url AS "infoUrl",
          wr.notes FROM wick_reference wr
        ${whereClause} ORDER BY wr.name ASC
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
  