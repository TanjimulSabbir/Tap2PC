// const { socketSendRequestPayLoadTypes } = require("./constant/socket.connection.type");

document.querySelectorAll(".action-card").forEach((btn) => {
    btn.addEventListener("click", () => {
        const action = btn.dataset.action;
        // if (socketSendRequestPayLoadTypes[action]) {
        //     return SendRequestToWebSocketConnection(action);
        // }
        send(action);
    });
});

// Function to handle PC commands
async function send(action) {
    const modal = document.getElementById('feedbackModal');
    const icon = document.getElementById('modalIcon');
    const title = document.getElementById('modalTitle');
    const msg = document.getElementById('modalMessage');
    const btn = document.getElementById('modalCloseBtn');

    // 1. SHOW LOADING
    modal.style.display = 'flex';
    btn.style.display = 'none';
    icon.className = 'status-icon-wrapper'; // Reset to blue
    icon.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i>';
    title.innerText = "Processing...";
    msg.innerText = `Jago PC is executing ${action}. Please wait.`;

    // Inside your send(action) function, replace the static success message with this:
    const successMessages = {
        shutdown: "Your PC is shutting down now. See you later!",
        sleep: "Putting your PC to sleep. Sweet dreams!",
        lock: "PC secured! Your session is now locked.",
        restart: "Restarting... Your PC will be back up in a moment.",
        "screen-on": "screenOn command sent. Your PC should be waking up now. Please enter your password directly on the PC if required."
    };

    try {
        const response = await fetch(`/${action}`);
        alert(`Response for ${action}: ${response.status} ${response.statusText}`);
        if (!response.ok) throw new Error("PC Unreachable");

        // 1. SPECIAL HANDLING FOR STATUS
        if (action === 'status') {
            // Close the loader immediately and open the new page
            closeFeedback();
            openStatus();
            return;
        }

        // 2. SHOW SUCCESS
        icon.className = 'status-icon-wrapper success';
        icon.innerHTML = '<i class="fas fa-check-circle"></i>';
        title.innerText = "Success";
        // Use it like this:
        msg.innerText = successMessages[action] || "Action completed successfully!";

        // Auto-close after 1.5s
        setTimeout(closeFeedback, 1500);

    } catch (err) {
        // 3. SHOW ERROR
        icon.className = 'status-icon-wrapper error';
        icon.innerHTML = '<i class="fas fa-exclamation-circle"></i>';
        title.innerText = "Command Failed";
        msg.innerText = "Could not communicate with your PC. Ensure the server is running.";
        btn.style.display = 'block';
    }
}

function closeFeedback() {
    document.getElementById('feedbackModal').style.display = 'none';
}

// --- Navigation Logic ---
function openStatus() {
    const statusPage = document.getElementById("statusPage");
    const mainDashboard = document.getElementById("mainDashboard");

    statusPage.classList.add("active");
    // Optional: Blur the background for a premium look
    mainDashboard.style.filter = "blur(10px)";
}

function closeStatus() {
    const statusPage = document.getElementById("statusPage");
    const mainDashboard = document.getElementById("mainDashboard");

    statusPage.classList.remove("active");
    mainDashboard.style.filter = "none";
}

// --- Data Simulation Logic ---
function refreshStats() {
    const data = {
        cpu: Math.floor(Math.random() * 100),
        ram: 45
    };

    document.getElementById('cpu-val').innerText = data.cpu + "%";
    document.getElementById('cpu-bar').style.width = data.cpu + "%";
}



function SendRequestToWebSocketConnection(socketRequestType) {
    if (window.ws && window.ws.readyState === WebSocket.OPEN) {
        const message = JSON.stringify(socketSendRequestPayLoadTypes[socketRequestType] || { type: "get-stats" });
        window.ws.send(message);
    } else {
        console.log("WebSocket not connected");
    }
}

// Update stats every 2 seconds if the page is open
setInterval(refreshStats, 2000);