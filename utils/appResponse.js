//  Validation error format //
// const error = {
//     "error": "ValidationError",
//     "statusCode": 400,
//     "message": "Missing required field: 'name'",
//     "errorCode": "MISSING_FIELD",
//     "errorDetails": {
//         "name": ["Field is required"]
//     }
// }

class AppResponse {
  static AppError(errorType, statusCode, message, errorCode, errorDetails) {
    return {
      errorType,
      statusCode,
      message,
      errorCode,
      errorDetails
    };
  }

  static AppSuccess(statusCode, message, data) {
    return {
      statusCode,
      message,
      data
    };
  }
}

export default AppResponse;
