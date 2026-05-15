import { Router } from "express";
import si from "systeminformation";

const router = Router();

router.get("/info", async (_req, res) => {
    try {

        const [
            battery,
            cpu,
            os,
            network,
            time,
            disk,
            mem
        ] = await Promise.all([
            si.battery(),
            si.cpu(),
            si.osInfo(),
            si.networkInterfaces(),
            si.time(),
            si.diskLayout(),
            si.mem()
        ]);

        res.json({
            battery,
            cpu,
            os,
            network,
            time,
            disk,
            mem
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch system info",
            error: "error details hidden for security"
        });
    }
});

export default router;