import BackNavigation from "@/components/BackNavigation";
import DepartmentForm from "@/components/DepartmentForm";

export default function NewDepartmentPage() {
  return (
    <div>
      <div className="mb-4">
        <BackNavigation href="/departments" />
      </div>
      <h1 className="mb-6">New Department</h1>
      <DepartmentForm />
    </div>
  );
}
