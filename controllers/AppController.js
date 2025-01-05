import { active } from "../utils/db.js";
import AppResponse from "../utils/appResponse.js";

class AppController {
  static async getStatus(req, res) {
    const DBStatus = await active();
    const status = { server: true, db: DBStatus };
    res.status(200).json(status);
  }

  static ErrorResponse(err, req, res, next) {
    if (err.type === "SERVER_ERROR") {
      res.status(500).json(
        AppResponse.AppError(
          "ServerError",
          500,
          err.message || "Server encountered an error",
          "SERVER_ERROR",
          err.details || {
            err: "Server encountered an error while processing your request"
          }
        )
      );
    } else if (err.type === "VALIDATION_ERROR") {
      res
        .status(400)
        .json(
          AppResponse.AppError(
            "ValidationError",
            400,
            err.message || "Can't validate your request",
            "VALIDATION_ERROR",
            err.details || { error: "Failed to validate your request" }
          )
        );
    } else if (err.type == "NOT_FOUND_ERROR") {
      res
        .status(404)
        .json(
          AppResponse.AppError(
            "NotFoundError",
            404,
            err.message || "Resource not found",
            "NOT_FOUND_ERROR",
            err.details || { error: "Requested resource not found" }
          )
        );
    }
  }
}

export default AppController;
