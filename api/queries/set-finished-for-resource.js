// module.exports = function setFinishedForResource(db, resourceType, cb) {
//   const sql = `
//       UPDATE ${resourceType} SET finished = ?, remaining = 0
//     `;

//   db.query(sql, [true], (err, result) => {
//     if (err) {
//       console.error(err, {
//         sql,
//         resourceType,
//       });
//       return cb(err);
//     }

//     if (!result) {
//       return cb();
//     }

//     return cb(null, result[0]);
//   });
// };
