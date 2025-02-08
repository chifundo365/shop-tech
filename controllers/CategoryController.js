import { Category, Product, ProductImage } from "../models/index.js";
import Validate from "../utils/validate.js";
import AppResponse from "../utils/appResponse.js";

class CategoryController {
  static createCategory(req, res, next) {
    const category = req.body;

    const fields = Validate.requiredFields(category, ["name"]);

    if (Object.keys(fields).length === 0) {
      Category.findOrCreate({
        where: { name: category.name },
        defaults: category,
        raw: true
      })
        .then(([data, created]) => {
          if (created) {
            res
              .status(200)
              .json(AppResponse.AppSuccess(200, "Category created", data));
          } else {
            res
              .status(409)
              .json(AppResponse.AppSuccess(409, "Already exists", data));
          }
        })
        .catch(error => {
          error.type = "SERVER_ERROR";
          next(error);
        });
    } else {
      next({
        type: "VALIDATION_ERROR",
        message: "Missing or empty field values",
        details: { fields }
      });
    }
  }

  static getCategories(req, res, next) {
    const show_products = req.query.show_products === "true" ? true : false;
    let options = {};
    if (show_products) {
      options = {
        include: [{ model: Product, include: [{ model: ProductImage }] }]
      };
    }
    Category.findAll(options)
      .then(categories => {
        if (categories.length) {
          res
            .status(200)
            .json(AppResponse.AppSuccess(200, "success", categories));
        } else {
          next({
            type: "NOT_FOUND_ERROR",
            message: "Categories not found"
          });
        }
      })
      .catch(error => {
        error.type = "SERVER_ERROR";
        next(error);
      });
  }

  static getCategory(req, res, next) {
    const id = Number(req.params.id);
    const show_products = req.query.show_products === "true" ? true : false;
    let options = {};
    if (!isNaN(id)) {
      if (show_products) {
        options = {
          where: id,
          include: [{ model: Product, include: [{ model: ProductImage }] }]
        };
      } else {
        options = {
          where: { id }
        };
      }

      Category.findOne(options)
        .then(category => {
          if (category) {
            res
              .status(200)
              .json(AppResponse.AppSuccess(200, "success", category.toJSON()));
          } else {
            next({
              type: "NOT_FOUND_ERROR",
              message: `Category with id ${id} not found`
            });
          }
        })
        .catch(error => {
          next({
            type: "SERVER_ERROR"
          });
        });
    } else {
      next({
        type: "VALIDATION_ERROR",
        message: `ID: ${id} is not valid`,
        details: { fields: { id: "id is not a number" } }
      });
    }
  }
}

export default CategoryController;
