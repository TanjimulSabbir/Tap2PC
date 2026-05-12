import express from 'express';
import { exec } from 'child_process';
import si from 'systeminformation';
import multer from "multer";
import path from "path";
import fs from "fs";
const app = express();
const PORT = 3000;
const SECRET_KEY = 'mysecret123';
const root = process.cwd();
app.use(express.json());
const upload = multer({ dest: "uploads/" });
// 🔐 Middleware for auth
const checkKey = (req, res, next) => {
    const key = req.query.key;
    if (key !== SECRET_KEY) {
        res.status(403).send('Forbidden');
        return;
    }
    next();
};
// 🖥️ Helper function
const runCommand = (command, res) => {
    exec(command, (error) => {
        if (error) {
            res.status(500).send('Command failed');
            return;
        }
        res.send('Success');
    });
};
const FRONTEND_PATH = path.join(__dirname, "../frontend");
app.use(express.static(FRONTEND_PATH));
// 🌐 UI Route
app.get('/', (_req, res) => {
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
//# sourceMappingURL=index.js.map