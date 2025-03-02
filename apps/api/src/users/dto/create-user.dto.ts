import { z } from 'zod';

export const createUserSchema = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .max(20)
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'Password must contain at least one uppercase letter, and one special character',
      ),
    username: z.string(),
  })
  .required();

export type CreateUserDto = z.infer<typeof createUserSchema>;
