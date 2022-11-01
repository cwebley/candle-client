const {
  consolidateData
} = require("../../data-utils");

const fetchUpdatesData = function(cb) {
  console.log("starting consolidateData");

  // const dataFileRegExp = new RegExp("[0-9]+.json$");

  console.log("DIRNAME: ", __dirname);
  consolidateData({ dataPath: __dirname }, (err, consolidatedData) => {
    if (err) {
      console.error("error conslidating data: ", err);
    }
    console.log("conolidatedData length: ", consolidatedData.length);
    return cb(err, consolidatedData);
  });
};

// fetchUpdatesData((err, data) => {
//   if (err) {
//     console.error(err);
//   }
//   console.log('data: ', data);
//   data.push('foo');
//   console.log("new length: ", data.length)
// });

module.exports = fetchUpdatesData;

