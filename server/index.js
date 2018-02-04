var http = require("http");
var static = require("node-static");
var file = new static.Server("./server/public");
const WsHendler = require("./socket");
const port = process.env.PORT || 3000;
var server = http
  .createServer(function(req, res) {
    file.serve(req, res);
  })
  .listen(port);

var WebSocketServer = require("websocket").server;

wsServer = new WebSocketServer({
  httpServer: server,
  autoAcceptConnections: false
});
console.log(port + " PORT");
new WsHendler(wsServer);
