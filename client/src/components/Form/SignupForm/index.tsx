"use client";
import Input from "@/components/Input";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { signup } from "@/adapters/client/auth";
import { useRouter } from "next/navigation";

interface IRegisterFormInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export default function SignupForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit } = useForm<IRegisterFormInput>();
  const onSubmit: SubmitHandler<IRegisterFormInput> = async (data) => {
    setIsSubmitting(true);

    const { email, firstName, lastName, password } = data;

    try {
      await signup({ email, firstName, lastName, password });

      router.push("login");
    } catch (error) {
      console.error(error);

      setIsSubmitting(false);
    }
  };

  return (
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
        <Input placeholder="Doe" className="w-full" {...register("lastName")} />
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
      <button className="btn btn-primary" disabled={isSubmitting}>
        Sign Up
      </button>
    </form>
  );
}
