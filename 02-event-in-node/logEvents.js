// in-built modules
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

// npm modules
const { format } = require("date-fns");
const { v4: uuidv4 } = require("uuid");

const time = format(new Date(), "HH:mm:ss \tdd/MMM/yyyy");
const randId = uuidv4();

const logEvents = async (message) => {
  const logDetails = `${time}\t ${randId} \t ${message}\n`;
  console.log(logDetails);
  try {
    // if folder not exist then create folder
    if (!fs.existsSync(path.join(__dirname, "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "logs"));
    }
    await fsPromises.appendFile(
      path.join(__dirname, "logs", "eventLog.txt"),
      logDetails
    );
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = logEvents;
