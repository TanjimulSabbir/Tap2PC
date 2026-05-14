import { Router } from "express";
import si from "systeminformation";

const router = Router();

router.get("/info", async (_req, res) => {
    const ram = si.battery();
    const cpu = si.cpu();
    const os = si.osInfo();
    const network = si.networkInterfaces();
    const time = si.time();
    const disk = si.diskLayout();
    const mem = si.mem();

    res.json({
        ram,
        cpu,
        os,
        network,
        time,
        disk,
        mem
    });

});

export default router;