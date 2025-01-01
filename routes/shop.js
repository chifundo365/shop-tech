import express from "express";
import ShopController from "../controllers/ShopController.js";

const Router = express.Router();

Router.route("/").get(ShopController.getShops).post(ShopController.createShop);

Router.route("/:id")
  .get(ShopController.getShop)
  .delete(ShopController.deleteShop)
  .put(ShopController.updateShop);

export default Router;
