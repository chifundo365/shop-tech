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



class Error {
    static validationError(error, statusCode, message, errorCode, errorDetails) {
        return {
            error,
            statusCode,
            message,
            errorCode,
            errorDetails,
        }
    }
}

export default Error;