import wol from "wake_on_lan";
// 🔧 Replace with your PC MAC address
const MAC_ADDRESS = "AA:BB:CC:DD:EE:FF";

function wakePC() {
    return new Promise((resolve, reject) => {
        wol.wake(MAC_ADDRESS, (err: Error | null) => {
            if (err) {
                console.log("Wake failed:", err);
                return reject(err);
            }

            console.log("PC wake packet sent");
            resolve(true);
        });
    });
}

export default wakePC;