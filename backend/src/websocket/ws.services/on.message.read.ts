import { exec } from "child_process";
import { getSystemInfo } from "../../services/system.info.services";

export async function handleCommand(ws: any, msg: any) {
    console.log("Received command:", msg.type);
    switch (msg.type) {
        case "screen-on":
            exec("xdotool key Shift");
            break;

        case "lock_screen":
            exec("loginctl lock-session");
            break;

        case "get_system":
            const info = await getSystemInfo();
            ws.send(JSON.stringify({
                type: "SYSTEM_INFO",
                data: info
            }));
            break;
    }
}