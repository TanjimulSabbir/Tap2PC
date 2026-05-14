const ws = new WebSocket(`ws://${location.host}`);

ws.onopen = () => {
    console.log("✅ Connected to WebSocket");
};

ws.onmessage = (event) => {
    console.log("📩 Message:", event.data);
};

ws.onclose = () => {
    console.log("❌ Disconnected");
};

ws.onerror = (err) => {
    console.log("❌ WS Error:", err);
};