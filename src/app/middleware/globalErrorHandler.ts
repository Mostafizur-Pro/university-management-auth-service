import express, { NextFunction, Request, Response } from 'express'

// Global error handler
const globalErrorHandler = (
  err,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(400).json({ newErr: err })
  next()
}

export default globalErrorHandler
