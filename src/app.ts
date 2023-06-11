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

const app: Application = express()
app.use(cors())

// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Application routes
app.use('/api/v1/users/', userRouter)

class ApiError extends Error {
  statusCode: number
  constructor(statusCode: number, message: string | undefined, stack = '') {
    super(message)
    this.statusCode = statusCode
    if (stack) {
      this.stack = stack
    } else {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}

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
app.use((err, req: request, res: Response, next: NextFunction) => {
  // console.log(err)
  if (err instanceof Error) {
    res.status(400).json({ error: err })
  } else {
    res.status(500).json({ error: 'Something went wrong' })
  }
})

export default app
