import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { SignupFormData, signupSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });
  function onSubmit(data: SignupFormData) {
    console.log(data);
  }

  return (
    <Card className="bg-black text-white border-zinc-800 w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-3xl text-center">Create Account</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Label>First Name</Label>
            <Input
              {...register("firstName")}
              placeholder="John"
              className="mt-2 zinc-900 border-zinc-700"
            ></Input>
            {errors.firstName && (
              <p className="mt-1 txt-sm text-red-500">
                {errors.firstName.message}
              </p>
            )}
          </div>
          <div>
            <Label className="mt-2">Last Name</Label>
            <Input
              {...register("lastName")}
              placeholder="Doe"
              className="mt-2 zinc-900 border-zinc-700"
            ></Input>
            {errors.lastName && (
              <p className="mt-1 txt-sm text-red-500">
                {errors.lastName.message}
              </p>
            )}
          </div>
          <div>
            <Label className="mt-2">Email</Label>
            <Input
              {...register("email")}
              placeholder="john@example.com"
              className="mt-2 zinc-900 border-zinc-700"
            ></Input>
            {errors.email && (
              <p className="mt-1 txt-sm text-red-500">{errors.email.message}</p>
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
              <p className="mt-1 txt-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>
          <Button className="mt-2 w-full cursor-pointer">Create Account</Button>
        </form>
      </CardContent>
    </Card>
  );
}
