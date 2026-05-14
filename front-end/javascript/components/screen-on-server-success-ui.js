// Function to update your UI based on WS response
export function handleServerFeedback(res) {
    const icon = document.getElementById('modalIcon');
    const title = document.getElementById('modalTitle');
    const msg = document.getElementById('modalMessage');

    if (res.success) {
        icon.className = 'status-icon-wrapper success';
        icon.innerHTML = '<i class="fas fa-check-circle"></i>';
        title.innerText = "Success!";
    } else {
        icon.className = 'status-icon-wrapper error';
        icon.innerHTML = '<i class="fas fa-times-circle"></i>';
        title.innerText = "Error";
    }
    msg.innerText = res.message;

    // Close modal after 2 seconds
    setTimeout(() => {
        document.getElementById('feedbackModal').style.display = 'none';
    }, 2000);
}