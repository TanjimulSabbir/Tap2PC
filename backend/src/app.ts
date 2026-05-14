import express from "express";
import cors from "cors";
import path from "path";

import systemRoutes from "./routes/system.routes.js";
import fileRoutes from "./routes/file.routes.js";
import statusRoutes from "./routes/status.routes.js";
import systemInfoRoutes from "./routes/system.info.routes.js";

const app = express();
const root = process.cwd();

app.use(cors());
app.use(express.json());
app.use(express.static("front-end"));
app.get("/", (req, res) => res.sendFile(path.resolve("front-end/pages/index.html")));

app.use("/api/system", systemRoutes);
app.use("/api/files", fileRoutes);
app.use("/api/status", statusRoutes);
app.use("/api/systemInfo", systemInfoRoutes);

export default app;