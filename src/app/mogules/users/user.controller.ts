import { NextFunction, Request, Response } from 'express'
import userService from './user.service'

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = req.body
    const result = await userService.createUser(user)
    res.status(400).json({
      success: true,
      message: 'User created successfully',
      data: result,
    })
  } catch (err) {
    next(err)
    // res.status(400).json({
    //   // success: false,
    //   // message: 'Failed to create user',
    //   // error: err,
    // })
  }
}

export default { createUser }
