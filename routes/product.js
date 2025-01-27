import express from "express";
import ProductController from "../controllers/ProductController.js";
import Product from "../models/Product.js";
import upload from "../controllers/Upload.js";

const Router = express.Router();

Router.route("/")
  .post(upload.array("images"), ProductController.createProduct)
  .get(ProductController.getProducts);

Router.route("/:id")
  .get(ProductController.getProduct)
  .delete(ProductController.deleteProduct)
  .put(ProductController.updateProduct);

export default Router;
