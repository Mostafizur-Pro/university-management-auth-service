import express, {
  Application,
  NextFunction,
  Request,
  Response,
  request,
} from 'express'
import cors from 'cors'
import userRouter from './app/mogules/users/user.route'
import userService from './app/mogules/users/user.service'
import globalErrorHandler from './app/middleware/globalErrorHandler'

const app: Application = express()
app.use(cors())

// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Application routes
app.use('/api/v1/users/', userRouter)

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
