import express from "express";
import { join } from "path";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "public/index.html"));
});

io.on("connection", (socket) => {
  console.log("A user connected");
  // socket.broadcast.emit("chat message", "");

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

  socket.on("chat message", (msg) => {
    console.log("Message: " + msg);
    socket.broadcast.emit("chat message", msg);
  });
});

export default server;
