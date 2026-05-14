import { WebSocketServer } from "ws";

let pcSocket: any = null;

export const initWebSocket = (server: any) => {
  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws) => {
    console.log("✅ PC connected via WebSocket");
    pcSocket = ws;

    ws.on("close", () => {
      console.log("❌ PC disconnected");
      pcSocket = null;
    });

    ws.on("message", (msg) => {
      console.log("📩 From client:", msg.toString());
    });
  });
};

export const sendToPC = (message: string) => {
  if (pcSocket && pcSocket.readyState === 1) {
    pcSocket.send(message);
  } else {
    console.log("❌ No PC connected");
  }
};