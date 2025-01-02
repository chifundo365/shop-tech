import { Admin, Shop } from "../models/index.js";
import AppResponse from "../utils/appResponse.js";
import Validate from "../utils/validate.js";

class AdminController {
  static getAdmin(req, res, next) {
    const id = Number(req.params.id);
    const showShop = req.query.show_shop === "true" ? true : false;
    if (id) {
      let options;
      if (showShop === true) {
        options = {
          where: { id },
          include: [{ model: Shop }],
          raw: true,
          nest: true
        };
      } else {
        options = { where: { id }, raw: true };
      }
      Admin.findOne(options)
        .then(async admin => {
          if (admin) {
            const { password, ..._admin } = admin;
            res.status(200).json(AppResponse.AppSucess(200, "Success", _admin));
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

  static getAdmins(req, res, next) {
    const showShop = req.query.show_shop === "true" ? true : false;
    let options;
    if (showShop === true) {
      options = {
        include: [{ model: Shop }],
        raw: true,
        nest: true
      };
    } else {
      options = { raw: true };
    }
    Admin.findAll(options)
      .then(admins => {
        if (admins) {
          const adminsData = [];
          for (let admin of admins) {
            let { password, ...filterd } = admin;
            adminsData.push(filterd);
          }

          res
            .status(200)
            .json(AppResponse.AppSucess(200, "success", adminsData));
        } else {
          next({ type: "NOT_FOUND_ERROR", message: "Not found" });
        }
      })
      .catch(error => {
        next({ type: "SERVER_ERROR" });
      });
  }

  static createAdmin(req, res, next) {
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

    if (missingfields) {
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
              if (data[0]) {
                res
                  .status(201)
                  .json(AppResponse.AppSucess(200, "success", data[0]));
              } else {
                res
                  .status(200)
                  .json(AppResponse.AppSucess(200, "already updated", data[0]));
              }
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
