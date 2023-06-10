import express, { Application, Request, Response } from 'express'
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

app.get('/', async (req: Request, res: Response) => {
  // await userService.createUser({
  //   id: '999',
  //   password: '1234',
  //   role: 'student',
  // })
  res.send('Working successfully')
})

export default app
