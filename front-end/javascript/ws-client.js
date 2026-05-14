// import { handleServerFeedback } from "./components/screen-on-server-success-ui";

const ws = new WebSocket(`ws://${location.host}`);

ws.onopen = () => {
    console.log("✅ Connected to WebSocket");

};

ws.onmessage = (event) => {
    console.log("📩 Message:", event.data);
    const response = JSON.parse(event.data);

    if (response.type === "SYSTEM_INFO") {
        updateUI(response.data);
    }

    if (response.type === "COMMAND_RESULT") {
        // You can call a function in app.js to update the UI
        // handleServerFeedback(response);

    }
};

ws.onclose = () => {
    console.log("❌ Disconnected");
};

ws.onerror = (err) => {
    console.log("❌ WS Error:", err);
};

window.ws = ws; // Expose for app.js to use


function updateUI(data) {
    if (!data) return;

    // 🖥️ PC Name (Hostname)
    // Most 'systeminformation' payloads put hostname under os.hostname
    const hostname = data.os?.hostname || "Unknown Device";
    document.getElementById("pcName").innerText = hostname;

    // 🔋 Battery
    const bat = data.battery?.percent;
    document.getElementById("battery").innerText = 
        (bat !== undefined && bat !== -1) ? `${bat}%` : "AC Power";

    // 💾 Storage Logic
    if (data.fsSize && data.fsSize.length > 0) {
        const drive = data.fsSize[0];
        const usedGB = (drive.used / (1024 ** 3)).toFixed(1);
        const totalGB = (drive.size / (1024 ** 3)).toFixed(0);
        
        document.getElementById("storageText").innerText = `${usedGB}/${totalGB} GB`;
        document.getElementById("storageBar").style.width = `${drive.use}%`;
    }
}