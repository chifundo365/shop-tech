import express from "express";
import CategoryController from "../controllers/CategoryController.js";

const Router = express.Router();

Router.route("/")
  .get(CategoryController.getCategories)
  .post(CategoryController.createCategory);

Router.route("/:id").get(CategoryController.getCategory);

export default Router;
