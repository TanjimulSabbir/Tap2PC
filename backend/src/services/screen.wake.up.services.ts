import { exec } from "child_process";

export const linuxAdapter = {
    wakeScreen: async () => {
        exec("xdotool mousemove 1 1 click 1");
        exec("xset -dpms");
    },

    lockScreen: async () => {
        exec("loginctl lock-session");
    }
};


export const windowsAdapter = {
    wakeScreen: async () => {
        exec("powershell (New-Object -ComObject WScript.Shell).SendKeys('')");
    },

    lockScreen: async () => {
        exec("rundll32.exe user32.dll,LockWorkStation");
    }
};