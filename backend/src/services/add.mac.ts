import os from "os";
import fs from "fs";
import path from "path";

const dir = path.join(process.cwd(), "backend/data");

if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

const FILE_PATH = path.join(dir, "device.json");

function getMac() {
    const interfaces = os.networkInterfaces();

    for (const name of Object.keys(interfaces)) {
        const nets = interfaces[name];

        if (!nets) continue;

        for (const net of nets) {
            if (net.family === "IPv4" && !net.internal && net.mac !== "00:00:00:00:00:00") {
                return net.mac;
            }
        }
    }

    return null;
}

export function saveDevice() {
    const mac = getMac();

    if (!mac) {
        console.error("No MAC found");
        return;
    }

    const data = {
        mac,
        name: os.hostname(),
        savedAt: new Date().toISOString()
    };

    fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));

    console.log("📦 Device saved at:", FILE_PATH);
}