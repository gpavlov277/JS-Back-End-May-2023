const http = require("http");
const port = 2777;
const handlers = require("./handlers");

http
  .createServer((req, res) => {
    for (const handler of handlers) {
      if (!handler(req, res)) {
        break;
      }
    }
  })
  .listen(port);
