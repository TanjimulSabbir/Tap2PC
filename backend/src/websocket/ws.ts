import { WebSocketServer } from "ws";
import { getSystemInfo } from "../services/system.info.services";
import { exec } from "child_process";
import os from "os";
import { linuxAdapter } from "../services/screen.wake.up.services";
import { handleCommand } from "./ws.services/on.message.read";

let pcSocket: any = null;
export const socketSendRequestPayLoadTypes = {
  "api/system/screen-on": { type: "screen-on", },
};

// backend/src/websocket/ws.ts
export const initWebSocket = (server: any) => {

  const wss = new WebSocketServer({ server });

  wss.on("connection", async (ws) => {
    console.log("✅ Client connected via WebSocket");
    pcSocket = ws;
    const systemInfo = await getSystemInfo();

    console.log("📦 Sending welcome message with system info...");
    ws.send(JSON.stringify({
      type: "SYSTEM_INFO",
      message: "Welcome to Jora PC WebSocket!",
      data: systemInfo
    }));

    // --- THIS IS THE MISSING PART ---
    ws.on("message", async (data) => {
      handleCommand(ws, JSON.parse(data.toString()));
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