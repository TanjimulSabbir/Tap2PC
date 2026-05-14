import { Router } from "express";
import * as controller from "../controllers/system.controller.js";

const router = Router();

router.get("/shutdown", controller.shutdown);
router.get("/restart", controller.restart);
router.get("/lock", controller.lock);
router.get("/sleep", controller.sleep);
router.get("/screen-on", controller.screenOn);

export default router;