import EmployeeList from "@/components/EmployeeList";
import { Users } from "lucide-react";

export default function EmployeesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Users className="h-6 w-6 text-primary" />
          Équipe
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Gestion des employés et statuts</p>
      </div>
      <EmployeeList />
    </div>
  );
}
