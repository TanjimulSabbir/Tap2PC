import { ShowSystemInfo } from "../components/system.info.js";
import { SendRequestToWebSocketConnection } from "./send.request.websocket.js";

export async function SendActionRequest(config) {
    if (config.type === "system-info") {
        return ShowSystemInfo(config);
    }
    const modal = document.getElementById('feedbackModal');
    const iconWrapper = document.getElementById('feedbackModalIcon');
    const icon = document.querySelector('#feedbackModalIcon i');
    const title = document.getElementById('feedbackModalTitle');
    const msg = document.getElementById('feedbackModalMessage');
    const btn = document.getElementById('feedbackModalCloseBtn');

    console.log({ modal, iconWrapper, icon, title, msg, btn });

    if (!modal || !iconWrapper || !icon || !title || !msg || !btn) {
        console.error("Feedback modal elements missing");
        return;
    }
    
    // ======================
    // LOADING STATE
    // ======================
    modal.style.display = 'flex';
    btn.style.display = 'none';

    iconWrapper.className = 'status-icon-wrapper';
    icon.className = 'fas fa-circle-notch fa-spin';

    title.innerText = config.isLoadingMessage || "Processing...";
    msg.innerText = config.shortDescription || `Executing ${config.name || "action"}...`;

    try {

        const response =
            config.requestType === "websocket"
                ? await SendRequestToWebSocketConnection(config)
                : await fetch(`/${config.action}`);

        if (!response || !response.ok) {
            throw new Error("Request Failed");
        }
        // ======================
        // SUCCESS STATE
        // ======================
        iconWrapper.className = 'status-icon-wrapper success';
        icon.className = 'fas fa-check-circle';

        title.innerText = config.successTitle || "Success";
        msg.innerText = config.successMessage || "Action completed successfully!";
        btn.style.display = 'block';
        btn.onclick = () => {
            modal.style.display = 'none';
        }
        setTimeout(() => {
            modal.style.display = 'none';
        }, 5000);

    } catch (err) {
        iconWrapper.className = 'status-icon-wrapper error';
        icon.className = 'fas fa-times-circle';

        title.innerText = config.errorTitle || "Failed";
        msg.innerText =
            config.errorMessage ||
            "Unable to connect to PC. Please check server or network.";
        btn.style.display = 'block';
        btn.onclick = () => {
            modal.style.display = 'none';
        }
    }
}