import AppResponse from "../utils/appResponse.js";

const errorResponse = (err, req, res, next) => {
  if (err.status === 500 || err.type === "SERVER_ERROR") {
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
  } else if (err.status === 400 || err.type === "VALIDATION_ERROR") {
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
  } else if (err.status === 404 || err.type == "NOT_FOUND_ERROR") {
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
  } else if (err.status === 401 || err.type === "UNAUTHORIZED_ERROR") {
    res.status(401).json(
      AppResponse.AppError(
        "UnauthorizedError",
        401,
        err.message || "Unauthorized to access the resource",
        "UNAUTHROIZED_ERROR",
        err.details || {
          error: "Not authorized to access the requested resource"
        }
      )
    );
  } else if (err.status === 403 || err.type === "FORBIDDEN_ERROR") {
    res.status(401).json(
      AppResponse.AppError(
        "ForbiddenError",
        403,
        err.message || "Forbidden to access the resource",
        "FORBIDDEN_ERROR",
        err.details || {
          error: "Forbidden to access the requested resource"
        }
      )
    );
  }
};

export { errorResponse };
