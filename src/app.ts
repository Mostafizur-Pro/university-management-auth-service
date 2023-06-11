import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'

import globalErrorHandler from './app/middleware/globalErrorHandler'
import { UserRoute } from './app/mogules/users/user.route'

const app: Application = express()
app.use(cors())

// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Application routes
app.use('/api/v1/users/', UserRoute)

// Testing
app.get(
  '/',
  /* async */ (req: Request, res: Response, next: NextFunction) => {
    // res.send('Working successfully')
    throw new Error('Ore Baba Error')
    // next('Ore baba aito dekhi error')
  }
)

// Global error handler
app.use(globalErrorHandler)

export default app
