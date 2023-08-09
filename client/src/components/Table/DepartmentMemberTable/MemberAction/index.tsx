"use client";

import { deleteRole, updateRole } from "@/adapters/client/userDepartment";
import { UserDepartment } from "@/adapters/types";
import Button from "@/components/Button";
import Input from "@/components/Input";
import {
  Select,
  SelectInput,
  SelectItem,
  SelectOption,
} from "@/components/Select";
import {
  BaseDialog,
  BaseDialogTrigger,
  BaseDialogContent,
  BaseDialogClose,
} from "@/components/dialog/BaseDialog";
import {
  ActionDropdown,
  ActionDropdownTrigger,
  ActionDropdownContent,
  ActionDropdownItem,
} from "@/components/dropdown/ActionDropdown";
import { faPencil, faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
import * as Dialog from "@radix-ui/react-dialog";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

interface IRoleForm {
  role: UserDepartment["role"];
}

export default function MemberAction({
  userDepartment,
}: {
  userDepartment: UserDepartment;
}) {
  const [modal, setModal] = useState<"role" | "delete">();

  return (
    <BaseDialog>
      <ActionDropdown>
        <ActionDropdownTrigger />
        <ActionDropdownContent>
          <BaseDialogTrigger asChild onClick={() => setModal("role")}>
            <ActionDropdownItem icon={faPencil}>Update Role</ActionDropdownItem>
          </BaseDialogTrigger>

          <BaseDialogTrigger asChild onClick={() => setModal("delete")}>
            <ActionDropdownItem className="text-red-400" icon={faDeleteLeft}>
              Delete
            </ActionDropdownItem>
          </BaseDialogTrigger>
        </ActionDropdownContent>
      </ActionDropdown>
      <BaseDialogContent>
        {modal == "role" && <UpdateRoleForm userDepartment={userDepartment} />}
        {modal == "delete" && (
          <DeleteConfirmation userDepartment={userDepartment} />
        )}
      </BaseDialogContent>
    </BaseDialog>
  );
}

function UpdateRoleForm({
  userDepartment,
}: {
  userDepartment: UserDepartment;
}) {
  const { control, handleSubmit } = useForm<IRoleForm>({
    defaultValues: { role: userDepartment.role },
  });
  const pathname = usePathname();

  const onSubmit: SubmitHandler<IRoleForm> = async (data) => {
    await updateRole(userDepartment.id, data.role);

    window.location.href = pathname;
  };

  return (
    <>
      <h3 className="h3 mb-3">Update User Role</h3>
      <p className="mb-3 text-sm text-gray-700">
        Updates member roles and authorizes managers for expense claim reviews
      </p>
      <Input
        label="User"
        className="mb-3 w-56"
        value={`${userDepartment.user.firstName} ${userDepartment.user.lastName}`}
        disabled
      />
      <label className="label">Role</label>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="role"
          render={({ field: { onChange, value } }) => (
            <Select
              onValueChange={(role) => onChange(role as UserDepartment["role"])}
              value={value}
            >
              <SelectInput className="block w-56" placeholder="Select Role" />
              <SelectOption>
                <SelectItem value="manager">Manager</SelectItem>
                <SelectItem value="member">Member</SelectItem>
              </SelectOption>
            </Select>
          )}
        />

        <div className="flex justify-end mt-4">
          <BaseDialogClose asChild>
            <Button size="sm" variant="ghost" aria-label="Close">
              Cancel
            </Button>
          </BaseDialogClose>
          <Button size="sm" className="ml-1">
            Update Role
          </Button>
        </div>
      </form>
    </>
  );
}

function DeleteConfirmation({
  userDepartment,
}: {
  userDepartment: UserDepartment;
}) {
  const userName = `${userDepartment.user.firstName} ${userDepartment.user.lastName}`;
  const pathname = usePathname();

  const handleRemove = async () => {
    await deleteRole(userDepartment.id);

    window.location.href = pathname;
  };

  return (
    <>
      <h3 className="h3 mb-3">Remove member from the department?</h3>
      <p className="mb-4 text-sm text-gray-700">
        You are about to remove {userName} from the department
      </p>

      <div className="flex justify-end">
        <BaseDialogClose asChild>
          <Button size="sm" variant="ghost" aria-label="Close">
            Cancel
          </Button>
        </BaseDialogClose>
        <Button
          size="sm"
          variant="error"
          className="ml-1"
          onClick={handleRemove}
        >
          Remove User
        </Button>
      </div>
    </>
  );
}
