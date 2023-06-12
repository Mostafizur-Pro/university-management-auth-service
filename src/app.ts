import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'

import globalErrorHandler from './app/middleware/globalErrorHandler'
import { UserRoute } from './app/mogules/users/user.route'
import ApiError from './error/ApiError'

const app: Application = express()
app.use(cors())

// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Application routes
app.use('/api/v1/users/', UserRoute)

// Testing
app.get('/', (req: Request, res: Response, next: NextFunction) => {
  // throw new ApiError(400, 'Ore Baba Error')
  // Promise.reject(new Error('Unhanlder Promise Rejection'))
  // console.log(x)
  throw new Error('Testing Error')
})

// Global error handler
app.use(globalErrorHandler)

export default app
