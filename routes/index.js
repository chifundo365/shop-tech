import express from "express";
import AppController from "../controllers/AppController.js";
import ShopRoutes from "../routes/shop.js";
import AdminRoutes from "../routes/admin.js";
import AgentRoutes from "../routes/agent.js";

const Router = express.Router();

Router.use("/shops", ShopRoutes);
Router.use("/admins", AdminRoutes);
Router.use("/agents", AgentRoutes);

// HTTP Error middleware
Router.use(AppController.ErrorResponse);
Router.get("/status", AppController.getStatus);

export default Router;
