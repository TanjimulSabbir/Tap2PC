// Function to update your UI based on WS response
export function handleServerFeedback(res) {

    const modal = document.getElementById('feedbackModal');

    const iconWrapper = document.getElementById('modalIcon');
    const icon = iconWrapper.querySelector('i');

    const title = document.getElementById('modalTitle');
    const msg = document.getElementById('modalMessage');
    const btn = document.getElementById('modalCloseBtn');

    if (!modal || !iconWrapper || !icon || !title || !msg || !btn) {
        console.error("Feedback modal elements missing");
        return;
    }

    // ======================
    // SUCCESS STATE
    // ======================
    if (res.success) {

        iconWrapper.className = 'status-icon-wrapper success';
        icon.className = 'fas fa-check-circle';

        title.innerText = "Success!";
        msg.innerText = res.message || "Action completed successfully.";

        btn.style.display = 'none';

        // auto close
        setTimeout(() => {
            modal.style.display = 'none';
        }, 2000);

    } else {

        // ======================
        // ERROR STATE
        // ======================
        iconWrapper.className = 'status-icon-wrapper error';
        icon.className = 'fas fa-times-circle';

        title.innerText = "Error";
        msg.innerText =
            res.message ||
            "Something went wrong while processing the request.";

        btn.style.display = 'block';
    }
}