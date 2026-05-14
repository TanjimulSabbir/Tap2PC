import { Router } from "express";
import multer from "multer";
import fs from "fs";
import path from "path";

const router = Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("file"), (_req, res) => {
  res.send("Uploaded");
});

router.get("/", (_req, res) => {
  res.json(fs.readdirSync("./uploads"));
});

router.get("/:name", (req, res) => {
  res.download(path.join("uploads", req.params.name));
});

export default router;