import { z } from 'zod';
export const CreatePasteSchema = z
  .object({
    title: z.string(),
    content: z.string(),
    syntax: z.string(),
    date: z.string().optional().nullable(),
    mode: z.enum(['public', 'private', 'password']),
    password: z.string().optional().nullable(),
    recaptchaToken: z.string(),
  })
  .required()
  .refine(
    (data) =>
      data.mode !== 'password' ||
      (data.password && data.password.trim() !== ''),
  );

export type CreatePasteDto = z.infer<typeof CreatePasteSchema>;
