import { listUsers } from "@/adapters/server/user";
import ContainerBlock from "@/components/ContainerBlock";
import Pagination from "@/components/Pagination";
import UserTable from "@/components/Table/UserTable";

export default async function UsersPage({ searchParams }: ServerPageProps) {
  const { page } = searchParams;

  const users = await listUsers(page);

  return (
    <ContainerBlock className="h-full flex flex-col">
      <h1 className="mb-8">Users</h1>
      <div className="mb-8 flex-1">
        <UserTable data={users.data.data} />
      </div>
      <Pagination searchParams={searchParams} {...users.data.page} />
    </ContainerBlock>
  );
}
