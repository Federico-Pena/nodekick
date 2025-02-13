import path from "node:path";
import express from "express";
import cors from "cors";
import { apiConfig } from "../config/apiConfig.js";
import { logger } from "../middlewares/logger.js";
import someRouter from "../routes/someRouter.routes.js";
const app = express();
app.disable("x-powered-by");
app.use(express.json());
app.use(cors(apiConfig.CORS_SETTINGS));
app.use(logger);
app.use("/", express.static(path.resolve("./public")));
app.use(someRouter);
app.use("*", (req, res) => {
  res.status(404).sendFile(path.resolve("./public/404.html"));
});
var app_default = app;
export {
  app_default as default
};
