import { createHTTPServer } from "@trpc/server/adapters/standalone";
import cors from "cors";
import { z } from "zod";
import { userInputSchema } from "../types";
import { db } from "./db";
import { publicProcedure, router } from "./trpc";

const appRouter = router({
  userList: publicProcedure.query(async () => {
    const users = await db.user.findMany();
    return users;
  }),
  userById: publicProcedure.input(z.string()).query(async (opts) => {
    const { input } = opts;
    const user = await db.user.findById(input);

    return user;
  }),
  createUser: publicProcedure.input(userInputSchema).mutation(async (opts) => {
    const { input } = opts;
    const user = await db.user.create(input);
    return user;
  }),
});

export type AppRouter = typeof appRouter;

const server = createHTTPServer({
  middleware: cors(),
  router: appRouter,
});

server.listen(process.env.PORT ?? 3001);
console.log("Server is running on ", process.env.PORT ?? 3001);
