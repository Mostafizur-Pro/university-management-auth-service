// eslint-disable-next-line no-unused-expressions
import { ErrorRequestHandler } from 'express'
import { IGenericErrorMessage } from '../../interfaces/error'
import handleValidationError from '../../error/handleValidationError'
import config from '../../config'
import ApiError from '../../error/ApiError'
import { errorlogger } from '../../share/logger'
import { ZodError } from 'zod'
import handleZodError from '../../error/handleZodError'
import handleCastError from '../../error/handleCastError'

// Global error handler
const globalErrorHandler: ErrorRequestHandler = (error, req, res) => {
  // eslint-disable-next-line no-unused-expressions
  config.env === 'development'
    ? console.log(`globalErrorHandler`, error)
    : errorlogger.error(`globalErrorHandler`, error)

  let statusCode: 500
  let message = 'Something went wrong'
  let errorMessage: IGenericErrorMessage[] = []

  if (error?.name === 'ValidationsError') {
    const simplifiedError = handleValidationError(error)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessage = simplifiedError.errorMessage
  } else if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessage = simplifiedError.errorMessage
  } else if (error?.name === 'CastError') {
    // res.status(200).json({error})   postman a hit korle details dekhabe
    const simplifiedError = handleCastError(error)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessage = simplifiedError.errorMessage
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode
    message = error?.message
    errorMessage = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : []
  } else if (error instanceof Error) {
    message = error?.message
    errorMessage = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : []
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessage,
    stack: config.env !== 'production' ? error?.stack : undefined,
  })
}

export default globalErrorHandler
