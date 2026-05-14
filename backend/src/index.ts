import express, { Router } from 'express';
import type { Request, Response, NextFunction } from 'express';
import { exec } from 'child_process';
import si from 'systeminformation';
import multer from "multer";
import path from "path";
import fs from "fs";
import http from "http";

import { saveDevice } from './services/mac.address.servicests';
import { getSavedMac } from './services/mac.services.js';
import wol from 'wake_on_lan';
import cors from "cors";
import { WebSocketServer } from "ws";

const app = express();
const PORT = 3000;
const SECRET_KEY = 'mysecret123';
const root = process.cwd();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(root, "front-end")));

const upload = multer({ dest: "uploads/" });
const router = Router();
app.use(router);

const macAddress = path.join(root, "backend/data/device.json");


// ✅ Create ONE server for both HTTP + WS
const server = http.createServer(app);

// ✅ Attach WebSocket to same server
const wss = new WebSocketServer({ server });

let pcSocket: any = null;

wss.on("connection", (ws) => {
  console.log("✅ PC connected via WebSocket");
  pcSocket = ws;
  ws.on("close", () => {
    console.log("❌ PC disconnected");
    pcSocket = null;
  });
});

// ✅ helper to send message
const sendToPC = (message: string) => {
  if (pcSocket && pcSocket.readyState === 1) {
    pcSocket.send(message);
  } else {
    console.log("❌ No PC connected");
  }
};

// 🔐 Middleware
const checkKey = (req: Request, res: Response, next: NextFunction): void => {
  const key = req.query.key as string;

  // if (key !== SECRET_KEY) {
  //   return res.status(403).send('Forbidden');
  // }

  next();
};

// 🖥️ Command runner
const runCommand = (command: string, res: Response): void => {
  exec(command, (error) => {
    if (error) return res.status(500).send('Command failed');
    res.send('Success');
  });
};


// 🌐 Routes
app.get('/', (_req, res) => {
  if (!fs.existsSync(macAddress)) {
    saveDevice();
  }
  res.sendFile(path.join(root, "front-end/pages/index.html"));
});

app.get('/shutdown', checkKey, (_req, res) => {
  runCommand('shutdown now', res);
});

app.get('/restart', checkKey, (_req, res) => {
  runCommand('reboot', res);
});

app.get('/lock', checkKey, (_req, res) => {
  runCommand('loginctl lock-session', res);
});

app.get('/sleep', (_req, res) => {
  exec("systemctl suspend", (err) => {
    if (err) {
      return res.status(500).json({ success: false });
    }
    res.json({ success: true });
  });
});

app.get("/screen-on", (_req, res) => {
  try {
    sendToPC("screen-on"); // ✅ now works

    const mac = getSavedMac();
    wol.wake(mac);

    res.json({ success: true });
  } catch {
    res.status(500).json({ success: false });
  }
});

// 📁 File APIs
app.post("/upload", upload.single("file"), (_req, res) => {
  res.send("File uploaded!");
});

app.get("/files", (_req, res) => {
  res.json(fs.readdirSync("./uploads"));
});

app.get("/download/:name", (req, res) => {
  res.download(path.join("uploads", req.params.name));
});

// 📊 Status
app.get('/status', async (_req, res) => {
  const cpu = await si.currentLoad();
  const mem = await si.mem();
  const osInfo = await si.osInfo();
  const network = await si.networkInterfaces();
  const time = await si.time();

  res.json({
    os: osInfo.distro,
    cpu: cpu.currentLoad,
    ram: mem.used,
    ip: network[0]?.ip4,
    uptime: time.uptime
  });
});

// 🚀 Start server (ONLY ONCE)
server.listen(PORT, '0.0.0.0', () => {
  console.log(`HTTP + WS running on http://localhost:${PORT}`);
});