import bcrypt from "bcryptjs";
import { z } from "zod";
import { userInputSchema } from "../../types";
import { db } from "../db";
import { generateToken } from "../jwtUtils";
import { protectedProcedure, publicProcedure, router } from "../trpc";
import userLoginResponse from "../types/userLoginResponse";

export const userRouter = router({
  list: protectedProcedure.query(async () => {
    const users = await db.user.findMany();

    return users;
  }),
  byId: protectedProcedure.input(z.string()).query(async (opts) => {
    const { input } = opts;
    const user = await db.user.findById(input);

    return user;
  }),
  create: publicProcedure.input(userInputSchema).mutation(async (opts) => {
    const { input } = opts;
    const user = await db.user.create(input);

    return user;
  }),
  validateLogin: publicProcedure
    .input(
      z.object({
        email: z.string(),
        password: z.string(),
      })
    )
    .output(userLoginResponse)
    .mutation(async (opts) => {
      const { input } = opts;
      const user = await db.user.findByEmail(input.email);

      if (!user) {
        return {
          success: false,
          message: "User not found",
        };
      }

      const passwordMatch = await bcrypt.compare(
        `${input.email} ${input.password}`,
        user.password
      );

      if (!passwordMatch) {
        return {
          success: false,
          message: "User and password do not match",
        };
      }
      const token = generateToken(user.id);

      return {
        success: true,
        message: "User is valid",
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      };
    }),
});
