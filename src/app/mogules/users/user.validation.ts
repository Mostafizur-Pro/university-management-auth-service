import { z } from 'zod'

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

export const UserValidation = {
  createUserZodSchema,
}

// await createUserZodSchema.parseAsync(req)
// note aita chole gese validateRequest.ts ar modde
