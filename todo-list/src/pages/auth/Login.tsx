import { useNavigate } from "react-router-dom";
import { useLogin } from "../../hooks/auth/useAuth";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Username is required"),
});

type LoginSchema = z.infer<typeof loginSchema>;

function Login() {
  const { loginUser, isLoading, isError, error } = useLogin();
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginSchema) => {
    loginUser(data);
    navigate("/todos");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormItem>
            <FormLabel>Username</FormLabel>
            <FormControl>
              <Input
                {...register("username")}
                placeholder="Username"
                className="p-2 border w-full mb-4"
              />
              {errors.username && (
                <p className="text-red-500">{errors.username.message}</p>
              )}
            </FormControl>
          </FormItem>
          
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input
                type="password"
                {...register("password")}
                placeholder="Password"
                className="p-2 border w-full mb-4"
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </FormControl>
          </FormItem>

          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </Button>

          {isError && <p className="text-red-500 mt-2">{(error as Error).message}</p>}
        </form>
      </div>
    </div>
  );
}

export default Login;
