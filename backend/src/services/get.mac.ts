import fs from "fs";
import path from "path";

function getSavedMac() {
    try {
        const filePath = path.join(process.cwd(), "backend/data/device.json");
        const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
        return data.mac;
    } catch (err) {
        console.error("Error reading device.json:", err);
        throw err;
    }
}

export { getSavedMac };