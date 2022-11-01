/* eslint-disable no-undef */

const { program } = require("commander");
const path = require("path");
const {
  consolidateData,
  backupFiles,
  deleteFiles,
  writeChunksToJson,
  chunkData,
} = require("./data-utils");

const logProgramOptions = (prog) => {
  const options = prog.opts();
  console.log("program options:");
  if (options) {
    console.log(JSON.stringify(options, null, 2));
  } else {
    console.log("no options");
  }
};


const formatJsonData = ( { chunkSize = 250 } ) => {
  console.log("formatjsondata: ", chunkSize);

  const updatesDataPath = path.join(__dirname, "data", "updates");
  const dataFileRegExp = new RegExp("[0-9].json$");

  consolidateData({ dataPath: updatesDataPath }, (err, consolidatedData) => {
    if (err) {
      console.error("error conslidating data: ", err);
    }
    console.log("conolidatedData: ", consolidatedData.length);

    backupFiles(
      {
        dataPath: updatesDataPath,
        dataFileRegExp: dataFileRegExp,
      },
      (err) => {
        console.log("BACKUP FILES DONE: ", err);
        if (err) {
          return;
        }

        const chunkedData = chunkData({
          dataArray: consolidatedData,
          itemCountPerFile: chunkSize,
        });
        console.log("CHUNKED DATA: ", chunkedData);

        deleteFiles(
          {
            dataPath: updatesDataPath,
            dataFileRegExp: dataFileRegExp,
          },
          (err) => {
            console.log("delete files result: ", err);

            writeChunksToJson(
              {
                dataPath: updatesDataPath,
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
  });
};

const handleIntegerArg = (value) => {
  console.log("handle integer arg: ", value);

  const parsedValue = parseInt(value, 10);
   if (isNaN(parsedValue)) {
    throw new commander.InvalidArgumentError('chunkSize needs to be an integer');
  }

  return parsedValue;
}

program.option("-c, --chunkSize <number>", "chunk size for file writes", handleIntegerArg)
  .action(() => {
  logProgramOptions(program);
  formatJsonData(program.opts());
});

// eslint-disable-next-line no-undef
program.parse(process.argv);
