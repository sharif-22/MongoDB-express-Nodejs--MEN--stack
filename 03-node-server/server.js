const http = require("http");
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const logEvents = require("./logEvents");
const EventEmitter = require("events");

class MyEmitter extends EventEmitter {}

// initialize object
const myEmitter = new MyEmitter();

// console.log(myEmitter);

// add event listener for log event
myEmitter.on("log", (msg, fileName) => logEvents(msg, fileName));

const PORT = process.env.PORT || 2024;

const server = http.createServer((req, res) => {
  myEmitter.emit("log", `${req.url}\t${req.method}`, "reqLog.txt");
  console.log(req.url, req.method);
});

server.listen(PORT, () => {
  console.log(`Server is listening to port ${PORT}`);
});
