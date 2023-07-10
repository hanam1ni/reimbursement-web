import { listUsers } from "@/adapters/server/user";
import Pagination from "@/components/Pagination";
import UserTable from "@/components/Table/UserTable";

export default async function UsersPage({ searchParams }: ServerPageProps) {
  const { page } = searchParams;

  const users = await listUsers(page);

  return (
    <div className="h-full flex flex-col">
      <h1 className="mb-8 text-2xl font-semibold">Users</h1>
      <div className="mb-8 flex-1">
        <UserTable data={users.data.data} />
      </div>
      <Pagination searchParams={searchParams} {...users.data.page} />
    </div>
  );
}
