import wol from "wake_on_lan";
import { getSavedMacAddressFromFileSync } from "./mac.address.services";


export const wakePC = () => {
    const mac = getSavedMacAddressFromFileSync();
    wol.wake(mac);
};