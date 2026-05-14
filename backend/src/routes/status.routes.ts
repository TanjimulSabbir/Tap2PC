import { Router } from "express";
import si from "systeminformation";

const router = Router();

router.get("/", async (_req, res) => {
  const cpu = await si.currentLoad();
  const mem = await si.mem();

  res.json({
    cpu: cpu.currentLoad,
    ram: mem.used
  });
});

export default router;