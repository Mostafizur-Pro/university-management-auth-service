import { NextFunction, Request, Response } from 'express'
import { IGenericErrorMessage } from '../../interfaces/error'
import handleValidationError from '../../error/handleValidationError'
import config from '../../config'
import ApiError from '../../error/ApiError'

// Global error handler
const globalErrorHandler = (
  err,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //   res.status(400).json({ newErr: err })

  //   type IGenericErrorMessage = {
  //     path: string
  //     message: string
  //   }

  let statusCode: 500
  let message = 'Something went wrong'
  let errorMessage: IGenericErrorMessage[] = []

  if (err?.name === 'ValidationsError') {
    const simplifiedError = handleValidationError(err)
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
    stack: config.env !== 'production' ? err?.stack : undefined,
  })

  next()
}

export default globalErrorHandler
