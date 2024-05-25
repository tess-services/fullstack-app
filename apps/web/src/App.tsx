import "./app/globals.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { useState } from "react";
import { Outlet } from "react-router-dom";

import { LoginPage } from "./app/auth/LoginPage";
import { Signup } from "./app/auth/Signup";
import { Dashboard } from "./app/home/Dashboard";
import { AuthContext, CurrentUser } from "./lib/contexts/AuthContext";
import { trpc } from "./trpc";

const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: import.meta.env.VITE_API_URL,
      headers() {
        const token = sessionStorage.getItem("token");

        return token
          ? {
              Authorization: token,
            }
          : {};
      },
    }),
  ],
});

const queryClient = new QueryClient();
const user = sessionStorage.getItem("user");

let userInfo: CurrentUser | null = null;

if (user) {
  userInfo = JSON.parse(user) as CurrentUser;
}

function App({ signup }: Readonly<{ signup: boolean }>) {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(userInfo);

  const handleUserLoginSuccessfully = (user: CurrentUser) => {
    setCurrentUser(user);
  };

  const getChildComponent = () => {
    if (signup) {
      if (currentUser !== null) {
        setCurrentUser(null);
      }

      return <Signup />;
    }

    return currentUser ? (
      <Dashboard />
    ) : (
      <LoginPage onLogin={handleUserLoginSuccessfully} />
    );
  };

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <AuthContext.Provider value={currentUser}>
        <QueryClientProvider client={queryClient}>
          <section className="my-32 flex item-center justify-center">
            {getChildComponent()}
            <div id="detail">
              <Outlet />
            </div>
          </section>
        </QueryClientProvider>
      </AuthContext.Provider>
    </trpc.Provider>
  );
}

export default App;
