/**
 * Define a custom ApiError class inheriting from the built-in Error class (this is necessary 
 * and Best Practice because the Error class is a built-in class)
 */
class ApiError extends Error {
  constructor(statusCode, message) {
    // Call the constructor of the Error class (parent class) to still be able to use 'this' (basic Object-Oriented Programming knowledge)
    // The parent class (Error) already has the message property, so we call it directly in super to keep it concise
    super(message)

    // Name of this custom Error, if not set, it will default to "Error"
    this.name = "ApiError"

    // Assign our custom http status code here
    this.statusCode = statusCode

    // Record the Stack Trace for convenient debugging
    Error.captureStackTrace(this, this.constructor)
  }
}

export default ApiError
