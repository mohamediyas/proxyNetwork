const net = require("net");

const server = net.createServer();

server.on("connection", (clientToProxySocket) => {
  console.log("Client connected to proxy");

  clientToProxySocket.once("data", (data) => {
    console.log(data);

    let isTLSConnection = data.toString().indexOf("CONNECT") !== -1;

    let serverPort = 80;

    let serverAddress;

    if (isTLSConnection) {
      serverPort = 443;

      serverAddress = data
        .toString()
        .split("CONNECT")[1]
        .split(" ")[1]
        .split(":")[0];

      console.log(serverAddress);
    } else {
      serverAddress = data.toString().split("Host: ")[1].split("\n")[0];

      console.log(serverAddress);
    }
  });
});

server.on("error", (err) => {
  console.log("Something went wrong");
  console.log(err);
});

server.on("close", () => {
  console.log("Client disconnected");
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
