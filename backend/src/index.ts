import express, { Router } from 'express';
import type { Request, Response, NextFunction } from 'express';
import { exec } from 'child_process';
import si from 'systeminformation';
import multer from "multer";
import path from "path";
import fs from "fs";
import { saveDevice } from './services/add.mac.js';
import { getSavedMac } from './services/get.mac.js';
import wol from 'wake_on_lan';
import cors from "cors";

import { WebSocketServer } from "ws";



const app = express();
const PORT: number = 3000;
const SECRET_KEY: string = 'mysecret123';
const root = process.cwd();

app.use(cors());
app.use(express.json());
const upload = multer({ dest: "uploads/" });
// WAKE PC (LAN)
const router = Router();
app.use(router);

const macAddress = path.join(process.cwd(), "backend/data/device.json");

// 🌐 Create WebSocket server
const wss = new WebSocketServer({ port: 8080 });

let pcSocket: any = null;

wss.on("connection", (ws) => {
  console.log("✅ PC connected via WebSocket");

  pcSocket = ws;

  ws.on("close", () => {
    console.log("❌ PC disconnected");
    pcSocket = null;
  });
});

// 🔐 Middleware for auth
const checkKey = (req: Request, res: Response, next: NextFunction): void => {
  const key = req.query.key as string;

  // if (key !== SECRET_KEY) {
  //   res.status(403).send('Forbidden');
  //   return;
  // }

  next();
};
// 🖥️ Helper function
const runCommand = (command: string, res: Response): void => {
  exec(command, (error) => {
    if (error) {
      res.status(500).send('Command failed');
      return;
    }
    res.send('Success');
  });
};
app.use(express.static(path.join(process.cwd(), "front-end")));


// 🌐 UI Route
app.get('/', (_req: Request, res: Response) => {
  if (!fs.existsSync(macAddress)) {
    saveDevice();
  }
  res.sendFile(path.join(root, "front-end/pages/index.html"));
});

app.get('/shutdown', checkKey, (_req, res) => {
  runCommand('shutdown now', res);
});


app.get("/sleep", (req, res) => {
  exec("systemctl suspend", (err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Failed to sleep PC"
      });
    }

    return res.json({
      success: true,
      message: "PC is going to sleep"
    });
  });
});

app.get('/restart', checkKey, (_req, res) => {
  runCommand('reboot', res);
});

app.get('/lock', checkKey, (_req, res) => {
  console.log('Locking session...');
  runCommand('loginctl lock-session', res);
});

app.get("/screen-on", (req, res) => {
  try {

    sendToPC("screen-on");
    const mac = getSavedMac();
    console.log(mac, "mac address");

    wol.wake(mac);

    return res.json({
      success: true,
      message: "Wake signal sent"
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "Failed to wake device"
    });
  }
});
// 📁 Upload file from phone
app.post("/upload", upload.single("file"), (req, res) => {
  res.send("File uploaded!");
});

// 📂 List files
app.get("/files", (_req, res) => {
  const files = fs.readdirSync("./uploads");
  res.json(files);
});

// ⬇️ Download file
app.get("/download/:name", (req, res) => {
  const filePath = path.join(__dirname, "uploads", req.params.name);
  res.download(filePath);
});
app.get('/status', async (_req, res) => {
  const cpu = await si.currentLoad();
  const mem = await si.mem();
  const osInfo = await si.osInfo();
  const network = await si.networkInterfaces();
  const time = await si.time();

  res.send(`
    <html>
      <head>
        <title>PC Status</title>
        <style>
          body { font-family: Arial; background:#111; color:#fff; padding:20px; }
          .card { background:#222; padding:15px; margin:10px 0; border-radius:10px; }
        </style>
      </head>
      <body>
        <h2>💻 PC Status</h2>

        <div class="card">
          <p><b>OS:</b> ${osInfo.distro}</p>
          <p><b>Platform:</b> ${osInfo.platform}</p>
        </div>

        <div class="card">
          <p><b>CPU Load:</b> ${cpu.currentLoad.toFixed(2)}%</p>
        </div>

        <div class="card">
          <p><b>RAM:</b> ${(mem.used / 1024 / 1024 / 1024).toFixed(2)} GB used</p>
        </div>

        <div class="card">
          <p><b>IP:</b> ${network[0]?.ip4}</p>
        </div>

        <div class="card">
          <p><b>Uptime:</b> ${(time.uptime / 3600).toFixed(2)} hours</p>
        </div>

      </body>
    </html>
  `);
});
// 🚀 Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${PORT}`);
});