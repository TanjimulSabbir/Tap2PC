import WebSocket from "ws";
import { exec } from "child_process";

const ws = new WebSocket("ws://localhost:8080");

ws.on("open", () => {
    console.log("Connected to server");
});

ws.on("message", (msg) => {
    const command = msg.toString();
    console.log("Command:", command);

    if (command === "sleep") {
        exec("systemctl suspend");
    }

    if (command === "screen-on") {
        exec("DISPLAY=:0 xset dpms force on");
    }
});