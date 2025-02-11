import sequelize from "../utils/db.js";
import {
  Product,
  ProductImage,
  ProductAvailability,
  Shop
} from "../models/index.js";
import AppResponse from "../utils/appResponse.js";
import Validate from "../utils/validate.js";
import Drive from "../utils/drive.js";

class ProductController {
  static async createProduct(req, res, next) {
    try {
      const { body, files } = req;

      console.log(files);

      // Validate required fields
      const requiredFields = [
        "name",
        "price",
        "description",
        "category_id",
        "availability"
      ];
      const missingFields = Validate.requiredFields(body, requiredFields);

      if (Object.keys(missingFields).length > 0) {
        return next({
          type: "VALIDATION_ERROR",
          message: "Missing required fields",
          details: { fields: missingFields },
          status: 400
        });
      }

      // Parse `availability` field (JSON string) into an object
      const availability = JSON.parse(body.availability || "[]");
      if (!Array.isArray(availability) || availability.length === 0) {
        return next({
          type: "VALIDATION_ERROR",
          message: "Availability information is required and must be an array.",
          details: { field: "availability" },
          status: 400
        });
      }

      // Validate and upload images to Google Drive
      const uploadedImages = [];
      if (files && files.length > 0) {
        let result;
        for (const file of files) {
          console.log(file);
          if (file.mimetype.split("/")[0] !== "image") {
            next({
              type: "VALIDATION_ERROR",
              message: "file is not an image",
              details: { images: `${file.originalname} is not an image` }
            });
          } else {
            result = await Drive.uploadFile(
              file,
              "1BYviSoWDR_1czCvWmRzcmwSRgeon-kzp"
            );
          }

          const data = result.data;
          uploadedImages.push({
            image_url: data.thumbnailLink,
            image_id: data.id,
            image_drive_url: data.webViewLink,
            download_url: data.webContentLink
          });
        }

        uploadedImages[0].is_primary = true;

        if (uploadedImages.length === 0) {
          return next({
            type: "VALIDATION_ERROR",
            message: "Failed to upload images.",
            status: 400
          });
        }
      } else {
        next({ type: "VALIDATION_ERROR", message: "Missing product images" });
      }

      // Transaction for product creation
      const product = await sequelize.transaction(async t => {
        // Create Product
        const createdProduct = await Product.create(
          {
            name: body.name,
            price: body.price,
            description: body.description,
            category_id: body.category_id
          },
          { transaction: t }
        );

        // Save Product Availability
        const availabilityEntries = availability.map(entry => ({
          ...entry,
          product_id: createdProduct.id
        }));

        await ProductAvailability.bulkCreate(availabilityEntries, {
          transaction: t
        });

        // Save Product Images
        if (uploadedImages.length > 0) {
          const imageEntries = uploadedImages.map(image => ({
            ...image,
            product_id: createdProduct.id
          }));
          await ProductImage.bulkCreate(imageEntries, { transaction: t });
        }

        return createdProduct;
      });

      const productWithDetails = await Product.findByPk(product.id, {
        include: [
          {
            model: ProductImage
          },
          {
            model: Shop,
            through: { attributes: ["shop_id", "stock_quantity"] }
          }
        ]
      });
      return res.status(201).json({
        success: true,
        message: "Product created successfully",
        data: productWithDetails
      });
    } catch (error) {
      next({
        type: "SERVER_ERROR",
        message: "An error occurred while creating the product",
        details: error.message,
        status: 500
      });
    }
  }

  static getProducts(req, res, next) {
    const show_shop = req.query.show_shop === "true" ? true : false;
    let options = {};
    if (show_shop) {
      options = {
        include: [
          { model: ProductImage },
          {
            model: Shop,
            through: { attributes: ["shop_id", "stock_quantity"] }
          }
        ]
      };
    } else {
      options = {
        include: [{ model: ProductImage }]
      };
    }
    Product.findAll(options)
      .then(products => {
        if (products.length) {
          res
            .status(200)
            .json(AppResponse.AppSuccess(200, "success", products));
        } else {
          next({ type: "NOT_FOUND_ERROR", message: "No products found" });
        }
      })
      .catch(error => {
        error.type = "SERVER_ERROR";
        next(error);
      });
  }

  static getProduct(req, res, next) {
    const { id } = req.params;
    const show_shop = req.query.show_shop === "true" ? true : false;
    let options = {};

    if (show_shop) {
      options = {
        include: [
          { model: ProductImage },
          {
            model: Shop,
            through: { attributes: ["shop_id", "stock_quantity"] }
          }
        ]
      };
    } else {
      options = {
        include: [{ model: ProductImage }]
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
