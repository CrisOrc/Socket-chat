import express from "express";
import morgan from "morgan";
import { Server as SocketServer } from "socket.io";
import http from "http";
import cors from "cors";
import { PORT } from "./config.js";

const app = express();
const server = http.createServer(app);
const io = new SocketServer(server, {
	cors: {
		origin: "http://localhost:5173",
	},
});

app.use(cors());
app.use(morgan("dev"));

io.on("connection", (socket) => {
	console.log("New client connected");
	socket.on("disconnect", () => {
		console.log("Client disconnected");
	});
});

server.listen(PORT);
console.log("Server running on port", PORT);