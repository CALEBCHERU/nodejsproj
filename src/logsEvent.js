const fs = require("fs").promises;
const path = require("path");
const { format } = require("date-fns");
const { v4: uuid } = require("uuid");

// console.log(format(new Date(), "yyyy/MM/dd\tHH:mm:ss"));

const logEvents = async (message) => {
  const dateTime = `${format(new Date(), "yyyy/MM/dd\tHH:mm:ss")}`;
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
  console.log(logItem);

  try {
    // this is to create a log directory if it doesn't exist
    // chatgpt more explanation
    if (!await fs.stat(path.join(__dirname, "../logs")).catch(() => false)) {
    // if (!fs.existsSync(path.join(__dirname, "logs"))) {
      await fs.mkdir(path.join(__dirname, "../logs"));
    }
    await fs.appendFile(
      path.join(__dirname, "../logs", "eventLog.txt"),
      logItem
    );
    // appendFile is gonner create a new file name eventLog.txt and store it inside the logs folder
  } catch (error) {
    console.log(error);
  }
};

// so that it can be able to be used anywhere in this code
module.exports = logEvents;
// Example usage
// logEvents("This is a log message.");
