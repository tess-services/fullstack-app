import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CurrentUser } from "@/lib/contexts/AuthContext";
import { trpc } from "@/trpc";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { loginInputSchema } from "../../../../api/types";

export const LoginPage = ({
  onLogin,
}: {
  onLogin: (user: CurrentUser) => void;
}) => {
  const form = useForm<z.infer<typeof loginInputSchema>>({
    resolver: zodResolver(loginInputSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginMutation = trpc.user.validateLogin.useMutation();

  const onSubmit = async (values: z.infer<typeof loginInputSchema>) => {
    const data = await loginMutation.mutateAsync(values);

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

    form.setError("root.serverError", {
      type: "deps",
      message: data?.message || "An error occurred",
    });
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Please authenticate to access the application
        </CardDescription>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <CardContent>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="abc@xyz.com" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is email id used with sign up.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="password" type="password" {...field} />
                  </FormControl>
                  <FormDescription>Your password</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Sign up</Button>
            <Button>Login</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};
