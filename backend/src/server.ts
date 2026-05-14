import http from "http";

import app from "./app.js";
import { initWebSocket } from "./websocket/ws.js";

const PORT = 3000;

const server = http.createServer(app);
initWebSocket(server);

server.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});