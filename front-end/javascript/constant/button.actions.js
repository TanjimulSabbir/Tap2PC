const paths = [
    {
        name: "Shutdown",
        action: "api/system/shutdown",
        icon: "fas fa-power-off",
        type: "shutdown",
        shortDescription: "Power off your computer remotely.",
        description:
            "Safely shut down your PC from anywhere. Perfect when you forget to turn off your computer before leaving home or work.",
        isLoadingMessage: "Shutting down your PC safely...",
        confirmationMessage:
            "Are you sure you want to shut down your PC? Make sure all important work is saved before continuing.",
        successMessage:
            "💤 Your PC is going to sleep forever... well, until the next power button press 😄",
        successTitle: "Shutting Down",
        requestType: "http"
    },

    {
        name: "Restart",
        action: "api/system/restart",
        icon: "fas fa-sync-alt",
        type: "restart",
        shortDescription: "Reboot your computer instantly.",
        description:
            "Restart your PC remotely to apply updates, fix issues, or refresh system performance without touching the machine physically.",
        isLoadingMessage: "Restarting your PC...",
        confirmationMessage:
            "Are you sure you want to restart your PC? Unsaved work may be lost.",
        successTitle: "Restarting",
        successMessage:
            "🔄 Your PC is taking a quick coffee break and coming right back ☕",
        requestType: "http"
    },

    {
        name: "Sleep",
        action: "api/system/sleep",
        icon: "fas fa-bed",
        type: "sleep",
        shortDescription: "Put your PC into low-power sleep mode.",
        description:
            "Save power while keeping your session ready to resume instantly whenever you return.",
        isLoadingMessage: "Putting your PC into sleep mode...",

        confirmationMessage:
            "Do you want to put your PC to sleep now?",
        successTitle: "Sleep Mode Activated",
        successMessage:
            "😴 Sweet dreams! Your PC is now tucked into bed.",
        requestType: "http"
    },

    {
        name: "Lock",
        action: "api/system/lock",
        icon: "fas fa-lock",
        type: "lock",
        shortDescription: "Secure your PC instantly.",
        description:
            "Lock your computer remotely to protect your files, privacy, and active sessions from unauthorized access.",
        isLoadingMessage: "Securing your PC...",
        confirmationMessage:
            "Are you sure you want to lock your PC?",
        successTitle: "PC Locked",
        successMessage:
            "Locked tighter than your snack drawer at midnight.",
        requestType: "http"
    },

    {
        name: "Screen On",
        action: "api/system/screen-on",
        icon: "fas fa-sun",
        type: "screen-on",
        shortDescription: "Wake up your monitor remotely.",
        description:
            "Trigger activity on your PC to wake the screen and bring the system back to attention mode.",
        isLoadingMessage: "Waking up your PC screen...",
        confirmationMessage: null,
        successTitle: "Screen On",
        successMessage:
            "☀️ Wakey wakey! Your PC is rubbing its eyes and lighting up.",
        requestType: "websocket",
    },

    {
        name: "System Info",
        action: "api/systemInfo/info",
        icon: "fas fa-desktop",
        type: "system-info",
        shortDescription: "View live PC status and hardware details.",
        description:
            "Monitor your computer remotely with real-time information including CPU usage, memory status, operating system, uptime, and network details.",
        isLoadingMessage: "Collecting live system information...",
        confirmationMessage: null,
        successTitle: "System Information",
        successMessage:
            "📊 Your PC just spilled all its secrets successfully.",
        requestType: "http"
    }
];

export default paths;