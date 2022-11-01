/* eslint-disable no-undef */
const {
  consolidateData,
  backupFiles,
  deleteFiles,
  writeChunksToJson,
  chunkData,
} = require("../data-utils");
const path = require("path");

const updatesDataPath = path.join(__dirname, "updates");

consolidateData(
  { dataPath: path.join(__dirname, "updates") },
  (err, consolidatedData) => {
    if (err) {
      console.error("error conslidating data: ", err);
    }
    console.log("conolidatedData: ", consolidatedData);

    backupFiles(
      { dataPath: updatesDataPath, dataFileRegExp: new RegExp("[0-9].json$") },
      (err) => {
        console.log("BACKUP FILES DONE: ", err);
        if (err) {
          return;
        }

        const chunkedData = chunkData({
          dataArray: consolidatedData,
          itemCountPerFile: 4,
        });
        console.log("CHUNKED DATA: ", chunkedData);

        deleteFiles(
          {
            dataPath: updatesDataPath,
            dataFileRegExp: new RegExp("[0-9].json$"),
          },
          (err) => {
            console.log("delete files result: ", err);

            writeChunksToJson(
              {
                dataPath: path.join(__dirname, "updates"),
                filePrefix: "updates",
                chunkedData: chunkedData,
              },
              (err, results) => {
                console.log("write-to-json finished: ", err, results);
              }
            );
          }
        );
      }
    );
  }
);
