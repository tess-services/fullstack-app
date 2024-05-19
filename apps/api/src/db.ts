import { PrismaClient } from "@prisma/client";
import type { UserInput } from "../types";

const prisma = new PrismaClient();

export const db = {
  user: {
    findMany: async () => prisma.user.findMany(),
    findById: async (id: string) => prisma.user.findFirst({ where: { id } }),
    create: async (data: UserInput) => {
      const user = await prisma.user.create({ data });

      return user;
    },
  },
};
