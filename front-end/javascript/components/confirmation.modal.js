import { SendActionRequest } from "../services/send.action.request.js";

// Function to close the modal with animation
function closeModal() {
    const modalEl = document.getElementById('confirmModal');
    modalEl.classList.remove('active');

    // Wait for the CSS transition (300ms) before hiding
    setTimeout(() => {
        modalEl.style.display = 'none';
    }, 300);
}

export function OpenConfirmationModal(config) {
    const modalEl = document.getElementById('confirmModal');
    const confirmBtn = document.getElementById('confirmBtn');
    const cancelBtn = modalEl.querySelector('.btn-cancel');

    // 1. Setup Theme & Content (Same as your logic)
    const themeMap = {
        'shutdown': 'danger',
        'restart': 'warning',
        'sleep': 'warning',
        'lock': 'info',
        'system-info': 'success',
        'screen-on': 'success'
    };
    modalEl.setAttribute('data-theme', themeMap[config.type] || 'info');
    document.getElementById('modalTitle').innerText = config.name;
    document.getElementById('modalMessage').innerText = config.confirmationMessage;
    document.getElementById('modalIcon').className = config.icon;

    // 2. Clear previous event listeners (Crucial Step)
    // We clone the button to strip all existing 'onclick' or 'addEventListener' calls
    const newConfirmBtn = confirmBtn.cloneNode(true);
    confirmBtn.parentNode.replaceChild(newConfirmBtn, confirmBtn);

    // 3. Handle Confirm Click
    newConfirmBtn.addEventListener('click', () => {
        SendActionRequest(config);
        closeModal();
    });

    // 4. Handle Cancel Click
    cancelBtn.onclick = () => {
        closeModal();
    };

    // 5. Open with Animation
    modalEl.style.display = 'flex';
    setTimeout(() => modalEl.classList.add('active'), 10);
}