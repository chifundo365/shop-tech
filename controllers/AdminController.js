import { Admin, Shop } from "../models/index.js";
import AppResponse from "../utils/appResponse.js";
import Validate from "../utils/validate.js";

class AdminController {
  static async getAdmin(req, res, next) {
    const id = Number(req.params.id);
    if (id) {
      Admin.findOne({
        where: { id },
        include: [
          {
            model: Shop
          }
        ]
      })
        .then(async admin => {
          if (admin) {
            res.status(200).json(AppResponse.AppSucess(200, "Success", admin));
          } else {
            next({
              type: "NOT_FOUND_ERROR",
              message: `admin with id '${id}' not found`
            });
          }
        })
        .catch(error => {
          error.type = "SERVER_ERROR";
          next(error);
        });
    } else {
      next({
        type: "VALIDATION_ERROR",
        details: { id: ["id should be  an interger"] }
      });
    }
  }

  static async getAdmins(req, res, next) {
    Admin.findAll({
      include: [{ model: Shop }],
      raw: true,
      nest: true
    })
      .then(admins => {
        if (admins) {
          console.log(admins);
          const adminsData = [];
          for (let admin of admins) {
            let { password, ...filterd } = admin;
            adminsData.push(filterd);
          }

          res
            .status(200)
            .json(AppResponse.AppSucess(200, "success", adminsData));
        } else {
          next({ type: "NOT_FOUND_ERROR", message: "Admins not found" });
        }
      })
      .catch(error => {
        next({ type: "SERVER_ERROR" });
      });
  }

  static async createAdmin(req, res, next) {
    const fieldValues = req.body;

    const requiredFields = [
      "first_name",
      "last_name",
      "email",
      "phone",
      "password",
      "shop_id"
    ];

    const missingfields = Validate.requiredFields(
      Object.keys(fieldValues),
      requiredFields
    );

    console.log(missingfields);
    if (missingfields) {
      console.log("HERE >>>>>>>>>>>");
      next({
        message: "Missing required fields",
        type: "VALIDATION_ERROR",
        details: missingfields
      });
    } else {
      Admin.create(fieldValues)
        .then(admin => {
          res.status(200).json(AppResponse.AppSucess(200, "sucesss", admin));
        })
        .catch(error => {
          next(error);
        });
    }
  }

  static deleteAdmin(req, res, next) {
    const id = Number(req.params.id);

    if (id) {
      Admin.destroy({
        where: { id }
      })
        .then(removed => {
          if (removed) {
            res
              .status(200)
              .json(AppResponse.AppSucess(200, "success", removed));
          } else {
            next({
              type: "NOT_FOUND_ERROR",
              message: `admin with id '${id} not found'`
            });
          }
        })
        .catch(err => {
          err.type = "SERVER_ERROR";
          err.message = `Could not  delete admin with id '${id}'`;
          next(err);
        });
    }
  }

  static updateAdmin(req, res, next) {
    const id = Number(req.params.id);
    const fieldsValues = req.body;

    if (id) {
      Admin.findByPk(id).then(admin => {
        if (admin) {
          Admin.update(fieldsValues, {
            where: { id }
          })
            .then(data => {
              res.status(200).json(AppResponse.AppSucess(200, "success", data));
            })
            .catch(error => {
              next({ type: "SERVER_ERROR" });
            });
        } else {
          next({
            type: "NOT_FOUND_ERROR",
            message: `Could not update admin with id ${id}, Not Found`
          });
        }
      });
    } else {
      next({ type: "VALIDATION_ERROR", message: "Id must be an integer" });
    }
  }
}

export default AdminController;
