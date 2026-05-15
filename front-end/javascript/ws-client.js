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

    // FIXED SELECTORS
    const statusDot = document.querySelector(".pulse-dot");
    const pcNameElement = document.getElementById("pcName");

    // Removed because it doesn't exist in HTML
    const osIconContainer = null;

    const batteryElement = document.getElementById("battery-info");
    const batteryIcon = document.querySelector("#battery-info i");

    // Fixed selector
    const connectionBadge = document.querySelector(".neon-pill");

    console.log(data, "--- Updating UI with above data ---");

    // =========================
    // OFFLINE STATE
    // =========================
    if (!data || data.status === "offline") {

        if (statusDot) {
            statusDot.className = "pulse-dot offline";
        }

        if (connectionBadge) {
            connectionBadge.innerText = "Offline";
        }

        return;
    }

    // =========================
    // ONLINE STATE
    // =========================
    if (statusDot) {
        statusDot.className = "pulse-dot online";
    }

    if (connectionBadge) {
        connectionBadge.innerHTML =
            '<span class="pulse-dot online"></span> Online';
    }

    // =========================
    // HOSTNAME & DISTRO
    // =========================
    if (pcNameElement) {

        const hostname =
            data.os?.hostname || "Unknown Device";

        const distroSuffix =
            data.os?.distro
                ? ` (${data.os.distro})`
                : "";

        pcNameElement.innerText =
            hostname + distroSuffix;
    }

    // =========================
    // BATTERY
    // =========================
    if (batteryElement && data.battery) {

        const percent = Math.round(data.battery.percent || 0);

        const icon = batteryElement.querySelector("i");

        let iconClass = "";
        let color = "#ffffff";

        if (data.battery.isCharging) {

            iconClass = "fas fa-bolt";
            color = "yellow";

            batteryElement.innerHTML =
                `<i class="${iconClass}"></i> <p style="color: ${color}; margin-left: 4px;">  ${percent}%  (Charging)</p>`;

        } else {

            if (percent > 75) {
                iconClass = "fas fa-battery-full";
                color = "#22c55e";
            } else if (percent > 40) {
                iconClass = "fas fa-battery-half";
                color = "#fbbf24";
            } else {
                iconClass = "fas fa-battery-quarter";
                color = "#ef4444";
            }

            batteryElement.innerHTML =
                `<i class="${iconClass}"></i> <p style="color: ${color}; margin-left: 4px;"> ${percent}%</p>`;

        }

        // ONLY APPLY COLOR TO ICON, NOT WHOLE ELEMENT
        const newIcon = batteryElement.querySelector("i");
        if (newIcon) {
            newIcon.style.color = color;
        }
    }
}
// =========================
// LIVE CLOCK
// =========================
setInterval(() => {

    const currentTimeElement =
        document.getElementById("currentTime");

    if (!currentTimeElement) return;

    const now = new Date();

    currentTimeElement.innerText =
        now.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
        });

}, 1000);