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

    ws.on('message', async (data) => {
      const message = JSON.parse(data.toString());

      if (message.type === 'SYSTEM_COMMAND') {
        // Logic to map the command string to your controller
        if (message.command.includes('screen-on')) {
          // Since controllers usually expect (req, res), 
          // you might need to extract the logic into a service 
          // or call a helper function here.
          console.log("Executing Screen On via WS");
          // Example: await systemController.screenOn(null, null); 
        }
      }
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