import express from "express";
import morgan from "morgan";
import htttp from "http";
import { Server as SocketServer } from "socket.io";
import cors from "cors";
import { PORT } from "./config.js";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
const server = htttp.createServer(app);
const io = new SocketServer(server, {
  cors: {
    //origin: 'http://localhost:3000'
  },
});

app.use(cors());
app.use(morgan("dev"));
io.on("connection", (socket) => {
  socket.on("mensaje", (mensaje) => {
    socket.broadcast.emit("mensaje", {
      user: socket.id,
      mensaje: mensaje,
    });
  });
});
app.use(express.static(join(__dirname, "../client/build")));
server.listen(PORT);
console.log("el servidor esta escuchado por el puerto", PORT);
