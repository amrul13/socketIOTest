import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);

const io = new Server(server); //pass a http.Server instance

app.get("/", function (req, res) {
  //check sender ip
  var senderip = req.ip;
  console.log("sender ip: " + senderip);
  res.send("<h1>Hello world</h1>");
});

let count = 0;
io.on("connection", function (socket) {
  console.log("Client connected");
  socket.on("message", function (data) {
    console.log("Message received: ", data);
  });
  socket.on("event_name", function (data) {
    console.log("event received: ", data);
    count++;
     io.emit("chat message", "hello from server " + count);
  });
  socket.on("disconnect", function () {
    console.log("Client disconnected");
  });
});

server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});
