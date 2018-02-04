class Socket {
  constructor(wsServer) {
    this.wsServer = wsServer;
    this.clients = [];
    this.init();
  }
  init() {
    this.wsServer.on("request", request => {
      let connection = request.accept(null, request.origin);
      let index = this.clients.push(connection) - 1;
      connection
        .on("message", message => {
          let isRemove = Math.ceil(Math.random() * 2) % 2;
          if (message.type !== "utf8" || !isRemove) {
            return;
          }
          let msg = message.utf8Data;
          setTimeout(() => this.broadcastEmit(msg), Math.random() * 600);
        })
        .on("close", () => {
          this.clients.splice(index, 1);
        });
    });
  }

  broadcastEmit(msg) {
    this.clients.map(connection => {
      connection.sendUTF(msg);
    });
  }
}

module.exports = Socket;
