import { CurrentUser } from "@/lib/contexts/AuthContext";
import { trpc } from "@/trpc";
import { useState } from "react";
import { Link } from "react-router-dom";

export const LoginPage = ({
  onLogin,
}: {
  onLogin: (user: CurrentUser) => void;
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>("");
  const loginMutation = trpc.user.validateLogin.useMutation();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const data = await loginMutation.mutateAsync({
      email,
      password,
    });

    if (!data) {
      setError("Failed to login");
      return;
    }

    if (data.success) {
      const { id, name, email } = data.user;
      window.sessionStorage.setItem("token", data.token);
      window.sessionStorage.setItem(
        "user",
        JSON.stringify({ id, name, email })
      );
      onLogin({ id, name, email });
      return;
    }

    setError(data.message);
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {error && <div>{error}</div>}
      New User - <Link to={`/signup`}>Signup here </Link>
    </div>
  );
};
