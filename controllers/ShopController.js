import { Shop } from "../models/index.js";
import AppResponse from "../utils/appResponse.js";

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
        res.status(200).json(AppResponse.AppSucess(200, "sucess", shop));
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

  static async getShops(req, res) {
    const shops = await Shop.findAll();
    res.status(200).json(AppResponse.AppSucess(200, "success", shops));
  }

  static async createShop(req, res) {
    const fields = req.body;

    if (!("name" in fields)) {
      res
        .status(400)
        .json(
          AppResponse.AppError(
            "ValidationError",
            400,
            "Missing required field: name",
            "MISSING_FIELD",
            { name: ["Field is required"] }
          )
        );
    } else if (!("location" in fields)) {
      res
        .status(400)
        .json(
          AppResponse.AppError(
            "ValidationError",
            400,
            "Missing required field: location",
            "MISSING_FIELD",
            { location: ["Field is required"] }
          )
        );
    } else if (!("district" in fields)) {
      res
        .status(400)
        .json(
          AppResponse.AppError(
            "ValidationError",
            400,
            "Missing required field: district",
            "MISSING_FIELD",
            { district: ["Field is required"] }
          )
        );
    } else if (!("country" in fields)) {
      res
        .status(400)
        .json(
          AppResponse.AppError(
            "ValidationError",
            400,
            "Missing required field: country",
            "MISSING_FIELD",
            { country: ["Field is required"] }
          )
        );
    } else if (!("phone" in fields)) {
      res
        .status(400)
        .json(
          AppResponse.AppError(
            "ValidationError",
            400,
            "Missing required field: phone",
            "MISSING_FIELD",
            { phone: ["Field is required"] }
          )
        );
    } else {
      try {
        const shop = await Shop.create(fields);

        res
          .status(201)
          .json(AppResponse.AppSucess(201, "Created", shop.toJSON()));
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
        res.status(200).json(AppResponse.AppSucess(200, "sucess", shop));
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
              .json(AppResponse.AppSucess(200, "sucess", shopExists));
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
