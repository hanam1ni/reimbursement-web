import { getDepartment } from "@/adapters/server/department";
import DepartmentSummary from "./_components/DepartmentSummary";
import ContainerBlock from "@/components/ContainerBlock";
import DepartmentMemberTable from "@/components/table/DepartmentMemberTable";

export default async function DepartmentDetailPage({
  params,
}: ServerPageProps) {
  const departmentId = params.departmentId;

  const department = await getDepartment(departmentId);

  return (
    <div>
      <ContainerBlock className="mb-4">
        <DepartmentSummary department={department.data} />
      </ContainerBlock>
      <ContainerBlock>
        <h3 className="h3 mb-6">Members</h3>
        <DepartmentMemberTable data={department.data.userDepartments} />
      </ContainerBlock>
    </div>
  );
}
