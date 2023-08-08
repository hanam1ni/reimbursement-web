"use client";

import { bulkAssignMember } from "@/adapters/client/department";
import { Department, User } from "@/adapters/types";
import Button from "@/components/Button";
import BaseModal from "@/components/modal/BaseModal";
import UserSearchSelect from "@/components/searchSelect/UserSearchSelect";
import SelectedUserList from "@/components/searchSelect/UserSearchSelect/SelectedUserList";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function AddMemberModal({
  department,
}: {
  department: Department;
}) {
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const pathname = usePathname();

  const handleSelectUser = (user: User) => {
    if (selectedUsers.map(({ id }) => id).includes(user.id)) {
      return;
    }

    setSelectedUsers([...selectedUsers, user]);
  };

  const handleRemoveUser = (removedUser: User) => {
    const updatedUsers = selectedUsers.filter(
      (user) => user.id !== removedUser.id
    );

    setSelectedUsers(updatedUsers);
  };

  const handleAddMember = async () => {
    try {
      setIsSubmitting(true);

      const userIds = selectedUsers.map(({ id }) => id);
      await bulkAssignMember(department.id, userIds);

      window.location.href = pathname;
    } catch (error) {
      setIsSubmitting(false);
    }
  };

  return (
    <BaseModal
      id="add-member-modal"
      className="w-full max-w-4xl overflow-visible"
    >
      <h3 className="h3 mb-2">Add new members</h3>
      <UserSearchSelect onSelectUser={handleSelectUser} />
      {selectedUsers.length > 0 && (
        <SelectedUserList
          users={selectedUsers}
          onRemoveUser={handleRemoveUser}
        />
      )}
      <div className="flex justify-end mt-6">
        <Button
          variant="ghost"
          className="mr-2"
          onClick={() => window["add-member-modal"].close()}
        >
          Cancel
        </Button>
        <Button
          disabled={selectedUsers.length == 0 || isSubmitting}
          onClick={handleAddMember}
        >
          Add Member
        </Button>
      </div>
    </BaseModal>
  );
}
