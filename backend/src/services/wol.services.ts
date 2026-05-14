import wol from "wake_on_lan";
import { getSavedMac } from "./mac.services.js";

export const wakePC = () => {
    const mac = getSavedMac();
    wol.wake(mac);
};