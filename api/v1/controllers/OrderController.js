import { Order } from "../models/index.js";
import AppResponse from "../utils/appResponse.js";
import Validate from "../utils/validate.js";

class OrderController {
  static async createOrder(req, res, next) {
    const order = req.body;

    const missingfields = Validate.requiredFields(order, [
      "customer_name",
      "customer_phone",
      "product_id",
      "quantity"
    ]);

    if (Object.keys(missingfields).length > 0) {
      next({
        type: "VALIDATION_ERROR",
        details: { fields: missingfields }
      });
    } else {
      Order.create(order)
        .then(order => {
          res
            .status(201)
            .json(AppResponse.AppSuccess(201, "Order created", order));
        })
        .catch(error => {
          error.type = "SERVER_ERROR";
          next(error);
        });
    }
  }

  static getOrders(req, res, next) {
    Order.findAll()
      .then(orders => {
        if (orders.length) {
          res.status(200).json(AppResponse.AppSuccess(200, "success", orders));
        } else {
          res.status(404).json(AppResponse.AppError(404, "No orders found"));
        }
      })
      .catch(error => {
        error.type = "SERVER_ERROR";
        next(error);
      });
  }

  static async getOrder(req, res, next) {
    const id = req.params.id;
    Order.findByPk(id)
      .then(order => {
        if (order) {
          res.status(200).json(AppResponse.AppSuccess(200, "success", order));
        } else {
          next({
            type: "NOT_FOUND_ERROR",
            message: "Orders not found."
          });
        }
      })
      .catch(error => {
        error.type = "SERVER_ERROR";
        next(error);
      });
  }

  static async deleteOrder(req, res, next) {
    const id = req.params.id;
    Order.findByPk(id)
      .then(order => {
        if (order) {
          order.destroy().then(() => {
            res
              .status(200)
              .json(AppResponse.AppSuccess(200, "Order deleted", order));
          });
        } else {
          res.status(404).json(AppResponse.AppError(404, "Order not found"));
        }
      })
      .catch(error => {
        error.type = "SERVER_ERROR";
        next(error);
      });
  }

  static updateOrder(req, res, next) {
    const id = req.params.id;
    const order = req.body;

    Order.findByPk(id)
      .then(order => {
        if (order) {
          order.update(order).then(order => {
            res
              .status(200)
              .json(AppResponse.AppSuccess(200, "Order updated", order));
          });
        } else {
          res.status(404).json(AppResponse.AppError(404, "Order not found"));
        }
      })
      .catch(error => {
        error.type = "SERVER_ERROR";
        next(error);
      });
  }
}
export default OrderController;
