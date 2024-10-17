import { useNavigate } from "react-router-dom";
import { useLogin } from "../../hooks/auth/useAuth";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormItem,
  FormControl,
  FormLabel,
  FormField,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const loginSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

function Login() {
  const { loginUser, isLoading, isError, error } = useLogin();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onSubmit(value: z.infer<typeof loginSchema>) {
    loginUser(value);
    navigate("/todos");
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 to-purple-600">
      <div className="bg-white p-10 rounded-lg shadow-2xl w-full max-w-md transform hover:scale-105 transition-transform duration-500">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Welcome Back!
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-medium text-gray-700">
                    Username
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your username"
                      className="p-3 border-2 border-gray-300 rounded-lg w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500 mb-6 transition duration-300"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-medium text-gray-700">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      className="p-3 border-2 border-gray-300 rounded-lg w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500 mb-6 transition duration-300"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="mt-3">
              <Button
                type="submit"
                disabled={isLoading}
                className=" w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 hover:shadow-lg transition-all duration-300"
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </div>

            {isError && (
              <p className="text-red-500 mt-4 text-center">
                {(error as Error).message}
              </p>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
}

export default Login;
