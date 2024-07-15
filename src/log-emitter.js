const logEvents = require("./logsEvent");

const EventEmitter = require("events");

// adds listener object
const logEmitter = new EventEmitter();

// listens for events

function logEmitterFunc() {
  logEmitter.on("log", (msg) => logEvents(msg));

  setTimeout(() => {
    logEmitter.emit("log", "log event emited!");
  }, 2000);
}
logEmitterFunc()
