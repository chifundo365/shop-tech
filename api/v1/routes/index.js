import express from "express";
import { errorResponse } from "../middleware/errorResponse.js";
import ShopRoutes from "../routes/shop.js";
import AdminRoutes from "../routes/admin.js";
import AgentRoutes from "../routes/agent.js";
import CategoryRoutes from "../routes/category.js";
import ProductRoutes from "../routes/product.js";
import OrderRoutes from "../routes/order.js";
import refreshTokenRoute from "../routes/refreshToken.js";
import loginRoute from "../routes/login.js";
import AppController from "../controllers/AppController.js";

const Router = express.Router();

Router.use("/shops", ShopRoutes);
Router.use("/admins", AdminRoutes);
Router.use("/agents", AgentRoutes);
Router.use("/categories", CategoryRoutes);
Router.use("/products", ProductRoutes);
Router.use("/orders", OrderRoutes);
Router.use("/login", loginRoute);
Router.use("/refresh-token", refreshTokenRoute);

Router.get("/status", AppController.getStatus);

// HTTP Error middleware
Router.use(errorResponse);

export default Router;
