import { createContext } from "react";

export type CurrentUser = {
  id: string;
  name: string;
  email: string;
};

export const AuthContext = createContext<CurrentUser | null>(null);
