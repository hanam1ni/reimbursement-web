"use client";

import Button from "../Button";
import Input from "../Input";
import { SubmitHandler, useForm } from "react-hook-form";
import UserSelect from "./UserSelect";
import { User } from "@/adapters/client/user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { createDepartment } from "@/adapters/client/department";
import Toast from "../Toast";
import { motion } from "framer-motion";
import UserCard from "./SelectedUserList";
import SelectedUserList from "./SelectedUserList";

interface IDepartmentForm {
  name: string;
  users: User[];
}

export default function DepartmentForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const { register, handleSubmit, setValue, getValues, watch } =
    useForm<IDepartmentForm>({
      defaultValues: { users: [] },
    });
  const users = watch("users");

  const onSelectUser = (user: User) => {
    const users = getValues("users");

    if (users.map(({ id }) => id).includes(user.id)) {
      return;
    }

    users.push(user);
    setValue("users", users);
  };

  const onRemoveUser = (user: User) => {
    const users = getValues("users");

    setValue(
      "users",
      users.filter(({ id }) => id != user.id)
    );
  };

  const onSubmit: SubmitHandler<IDepartmentForm> = async (data) => {
    setIsSubmitting(true);

    const { name, users } = data;

    try {
      await createDepartment({ name, userIds: users.map(({ id }) => id) });

      window.location.href = "/departments";
    } catch (error) {
      setIsSubmitting(false);

      return setFormError("Something went wrong, Please try again later.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {formError && (
        <Toast
          body={formError}
          type="error"
          onDismiss={() => setFormError(null)}
        />
      )}
      <div className="mb-2">
        <Input
          placeholder="Finance"
          label="Name"
          className="w-96"
          {...register("name")}
        />
      </div>
      <UserSelect onSelectUser={onSelectUser} />
      {users.length > 0 && (
        <SelectedUserList users={users} onRemoveUser={onRemoveUser} />
      )}
      <Button className="mt-4" disabled={isSubmitting}>
        Create
      </Button>
    </form>
  );
}
