import { z } from "zod";

export const userInputSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});
export type UserInput = z.infer<typeof userInputSchema>;

export const userSchema = userInputSchema.extend({
  id: z.string(),
});

export type User = z.infer<typeof userSchema>;
