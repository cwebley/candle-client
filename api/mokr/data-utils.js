// const path = require("path");
const fs = require("fs");
const async = require("neo-async");

module.exports.consolidateData = function (
  // eslint-disable-next-line no-undef
  { dataPath = __dirname, dataFileRegExp = new RegExp("[0-9]+.json$") },
  cb
) {
  fs.readdir(dataPath, (err, files) => {
    console.log("files ", files);
    const filteredFiles = files.filter((f) => dataFileRegExp.test(f));
    console.log('filtered files: ', filteredFiles);

    filteredFiles.sort((a, b) => {
      const aPageNumber = Number(a.split("-")[1].split(".")[0]);
      const bPageNumber = Number(b.split("-")[1].split(".")[0]);

      console.log("A : ", aPageNumber, " B : ", bPageNumber);
      return bPageNumber > aPageNumber ? -1 : 1;
    });
    console.log("sorted files ", filteredFiles);

    const fileReadCalls = filteredFiles.map((fileName) => {
      return function (done) {
        fs.readFile(`${dataPath}/${fileName}`, (err, data) => {
          console.log("DATA: ", data);
          let parsedData;
          try {
            parsedData = JSON.parse(data);
          } catch (err) {
            console.error("parse err, ", err);
          }
          done(err, parsedData ? parsedData : null);
        });
      };
    });

    async.parallel(fileReadCalls, (err, results) => {
      if (err) {
        console.error("async file read failed: ", err);
        return cb();
      }
      const nonNullResults = results.filter((r) => r && results.length);

      // console.log("NON NULL : ", nonNullResults);
      const combinedData = nonNullResults.length === 0 ? [] : [].concat(...nonNullResults.slice());
      // const combinedData = nonNullResults.length < 2 ? nonNullResults : nonNullResults[0].concat(...nonNullResults.slice(1));
      return cb(null, combinedData);
    });
  });
};

module.exports.backupFiles = function (
  // eslint-disable-next-line no-undef
  { dataPath = __dirname, dataFileRegExp = new RegExp("[0-9].json$") },
  cb
) {
  console.log("backupFiles");

  fs.readdir(dataPath, (err, files) => {
    console.log("files ", files);
    const filteredFiles = files.filter((f) => dataFileRegExp.test(f));
    console.log("filtered files: ", filteredFiles);

    const fileCopyCalls = filteredFiles.map((fileName) => {
      return function (done) {
        fs.copyFile(
          `${dataPath}/${fileName}`,
          `${dataPath}/${fileName}.bak`,
          (err) => {
            if (err) {
              console.error("copy file error: ", err);
            }
            done(err);
          }
        );
      };
    });

    async.parallel(fileCopyCalls, (err) => {
      console.log("async parallel finished", err);
      return cb(err);
    });
  });
};

module.exports.deleteFiles = function (
  // eslint-disable-next-line no-undef
  { dataPath = __dirname, dataFileRegExp = new RegExp("[0-9].json.bak$") },
  cb
) {
  console.log("deletebackupFiles");

  fs.readdir(dataPath, (err, files) => {
    const filteredFiles = files.filter((f) => dataFileRegExp.test(f));
    console.log("filtered files for deleting: ", filteredFiles);

    const fileDeleteCalls = filteredFiles.map((fileName) => {
      return function (done) {
        fs.unlink(`${dataPath}/${fileName}`, (err) => {
          if (err) {
            console.error("delete file error: ", err);
          }
          done(err);
        });
      };
    });

    async.parallel(fileDeleteCalls, (err) => {
      console.log("async parallel finished", err);
      return cb(err);
    });
  });
};

module.exports.chunkData = function ({ dataArray, itemCountPerFile = 3 }) {
  // chunk the data into pages of size `itemCountPerFile`
  const chunkedArray = dataArray.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / itemCountPerFile);
    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [];
    }

    resultArray[chunkIndex].push(item);
    return resultArray;
  }, []);
  return chunkedArray;
};

module.exports.writeChunksToJson = function (
  {
    // eslint-disable-next-line no-undef
    dataPath = __dirname,
    filePrefix,
    chunkedData,
  },
  cb
) {

  const fileWriteCalls = chunkedData.map((chunk, i) => {
   const stringifiedChunk = JSON.stringify(chunk, null, 4);
    return function (done) {
      fs.writeFile(`${dataPath}/${filePrefix}-${i}.json`, stringifiedChunk, 'utf8', (err) => {
        if (err) {
          console.error("write file error: ", err);
        }
        done(err);
      });
    };
  });

  console.log("FILE WRITE CALLS: ", fileWriteCalls);

  async.parallel(fileWriteCalls, (err) => {
    console.log("async parallel write finished", err);
    return cb(err);
  });
};
