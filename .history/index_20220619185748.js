const net = require("net");

const server = net.createServer();

server.on("connection", (clientToProxySocket) => {
  console.log("Client connected to proxy");
});

server.listen(
  {
    host: "0.0.0.0",
    port: 8080,
  },
  () => {
    console.log("server listening on 0.0.0.0:8080");
  }
);
