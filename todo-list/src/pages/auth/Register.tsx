import { useNavigate } from "react-router-dom";
import { useRegister } from "../../hooks/auth/useAuth";
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

const registerSchema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  age: z
    .number()
    .min(10, "You must be at least 10 years old")
    .max(100, "Age must be under 100"),
  username: z.string().min(1, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

function Register() {
  const { registerUser, isLoading, isError, error } = useRegister();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      age: 0,
      username: "",
      password: "",
    },
  });

  function onSubmit(value: z.infer<typeof registerSchema>) {
    registerUser(value);
    navigate("/login");
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-500 to-blue-600">
      <div className="bg-white p-10 rounded-lg shadow-2xl w-full max-w-md transform hover:scale-105 transition-transform duration-500">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Create Account
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-medium text-gray-700">
                    First Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your first name"
                      className="p-3 border-2 border-gray-300 rounded-lg w-full focus:border-green-500 focus:ring-2 focus:ring-green-500 mb-4 transition duration-300"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-medium text-gray-700">
                    Last Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your last name"
                      className="p-3 border-2 border-gray-300 rounded-lg w-full focus:border-green-500 focus:ring-2 focus:ring-green-500 mb-4 transition duration-300"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-medium text-gray-700">
                    Age
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter your age"
                      className="p-3 border-2 border-gray-300 rounded-lg w-full focus:border-green-500 focus:ring-2 focus:ring-green-500 mb-4 transition duration-300"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
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
                      className="p-3 border-2 border-gray-300 rounded-lg w-full focus:border-green-500 focus:ring-2 focus:ring-green-500 mb-4 transition duration-300"
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
                      className="p-3 border-2 border-gray-300 rounded-lg w-full focus:border-green-500 focus:ring-2 focus:ring-green-500 mb-4 transition duration-300"
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
                className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 hover:shadow-lg transition-all duration-300"
              >
                {isLoading ? "Registering..." : "Register"}
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

export default Register;
