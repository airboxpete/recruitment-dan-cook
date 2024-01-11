import { NextFunction, Request, Response } from 'express'
import { Schema, ZodError } from 'zod'

export const validate = (schema: Schema) => (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse(req.body)

    next()
  } catch (err) {
    return res.status(400).send((err as ZodError)?.errors)
  }
}
