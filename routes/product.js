import express from "express";
import ProductController from "../controllers/ProductController.js";
import Product from "../models/Product.js";

const Router = express.Router();

Router.route("/")
  .post(ProductController.createProduct)
  .get(ProductController.getProducts);

Router.route("/:id")
  .get(ProductController.getProduct)
  .delete(ProductController.deleteProduct)
  .put(ProductController.updateProduct);

export default Router;
