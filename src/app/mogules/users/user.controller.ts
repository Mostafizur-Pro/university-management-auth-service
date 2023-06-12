import { RequestHandler } from 'express'
import { UserService } from './user.service'
import { z } from 'zod'

const createUser: RequestHandler = async (req, res, next) => {
  try {
    // req-validation
    // body --> object
    // data --> object
    // note: amader schema banaite hobe object ar upor base kore

    const createUserZodSchema = z.object({
      body: z.object({
        role: z.string({
          required_error: 'role is required',
        }),
        password: z.string().optional(),
      }),
    })

    await createUserZodSchema.parseAsync(req)

    const { user } = req.body
    const result = await UserService.createUser(user)
    res.status(400).json({
      success: true,
      message: 'User created successfully',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

// export default { createUser }
export const UserController = { createUser }
