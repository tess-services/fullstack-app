import "./app/globals.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { UserList } from "./app/user/UserList";
import { trpc } from "./trpc";

const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: "http://localhost:3000",
    }),
  ],
});
const queryClient = new QueryClient();

function App() {
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <UserList />
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default App;
