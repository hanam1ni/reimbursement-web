import { listDepartment } from "@/adapters/server/department";
import Pagination from "@/components/Pagination";
import DepartmentTable from "@/components/Table/DepartmentTable";

export default async function DepartmentsPage({
  searchParams,
}: ServerPageProps) {
  const { page } = searchParams;

  const departments = await listDepartment(page);

  return (
    <div className="h-full flex flex-col">
      <h1 className="mb-8 text-2xl font-semibold">Departments</h1>
      <div className="mb-8 flex-1">
        <DepartmentTable data={departments.data.data} />
      </div>
      <Pagination searchParams={searchParams} {...departments.data.page} />
    </div>
  );
}
