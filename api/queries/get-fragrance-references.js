module.exports = function getFragranceReferences(db, { supplierId }, cb) {
  let whereClause = "";
  let params = [];

  if (supplierId) {
    whereClause += `WHERE fr.supplier_id = ?`;
    params.push(supplierId);
  }

  let sql = `
      SELECT fr.id, fr.name, fr.slug, fr.category_id AS "categoryId", fc.name AS "categoryName",
        fr.product_url AS "productUrl", fr.msds_url AS "msdsUrl", fr.ifra_url AS "ifraUrl",
        fr.allergin_url AS "allerginUrl",
        fr.flashpoint_temperature_fahrenheit AS "flashpointTemperatureFahrenheit", 
        fr.specific_gravity AS "specificGravity", fr.vanillin_percentage AS "vanillinPercentage",
        fr.ethyl_vanillin_percentage AS "ethylVanillinPercentage", fr.notes FROM fragrance_reference fr
      JOIN fragrance_oil_categories fc ON fr.category_id = fc.id ${whereClause} ORDER BY fr.name ASC
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
