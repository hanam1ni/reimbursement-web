"use client";

import { createDepartment } from "@/adapters/client/department";
import { User } from "@/adapters/types";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Toast from "@/components/Toast";
import UserSearchSelect from "@/components/searchSelect/UserSearchSelect";
import SelectedUserList from "@/components/searchSelect/UserSearchSelect/SelectedUserList";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

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
      <UserSearchSelect label={true} onSelectUser={onSelectUser} />
      {users.length > 0 && (
        <SelectedUserList users={users} onRemoveUser={onRemoveUser} />
      )}
      <Button className="mt-4" disabled={isSubmitting}>
        Create
      </Button>
    </form>
  );
}
