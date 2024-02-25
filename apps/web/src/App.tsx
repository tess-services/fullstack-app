import { useState } from "react";
import "./app/globals.css";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <Input
          placeholder="Placeholder"
          value={count}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setCount(Number(e.target.value))
          }
        />
        <Button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </Button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
