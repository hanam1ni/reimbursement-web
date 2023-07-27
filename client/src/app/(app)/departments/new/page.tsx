import BackNavigation from "@/components/BackNavigation";
import ContainerBlock from "@/components/ContainerBlock";
import DepartmentForm from "@/components/Form/DepartmentForm";

export default function NewDepartmentPage() {
  return (
    <ContainerBlock>
      <div className="mb-4">
        <BackNavigation href="/departments" />
      </div>
      <h1 className="mb-6">New Department</h1>
      <DepartmentForm />
    </ContainerBlock>
  );
}
