import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { LoginFormData, loginSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";

import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LoginForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginFormData) {
    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.ok) {
        toast.success("✅ Login successfully!");
        setTimeout(() => router.push("/dashboard"), 1000);
      } else {
        console.log("Login logic error:", result?.error);
        toast.error(result?.error || "Invalid email or password");
      }
    } catch (error) {
      console.error("Network/Server error:", error);
      toast.error("Something went wrong. Please check your connection.");
    }
  }
  return (
    <Card className="bg-black text-white border-zinc-800 w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-3xl text-center">Login</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Label className="mt-2">Email</Label>
            <Input
              {...register("email")}
              placeholder="john@example.com"
              className="mt-2 zinc-900 border-zinc-700"
            ></Input>
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <Label className="mt-2">Password</Label>
            <Input
              {...register("password")}
              type="password"
              placeholder="********"
              className="mt-2 border-zinc-700"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>
          <Button className="mt-2 w-full cursor-pointer">Login</Button>
        </form>
      </CardContent>
    </Card>
  );
}
