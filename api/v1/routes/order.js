import express from "express";
import OrderController from "../controllers/OrderController.js";
import Order from "../models/Order.js";

const Router = express.Router();

Router.route("/")
  .get(OrderController.getOrders)
  .post(OrderController.createOrder);

Router.route("/:id")
  .get(OrderController.getOrder)
  .delete(OrderController.deleteOrder)
  .put(OrderController.updateOrder);

export default Router;
