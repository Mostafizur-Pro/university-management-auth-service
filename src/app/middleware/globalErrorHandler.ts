import express, { NextFunction, Request, Response } from 'express'
import { IGenericErrorMessage } from '../../interfaces/error'

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

  res.status(statusCode).json({
    success: false,
    message,
    errorMessage,
    stack: config.env !== 'production' ? err?.stack : undefined,
  })

  next()
}

export default globalErrorHandler
