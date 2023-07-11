import { listDepartment } from "@/adapters/server/department";
import Button from "@/components/Button";
import Pagination from "@/components/Pagination";
import DepartmentTable from "@/components/Table/DepartmentTable";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default async function DepartmentsPage({
  searchParams,
}: ServerPageProps) {
  const { page } = searchParams;

  const departments = await listDepartment(page);

  return (
    <div className="h-full flex flex-col">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Departments</h1>
        <Link href={"/departments/new"}>
          <Button>
            {" "}
            <FontAwesomeIcon icon={faPlus} />
            New
          </Button>
        </Link>
      </div>
      <div className="mb-8 flex-1">
        <DepartmentTable data={departments.data.data} />
      </div>
      <Pagination searchParams={searchParams} {...departments.data.page} />
    </div>
  );
}
