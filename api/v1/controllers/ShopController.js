import { Shop } from "../models/index.js";
import AppResponse from "../utils/appResponse.js";
import Validate from '../utils/validate.js'

class ShopController {
  static async getShop(req, res) {
    try {
      const id = Number(req.params.id);

      const shop = await Shop.findOne({
        where: {
          id
        }
      });

      if (shop !== null) {
        res.status(200).json(AppResponse.AppSuccess(200, "success", shop));
      } else {
        res
          .status(404)
          .json(
            AppResponse.AppError(
              "NotFoundError",
              404,
              "Resource not found",
              "NOT_FOUND",
              { id: ["Resource with requested id not found"] }
            )
          );
      }
    } catch (error) {
      res
        .status(200)
        .json(
          AppResponse.AppError(
            "ValidationError",
            400,
            "Invalid resource ID",
            "INVALID_INPUT",
            { id: ["ID is not an integer"] }
          )
        );
    }
  }

  static async getShops(req, res, next) {
    const shops = await Shop.findAll();
    if (!shops.length) {
      next({status:404, message: 'Shops not found'})
    } else {
      res.status(200).json(AppResponse.AppSuccess(200, "success", shops));
    }
  }

  static async createShop(req, res, next) {
    const fields = req.body;

    const missing = Validate.requiredFields(fields, ['name', 'location', 'district', 'country', 'phone']);
    
    if (Object.keys(missing).length) {
      next({status:400, details: missing})
    } else {
      try {
        const shop = await Shop.create(fields);

        res
          .status(201)
          .json(AppResponse.AppSuccess(201, "Created", shop.toJSON()));
      } catch (error) {
        console.error("Can not create a record in table <shops>:", error);
        res
          .status(500)
          .json(
            AppResponse.AppError(
              "ServerError",
              500,
              "Server encountered an error",
              "SERVER_ERROR",
              { server: ["Error occured when processing your request"] }
            )
          );
      }
    }
  }

  static async deleteShop(req, res) {
    try {
      const id = Number(req.params.id);

      const shop = await Shop.destroy({
        where: {
          id
        }
      });

      if (shop) {
        res.status(200).json(AppResponse.AppSuccess(200, "success", shop));
      } else {
        res
          .status(404)
          .json(
            AppResponse.AppError(
              "NotFoundError",
              404,
              "Resource not found",
              "NOT_FOUND",
              { id: ["Resource with requested id not found"] }
            )
          );
      }
    } catch (error) {
      res
        .status(200)
        .json(
          AppResponse.AppError(
            "ValidationError",
            400,
            "Invalid resource ID",
            "INVALID_INPUT",
            { id: ["ID is not an integer"] }
          )
        );
    }
  }

  static async updateShop(req, res) {
    try {
      const id = parseInt(req.params.id);
      const fieldValues = req.body;

      if (isNaN(id)) {
        next({ type: "VALIDATION_ERROR" });
      }

      const shopExists = await Shop.findOne({ where: { id } });

      if (shopExists) {
        Shop.update(fieldValues, {
          where: {
            id
          }
        })
          .then(data => {
            res
              .status(200)
              .json(AppResponse.AppSuccess(200, "success", shopExists));
          })
          .catch(error => {
            res
              .status(200)
              .json(
                AppResponse.AppError(
                  "ValidationError",
                  400,
                  "Field to update does not exists",
                  "NOT_FOUND",
                  { fields: ["fields passed are not recognised by the system"] }
                )
              );
          });
      } else {
        res
          .status(404)
          .json(
            AppResponse.AppError(
              "NotFoundError",
              404,
              "Resource not found",
              "NOT_FOUND",
              { id: ["Resource with requested id not found"] }
            )
          );
      }
    } catch (error) {
      res
        .status(200)
        .json(
          AppResponse.AppError(
            "ValidationError",
            400,
            "Invalid resource ID",
            "INVALID_INPUT",
            { id: ["ID is not an integer"] }
          )
        );
    }
  }
}

export default ShopController;
