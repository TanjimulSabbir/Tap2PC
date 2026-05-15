export async function SendRequestToWebSocketConnection(config) {
    if (window.ws && window.ws.readyState === WebSocket.OPEN) {
        const message = JSON.stringify({ type: config.type } || { type: "get-stats" });
        await window.ws.send(message);
    } else {
        throw new Error("WebSocket not connected");
    }
}
