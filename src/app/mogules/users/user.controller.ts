import { RequestHandler } from 'express'
import { UserService } from './user.service'
import catchAsync from '../../../share/catchAsync'

const createUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { user } = req.body
    const result = await UserService.createUser(user)
    res.status(200).json({
      success: true,
      message: 'User created successfully',
      data: result,
    })
  }
)

// export default { createUser }
export const UserController = { createUser }
