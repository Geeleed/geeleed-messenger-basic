import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.SOCKET_ENDPOINT || "http://localhost:4000";

export const socketio = () => io(URL, { transports: ["websocket"] });
