import express from "express";
import ProductAvailabilityController from "../controllers/ProductAvailabilityController.js";

const Router = express.Router();

Router.route("/")
  .get(ProductAvailabilityController.getProductAvailabilities)
  .post(ProductAvailabilityController.createProductAvailability);

Router.route("/:id")
  .get(ProductAvailabilityController.getProductAvailability)
  .delete(ProductAvailabilityController.deleteProductAvailability)
  .put(ProductAvailabilityController.updateProductAvailability);
