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


export function updateUI(data) {
    const statusDot = document.querySelector(".device-row .dot"); // Matches updated layout selector
    const pcNameElement = document.getElementById("pcName");
    const osIconContainer = document.getElementById("osIconContainer");
    const batteryElement = document.getElementById("battery");
    const batteryIcon = document.querySelector(".battery-mini i");
    const connectionBadge = document.getElementById("connectionBadge");

    // =========================
    // OFFLINE STATE
    // =========================
    if (!data || data.status === "offline") {
        if (statusDot) {
            statusDot.className = "dot pulse offline";
        }

        if (connectionBadge) {
            connectionBadge.className = "status-badge offline";
            connectionBadge.innerText = "Offline";
        }
        return;
    }

    // =========================
    // ONLINE STATE
    // =========================
    if (statusDot) {
        statusDot.className = "dot pulse online";
    }

    if (connectionBadge) {
        connectionBadge.className = "status-badge online";
        connectionBadge.innerText = "Online";
    }

    // =========================
    // HOSTNAME & DISTRO (Fixed Data Reference)
    // =========================
    if (pcNameElement) {
        const hostname = data.os?.hostname || "Unknown Device";
        const distroSuffix = data.os?.distro ? ` (${data.os.distro})` : "";
        
        // Fixed from data.distro -> data.os.distro to prevent 'undefined' text
        pcNameElement.innerText = hostname + distroSuffix;
    }

    // =========================
    // OS ICON (Premium Neon Color Mapping)
    // =========================
    if (osIconContainer && data.os?.platform) {
        const platform = data.os.platform.toLowerCase();
        const distro = data.os.distro?.toLowerCase() || "";

        if (platform.includes("windows")) {
            osIconContainer.innerHTML =
                '<i class="fab fa-windows" style="color: #38bdf8; filter: drop-shadow(0 0 8px rgba(56,189,248,0.4));"></i>';
        } else if (platform.includes("linux") && distro.includes("ubuntu")) {
            osIconContainer.innerHTML =
                '<i class="fab fa-ubuntu" style="color: #ff7a59; filter: drop-shadow(0 0 8px rgba(255,122,89,0.4));"></i>';
        } else if (platform.includes("linux")) {
            osIconContainer.innerHTML =
                '<i class="fab fa-linux" style="color: #ffffff; filter: drop-shadow(0 0 6px rgba(255,255,255,0.3));"></i>';
        } else if (platform.includes("darwin") || platform.includes("mac")) {
            osIconContainer.innerHTML =
                '<i class="fab fa-apple" style="color: #ffffff; filter: drop-shadow(0 0 6px rgba(255,255,255,0.3));"></i>';
        } else {
            osIconContainer.innerHTML =
                '<i class="fas fa-desktop" style="color: #64748b;"></i>';
        }
    }

    // =========================
    // BATTERY
    // =========================
    if (batteryElement && data.battery) {
        const percent = Math.round(data.battery.percent || 0);

        if (data.battery.isCharging) {
            batteryElement.innerText = `${percent}% Charging`;
            if (batteryIcon) {
                batteryIcon.className = "fas fa-bolt";
            }
        } else {
            batteryElement.innerText = `${percent}%`;
            if (batteryIcon) {
                if (percent > 75) {
                    batteryIcon.className = "fas fa-battery-full";
                } else if (percent > 40) {
                    batteryIcon.className = "fas fa-battery-half";
                } else {
                    batteryIcon.className = "fas fa-battery-quarter";
                }
            }
        }
    }

    // =========================
    // OPTIONAL DEBUG LOGS
    // =========================
    if (data.cpuUsage?.currentLoad) {
        console.log("CPU Usage:", data.cpuUsage.currentLoad.toFixed(1) + "%");
    }
    if (data.memory?.usagePercent) {
        console.log("RAM Usage:", data.memory.usagePercent.toFixed(1) + "%");
    }
}

// =========================
// LIVE CLOCK (High Efficiency 24h Presentation)
// =========================
setInterval(() => {
    const currentTimeElement = document.getElementById("currentTime");
    if (!currentTimeElement) return;

    const now = new Date();
    currentTimeElement.innerText = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true // Force crisp 24h format for the system console feel
    });
}, 1000);