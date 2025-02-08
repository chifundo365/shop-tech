import express from "express";
import AgentController from "../controllers/AgentController.js";

const Router = express.Router();

Router.route("/")
  .get(AgentController.getAgents)
  .post(AgentController.createAgent);

Router.route("/:id")
  .get(AgentController.getAgent)
  .put(AgentController.updateAgent)
  .delete(AgentController.deleteAgent);

export default Router;
