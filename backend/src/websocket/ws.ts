import { WebSocketServer } from "ws";
import { getSystemInfo } from "../services/system.info.services";

let pcSocket: any = null;

// backend/src/websocket/ws.ts
export const initWebSocket = (server: any) => {
  const wss = new WebSocketServer({ server });

  wss.on("connection", async (ws) => {
    console.log("✅ Client connected via WebSocket");
    pcSocket = ws;
    const systemInfo = await getSystemInfo();

    console.log("📦 Sending welcome message with system info...", systemInfo);
    ws.send(JSON.stringify({
      type: "SYSTEM_INFO",
      message: "Welcome to Jago PC WebSocket!",
      data: systemInfo
    }));

    // --- THIS IS THE MISSING PART ---
    ws.on("message", async (data) => {
      try {
        // Parse the incoming data buffer
        const payload = JSON.parse(data.toString());
        console.log('📩 Received:', payload);

        switch (payload.type) {
          case 'screen-on':
            console.log('🚀 Executing Screen On command...');
            ws.send(JSON.stringify({
              type: "COMMAND_RESULT",
              action: "screen-on",
              success: true,
              message: "PC is waking up!"
            }));
            break;

          default:
            console.warn('❓ Unknown command type:', payload.type);
        }
      } catch (error) {
        console.error('❌ Error processing WS message:', error);
      }
    });
    // --------------------------------

    ws.on("close", () => {
      console.log("❌ PC disconnected");
      pcSocket = null;
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