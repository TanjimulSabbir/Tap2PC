import "/javascript/ws-client.js";
import "/javascript/components/screen-on-server-success-ui.js";
import "/javascript/constant/button.actions.js";

import paths from "./constant/button.actions.js";
import { SendActionRequest } from "./services/send.action.request.js";
import { OpenConfirmationModal } from "./components/confirmation.modal.js";



document.querySelectorAll(".action-card").forEach((btn) => {
    btn.addEventListener("click", () => {
        const actionStr = btn.dataset.action;

        // Find the specific config object for this action
        const pathConfig = paths.find(p => p.type === actionStr);

        if (!pathConfig) return console.error("Action not mapped");

        // Logic: If there is a confirmation message, open the modal
        if (pathConfig.confirmationMessage !== null) {
            OpenConfirmationModal(pathConfig);
        } else {
            SendActionRequest(pathConfig.action);
        }
    });
});


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