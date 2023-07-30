export enum ExpenseClaimStatus {
  CREATED = "created",
  APPROVED = "approved",
  REJECTED = "rejected",
  COMPLETED = "completed",
}

export interface ExpenseClaim {
  id: number;
  title: string;
  amount: string;
  status: ExpenseClaimStatus;
  description: string;
  createdAt: string;
  updatedAt: string;
  createdBy: {
    firstName: string;
    lastName: string;
  };
  approvedBy?: {
    firstName: string;
    lastName: string;
  };
  rejectedBy?: {
    firstName: string;
    lastName: string;
  };
  attachments?: {
    id: number;
    name: string;
  }[];
}

export enum UserDepartmentRole {
  MANAGER = "manager",
  MEMBER = "member",
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  roles: { name: string }[];
  userDepartments: { role: UserDepartmentRole }[];
}
