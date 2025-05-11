// plugins/socket.js
import { io } from "socket.io-client";

const socket = io("http://localhost:3000", {
  transports: ["websocket"], // bisa diatur sesuai server-mu
});

export default socket;
