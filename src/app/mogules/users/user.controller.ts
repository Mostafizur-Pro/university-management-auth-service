import { NextFunction, Request, RequestHandler, Response } from 'express'
import { UserService } from './user.service'
import catchAsync from '../../../share/catchAsync'
import sendResponse from '../../../share/sendResponse'
import httpStatus from 'http-status'

const createUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { user } = req.body
    const result = await UserService.createUser(user)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User created successfully',
      data: result,
    })
  }
)

export const UserController = { createUser }
