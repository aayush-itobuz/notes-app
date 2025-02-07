import z from 'zod';

export const userRegistrationSchema = z.object({
  userName: z.string(),
  email: z.string().email("invalid"),
  password: z.string().min(8, "too short")
})

export const userLoginSchema = z.object({
  email: z.string().email("invalid"),
  password: z.string().min(8, "too short")
})

export const validateData = (schema) => {
  return (req, res, next) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        for (const issue of error.issues) {
          res.status(401).json(`${issue.path} is ${issue.message}`);
        }
      } else {
        res.status(401).json('Unexpected error:', error);
      }
    }
  }
}