import { Router } from "express";
import { apiConfig } from "../config/apiConfig.js";
import someController from "../controllers/someController.js";
const someRouter = Router();
const { route1 } = apiConfig.API_ROUTES.someRoutes;
someRouter.get(route1, someController);
var someRouter_routes_default = someRouter;
export {
  someRouter_routes_default as default
};
