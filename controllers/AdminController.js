import { Admin, Shop } from "../models/index.js";
import AppResponse from "../utils/appResponse.js";
import Validate from "../utils/validate.js";
import Hash from "../utils/hash.js";

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
            res
              .status(200)
              .json(AppResponse.AppSuccess(200, "Success", _admin));
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
        details: { fields: { id: "id should be an interger" } }
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
            .json(AppResponse.AppSuccess(200, "success", adminsData));
        } else {
          next({ type: "NOT_FOUND_ERROR", message: "Not found" });
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

    const missingFields = Validate.requiredFields(fieldValues, requiredFields);

    if (Object.keys(missingFields).length) {
      next({
        message: "Missing required field(s)",
        type: "VALIDATION_ERROR",
        details: { fields: missingFields }
      });
    } else {
      const userExists = await Admin.findOne({
        where: {
          email: fieldValues.email
        }
      });

      if (userExists) {
        res
          .status(409)
          .json(
            AppResponse.AppError(
              "ARLEADY_EXIST",
              409,
              "User already exists",
              "USER_EXIST",
              { email: "user with this email already exists" }
            )
          );
      } else {
        fieldValues.password = await Hash.createHash(fieldValues.password);
        Admin.create(fieldValues, { raw: true })
          .then(admin => {
            admin = admin.toJSON();

            const { password, created_at, updated_at, ..._admin } = admin;

            res
              .status(200)
              .json(AppResponse.AppSuccess(200, "success", _admin));
          })
          .catch(error => {
            next(error);
          });
      }
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
              .json(AppResponse.AppSuccess(200, "success", removed));
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
    const emptyfields = Validate.requiredFields(
      fieldsValues,
      Object.keys(fieldsValues)
    );
    if (id) {
      if (!Object.keys(emptyfields).length) {
        Admin.findByPk(id).then(admin => {
          if (admin) {
            if (Object.keys(fieldsValues).includes("password")) {
              fieldsValues.password = Hash.createHash(fieldsValues.password);
            }
            Admin.update(fieldsValues, {
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
        const error = {
          type: "VALIDATION_ERROR",
          message: "Empty fields",
          errorDetails: { fields: emptyfields }
        };
        next();
      }
    } else {
      next({ type: "VALIDATION_ERROR", message: "Id must be an integer" });
    }
  }
}

export default AdminController;
