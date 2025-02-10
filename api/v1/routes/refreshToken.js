import express from "express";
import RefreshTokenController from "../controllers/refreshTokenController.js";

const Router = express.Router();

Router.route("/").post(RefreshTokenController);

export default Router;
