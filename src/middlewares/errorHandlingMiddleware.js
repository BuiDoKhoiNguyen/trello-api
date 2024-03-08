import { StatusCodes } from 'http-status-codes'
import { env } from '~/config/environment'

// Middleware handling errors centrally in the NodeJS Back-end application (ExpressJS)
export const errorHandlingMiddleware = (err, req, res, next) => {

  // If the developer carelessly omits the statusCode, it defaults to code 500 INTERNAL_SERVER_ERROR
  if (!err.statusCode) err.statusCode = StatusCodes.INTERNAL_SERVER_ERROR

  // Create a responseError variable to control what to return
  const responseError = {
    statusCode: err.statusCode,
    message: err.message || StatusCodes[err.statusCode], 
    stack: err.stack
  }
  // If there is no message for the error, use standard ReasonPhrases according to the Status Code
  // console.error(responseError)

  // Only when the environment is DEV will the Stack Trace be returned for easier debugging, otherwise remove it. (To understand more, see video 55 in the MERN Stack series on the Youtube channel: https://www.youtube.com/@trungquandev)
  // if (env.BUILD_MODE !== 'dev') delete responseError.stack
  if (env.BUILD_MODE !== 'dev') delete responseError.stack
  // This section can be expanded later, such as logging Error Logs to a file, sending error notifications to Slack, Telegram, Email groups...etc. Or you can write separate code into another Middleware file depending on the project.
  // ... 
  // console.error(responseError)

  // Return responseError to the Front-end
  res.status(responseError.statusCode).json(responseError)
}
