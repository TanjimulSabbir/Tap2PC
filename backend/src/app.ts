import express from "express";
import cors from "cors";
import path from "path";

import systemRoutes from "./routes/system.routes.js";
import fileRoutes from "./routes/file.routes.js";
import statusRoutes from "./routes/status.routes.js";

const app = express();
const root = process.cwd();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(root, "front-end")));

app.use("/api/system", systemRoutes);
app.use("/api/files", fileRoutes);
app.use("/api/status", statusRoutes);

export default app;