const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);
const html = require("fs").readFileSync("./index.html");
const PORT = 8080;

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

io.on("connection", (socket) => {
  console.log("ユーザーが接続しました");
  //獲取使用者發送的訊息
  socket.on("chat message", (message) => {
    //接收到後再發回
    io.emit("chat message", message);
  });
});

server.listen(PORT, () => {
  console.log("server running");
});
