import type { User, UserInput } from "../types";
const users: User[] = [
  { id: "1", name: "Alice", email: "alice@gmail.com", password: "123456" },
  { id: "2", name: "Bob", email: "bob@gmail.com", password: "123456" },
];

export const db = {
  user: {
    findMany: async () => users,
    findById: async (id: string) => users.find((user) => user.id === id),
    create: async (data: UserInput) => {
      const user = { id: String(users.length + 1), ...data };
      users.push(user);
      return user;
    },
  },
};
