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

    // 🖥️ Update PC Name
    const hostname = data.os?.hostname || "Unknown Device";
    const pcNameElement = document.getElementById("pcName");
    if (pcNameElement) pcNameElement.innerText = hostname;

    // 🔋 Update Battery
    const bat = data.battery?.percent;
    const batteryElement = document.getElementById("battery");
    if (batteryElement) {
        batteryElement.innerText = (bat !== undefined && bat !== -1) ? `${bat}%` : "AC";
    }

    // 💾 Update Storage
    if (data.fsSize && data.fsSize.length > 0) {
        const drive = data.fsSize[0];
        const usedGB = (drive.used / (1024 ** 3)).toFixed(1);
        const totalGB = (drive.size / (1024 ** 3)).toFixed(0);

        document.getElementById("storageText").innerText = `${usedGB}/${totalGB} GB`;
        document.getElementById("storageBar").style.width = `${drive.use}%`;
    }
}

// ⏱️ Live Clock Logic
function startClock() {
    const timeElement = document.getElementById("currentTime");
    function updateClock() {
        const now = new Date();
        timeElement.innerText = now.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
    }
    updateClock();
    setInterval(updateClock, 1000); // Update every second for accuracy
}

// Run clock on load
startClock();