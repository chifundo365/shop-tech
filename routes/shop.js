import express from "express";
import ShopController from "../controllers/ShopControllers.js";

const Router = express.Router();

Router.route('/')
.get(ShopController.getShops)
.post(ShopController.createShop);

export default Router;