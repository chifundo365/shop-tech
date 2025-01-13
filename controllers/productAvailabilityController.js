import { ProductAvailability } from "../models/index.js";
import AppResponse from "../utils/appResponse.js";
import Validate from "../utils/validate.js";

class ProductAvailabilityController {
  static async createProductAvailability(req, res, next) {
    const productAvailability = req.body;

    const missingfields = Validate.requiredFields(productAvailability, [
      "product_id",
      "shop_id"
    ]);

    if (Object.keys(missingfields).length > 0) {
      next({
        type: "VALIDATION_ERROR",
        details: { fields: missingfields }
      });
    } else {
      ProductAvailability.create(productAvailability)
        .then(productAvailability => {
          res
            .status(201)
            .json(
              AppResponse.AppSuccess(
                201,
                "Product availability created",
                productAvailability
              )
            );
        })
        .catch(error => {
          error.type = "SERVER_ERROR";
          next(error);
        });
    }
  }

  static getProductAvailabilities(req, res, next) {
    ProductAvailability.findAll()
      .then(productAvailabilities => {
        if (productAvailabilities.length) {
          res
            .status(200)
            .json(
              AppResponse.AppSuccess(200, "success", productAvailabilities)
            );
        } else {
          res
            .status(404)
            .json(AppResponse.AppError(404, "No product availabilities found"));
        }
      })
      .catch(error => {
        error.type = "SERVER_ERROR";
        next(error);
      });
  }

  static async getProductAvailability(req, res, next) {
    const id = req.params.id;
    ProductAvailability.findByPk(id)
      .then(productAvailability => {
        if (productAvailability) {
          res
            .status(200)
            .json(AppResponse.AppSuccess(200, "success", productAvailability));
        } else {
          next({
            type: "NOT_FOUND_ERROR",
            message: "Product availability not found."
          });
        }
      })
      .catch(error => {
        error.type = "SERVER_ERROR";
        next(error);
      });
  }
}
