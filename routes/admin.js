import express from "express";
import AdminController from "../controllers/AdminController.js";
import Admin from "../models/Admin.js";

const Router = express.Router();

Router.route("/")
  .get(AdminController.getAdmins)
  .post(AdminController.createAdmin);

Router.route("/:id")
  .get(AdminController.getAdmin)
  .delete(AdminController.deleteAdmin)
  .put(AdminController.updateAdmin);

export default Router;
