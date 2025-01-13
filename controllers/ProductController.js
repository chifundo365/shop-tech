import { Product, ProductImage } from "../models/index.js";
import AppResponse from "../utils/appResponse.js";
import Validate from "../utils/validate.js";

class ProductController {
  static async createProduct(req, res, next) {
    const product = req.body;

    const missingfields = Validate.requiredFields(product, [
      "name",
      "price",
      "description",
      "category_id"
    ]);

    if (Object.keys(missingfields).length > 0) {
      next({
        type: "VALIDATION_ERROR",
        details: { fields: missingfields }
      });
    } else {
      Product.create(product)
        .then(product => {
          res
            .status(201)
            .json(AppResponse.AppSuccess(201, "Product created", product));
        })
        .catch(error => {
          error.type = "SERVER_ERROR";
          next(error);
        });
    }
  }

  static getProducts(req, res, next) {
    const show_images = req.query.show_images === "true" ? true : false;
    let options = {};

    if (show_images) {
      options = {
        include: [{ model: ProductImage }]
      };
    } else {
      options = {
        raw: true
      };
    }
    Product.findAll(options)
      .then(products => {
        if (products.length) {
          res
            .status(200)
            .json(AppResponse.AppSuccess(200, "success", products));
        } else {
          res.status(404).json(AppResponse.AppError(404, "No products found"));
        }
      })
      .catch(error => {
        error.type = "SERVER_ERROR";
        next(error);
      });
  }

  static getProduct(req, res, next) {
    const { id } = req.params;
    const show_images = req.query.show_images === "true" ? true : false;
    let options = {};

    if (show_images) {
      options = {
        include: [{ model: ProductImage }]
      };
    } else {
      options = {
        raw: true
      };
    }

    Product.findByPk(id, options)
      .then(product => {
        if (product) {
          res.status(200).json(AppResponse.AppSuccess(200, "success", product));
        } else {
          res.status(404).json(AppResponse.AppError(404, "Product not found"));
        }
      })
      .catch(error => {
        error.type = "SERVER_ERROR";
        next(error);
      });
  }

  static deleteProduct(req, res, next) {
    const { id } = req.params;
    Product.destroy({ where: { id } })
      .then(deleted => {
        if (deleted) {
          res
            .status(200)
            .json(AppResponse.AppSuccess(200, "Product deleted", deleted));
        } else {
          next({
            type: "NOT_FOUND_ERROR",
            message: "Product not found",
            details: { id: "Product not found" }
          });
        }
      })
      .catch(error => {
        error.type = "SERVER_ERROR";
        next(error);
      });
  }

  static updateProduct(req, res, next) {
    const { id } = req.params;
    const product = req.body;

    const missingfields = Validate.requiredFields(
      product,
      Object.keys(product)
    );

    if (Object.keys(missingfields).length > 0) {
      next({
        type: "VALIDATION_ERROR",
        details: { fields: missingfields }
      });
    } else {
      Product.update(product, { where: { id } })
        .then(updated => {
          if (updated[0]) {
            res
              .status(200)
              .json(AppResponse.AppSuccess(200, "Product updated", updated));
          } else {
            next({
              type: "NOT_FOUND_ERROR",
              message: "Product not found",
              details: { id: "Product not found" }
            });
          }
        })
        .catch(error => {
          error.type = "SERVER_ERROR";
          next(error);
        });
    }
  }
}

export default ProductController;
