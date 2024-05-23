import { initTRPC, TRPCError } from "@trpc/server";
import { Context } from "./context";

const t = initTRPC.context<Context>().create();

export const protectedProcedure = t.procedure.use(async function isAuthorised(
  opts
) {
  const { ctx } = opts;
  // `ctx.user` is nullable
  if (!ctx.user) {
    //     ^?
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return opts.next({
    ctx: {
      // ✅ user value is known to be non-null now
      user: ctx.user,
      // ^?
    },
  });
});

export const adminProcedure = t.procedure.use(async function isAuthorised(
  opts
) {
  const { ctx } = opts;
  // `ctx.user` is nullable
  if (!ctx.user?.isAdmin) {
    //     ^?
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return opts.next({
    ctx: {
      // ✅ user value is known to be non-null now
      user: ctx.user,
      // ^?
    },
  });
});

export const router = t.router;
export const publicProcedure = t.procedure;
