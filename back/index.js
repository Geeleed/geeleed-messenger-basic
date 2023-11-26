require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { createServer } = require("node:http");
// const { join } = require("node:path");
const { Server } = require("socket.io");
const PORT = process.env.PORT || 4000;

const app = express();
app.use(cors());
const server = createServer(app);
const io = new Server(server, {
  connectionStateRecovery: {},
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  // console.log("a user connected", socket.id);
  // socket.on("user connected", (msg) => console.log(msg, "connected"));
  // socket.on("disconnect", () => console.log("a user disconnected", socket.id));
  socket.on("data", (data) => io.emit("sent", data));
});

server.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});
