import { getDepartment } from "@/adapters/server/department";
import DepartmentSummary from "./_components/DepartmentSummary";
import ContainerBlock from "@/components/ContainerBlock";
import DepartmentMemberTable from "@/components/table/DepartmentMemberTable";
import DepartmentAction from "./_components/DepartmentAction";

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
        <div className="flex justify-between">
          <h3 className="h3 mb-6">Members</h3>
          <DepartmentAction department={department.data} />
        </div>
        <DepartmentMemberTable data={department.data.userDepartments} />
      </ContainerBlock>
    </div>
  );
}
