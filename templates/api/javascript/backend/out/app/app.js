import path from "node:path";
import express from "express";
import cors from "cors";
import { apiConfig } from "../config/apiConfig.js";
import someRouter from "../routes/someRouter.routes.js";
import { logger } from "../middlewares/logger.js";
import { cwd } from "node:process";
const app = express();
app.disable("x-powered-by");
app.use(express.json());
app.use(cors(apiConfig.CORS_SETTINGS));
app.use(logger);
const staticPath = path.join(cwd(), "../", "frontend");
app.use("/", express.static(staticPath));
app.use(someRouter);
app.use("*", (req, res) => {
  res.status(404).sendFile(path.join(staticPath, "404.html"));
});
var app_default = app;
export {
  app_default as default
};
