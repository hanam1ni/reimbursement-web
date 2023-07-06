"use client";

import Input from "@/components/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { login } from "@/adapters/auth";
import { useState } from "react";
import Toast from "../Toast";
import { AxiosError } from "axios";

interface ILoginFormInput {
  email: string;
  password: string;
}

export default function LoginForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const { register, handleSubmit } = useForm<ILoginFormInput>();
  const onSubmit: SubmitHandler<ILoginFormInput> = async (data) => {
    setIsSubmitting(true);

    const { email, password } = data;

    try {
      const resp = await login({ email, password });
      console.log(resp);
    } catch (error) {
      setIsSubmitting(false);

      if (error instanceof AxiosError) {
        const { response } = error as AxiosError;

        if (response?.status == 401) {
          return setFormError("Invalid credentials, Please try again later.");
        }
      }

      return setFormError("Something went wrong, Please try again later.");
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      {formError && (
        <Toast
          body={formError}
          type="error"
          onDismiss={() => setFormError(null)}
        />
      )}
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
        Log In
      </button>
    </form>
  );
}
