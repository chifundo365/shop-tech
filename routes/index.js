import express from "express";
import AppController from "../controllers/AppController.js";
import ShopRoutes from "../routes/shop.js";
import AdminRoutes from "../routes/admin.js";
import AgentRoutes from "../routes/agent.js";
import CategoryRoutes from "../routes/category.js";
import ProductRoutes from "../routes/product.js";
import OrderRoutes from "../routes/order.js";

const Router = express.Router();

Router.use("/shops", ShopRoutes);
Router.use("/admins", AdminRoutes);
Router.use("/agents", AgentRoutes);
Router.use("/categories", CategoryRoutes);
Router.use("/products", ProductRoutes);
Router.use("/orders", OrderRoutes);

// HTTP Error middleware
Router.use(AppController.ErrorResponse);
Router.get("/status", AppController.getStatus);

export default Router;
