import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

let pcSocket = null;

wss.on("connection", (ws) => {
  pcSocket = ws;
  console.log("PC connected via WebSocket");
  ws.on("message", (msg) => {
    console.log("From PC:", msg.toString());
  });
});

export function sendToPC(message) {
  if (pcSocket && pcSocket.readyState === 1) {
    pcSocket.send(message);
  }
}