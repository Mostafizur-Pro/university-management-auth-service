import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'

import globalErrorHandler from './app/middleware/globalErrorHandler'
import { UserRoute } from './app/mogules/users/user.route'

import { AcademicSemesterRoute } from './app/mogules/academicSemester/academicSemester.route'

const app: Application = express()
app.use(cors())

// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Application routes
app.use('/api/v1/users/', UserRoute)
app.use('/api/v1/academic-semester/', AcademicSemesterRoute)

// Testing
app.get('/', (req: Request, res: Response, next: NextFunction) => {
  throw new Error('Testing Error')
})

// Global error handler
app.use(globalErrorHandler)

export default app
