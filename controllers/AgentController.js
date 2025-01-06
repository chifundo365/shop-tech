import { Admin, Agent } from "../models/index.js";
import AppResponse from "../utils/appResponse.js";
import Hash from "../utils/hash.js";
import Validate from "../utils/validate.js";

class AgentController {
  static async createAgent(req, res, next) {
    const agent = req.body;

    const missingfields = Validate.requiredFields(agent, [
      "first_name",
      "last_name",
      "email",
      "phone",
      "password",
      "admin_id",
      "residence",
      "district",
      "country"
    ]);

    if (Object.keys(missingfields).length > 0) {
      next({
        type: "VALIDATION_ERROR",
        details: { fields: missingfields }
      });
    } else {
      agent.password = await Hash.createHash(agent.password);
      Agent.create(agent)
        .then(agent => {
          const {
            password,
            created_at,
            updated_at,
            ..._agent
          } = agent.toJSON();
          res
            .status(201)
            .json(AppResponse.AppSuccess(201, "Agent created", _agent));
        })
        .catch(error => {
          error.type = "SERVER_ERROR";
          next(error);
        });
    }
  }

  static getAgent(req, res, next) {
    const showAdmin = req.query.show_admin === "true" ? true : false;
    const id = Number(req.params.id);
    let options;

    if (!isNaN(id)) {
      if (showAdmin) {
        options = {
          raw: true,
          nest: true,
          where: { id },
          include: [
            {
              model: Admin,
              attributes: [
                "id",
                "first_name",
                "last_name",
                "email",
                "phone",
                "shop_id"
              ]
            }
          ]
        };
      } else {
        options = { where: { id }, raw: true };
      }

      Agent.findOne(options)
        .then(agent => {
          if (agent) {
            const { password, created_at, updated_at, ..._agent } = agent;
            res
              .status(200)
              .json(AppResponse.AppSuccess(200, "success", _agent));
          } else {
            next({ type: "NOT_FOUND_ERROR" });
          }
        })
        .catch(error => {
          error.type = "SERVER_ERROR";
          next(error);
        });
    }
  }

  static getAgents(req, res, next) {
    const showAdmin = req.query.show_admin === "true" ? true : false;

    let options;

    if (showAdmin) {
      options = {
        raw: true,
        nest: true,
        include: [
          {
            model: Admin,
            attributes: [
              "id",
              "first_name",
              "last_name",
              "email",
              "phone",
              "shop_id"
            ]
          }
        ]
      };
    } else {
      options = { raw: true };
    }

    Agent.findAll(options)
      .then(agents => {
        if (agents.length > 0) {
          const _agents = [];
          for (let agent of agents) {
            let { password, created_at, updated_at, ..._agent } = agent;
            _agents.push(_agent);
          }
          res.status(200).json(AppResponse.AppSuccess(200, "Success", _agents));
        } else {
          next({
            type: "NOT_FOUND_ERROR",
            message: "No agents found"
          });
        }
      })
      .catch(error => {
        error.type = "SERVER_ERROR";
        next(error);
      });
  }

  static deleteAgent(req, res, next) {
    const id = Number(req.params.id);

    if (id) {
      Agent.destroy({
        where: { id }
      })
        .then(removed => {
          if (removed) {
            res
              .status(200)
              .json(AppResponse.AppSuccess(200, "success", removed));
          } else {
            next({
              type: "NOT_FOUND_ERROR",
              message: `agent  with id '${id} not found'`
            });
          }
        })
        .catch(err => {
          err.type = "SERVER_ERROR";
          err.message = `Could not  delete agent with id '${id}'`;
          next(err);
        });
    }
  }

  static updateAgent(req, res, next) {
    const id = Number(req.params.id);
    const fieldsValues = req.body;

    const emptyfields = Validate.requiredFields(
      fieldsValues,
      Object.keys(fieldsValues)
    );

    if (id) {
      if (Object.keys(emptyfields).length === 0) {
        Agent.findByPk(id).then(async admin => {
          if (admin) {
            if (Object.keys(fieldsValues).includes("password")) {
              fieldsValues.password = await Hash.createHash(
                fieldsValues.password
              );
            }
            Agent.update(fieldsValues, {
              where: { id }
            })
              .then(data => {
                if (data[0]) {
                  res
                    .status(201)
                    .json(AppResponse.AppSuccess(200, "success", data[0]));
                } else {
                  res
                    .status(200)
                    .json(
                      AppResponse.AppSuccess(200, "already updated", data[0])
                    );
                }
              })
              .catch(error => {
                next({
                  type: "SERVER_ERROR",
                  message: `Could not update admin with id ${id}, Not Found`
                });
              });
          } else {
            next({
              type: "NOT_FOUND_ERROR",
              message: `Could not update admin with id ${id}, Not Found`
            });
          }
        });
      } else {
        next({
          type: "VALIDATION_ERROR",
          message: "Empty fields",
          details: { fields: emptyfields }
        });
      }
    } else {
      next({ type: "VALIDATION_ERROR", message: "Id must be an integer" });
    }
  }
}

export default AgentController;
