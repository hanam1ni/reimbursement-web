"use client";
import Input from "@/components/Input";
import { SubmitHandler, useForm } from "react-hook-form";

interface IRegisterFormInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export default function SignUp() {
  const { register, handleSubmit } = useForm<IRegisterFormInput>();
  const onSubmit: SubmitHandler<IRegisterFormInput> = (data) =>
    console.log(data);

  return (
    <section>
      <h1 className="mb-6 text-3xl font-bold">Sign Up</h1>
      <form
        className="max-w-[300px] flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label className="block mb-2 text-gray-500">First Name</label>
          <Input
            placeholder="John"
            className="w-full"
            {...register("firstName")}
          />
        </div>
        <div>
          <label className="block mb-2 text-gray-500">Last Name</label>
          <Input
            placeholder="Doe"
            className="w-full"
            {...register("lastName")}
          />
        </div>
        <div>
          <label className="block mb-2 text-gray-500">Email</label>
          <Input
            placeholder="john@mail.com"
            className="w-full"
            {...register("email")}
          />
        </div>
        <div>
          <label className="block mb-2 text-gray-500">Password</label>
          <Input
            type="password"
            placeholder="Secure Password"
            className="w-full"
            {...register("password")}
          />
        </div>
        <button className="btn btn-primary">Sign Up</button>
      </form>
    </section>
  );
}
