import express from "express";
import signInController from "../controllers/SignInController.js";

const Router = express.Router();

Router.route("/").post(signInController);

export default Router;
