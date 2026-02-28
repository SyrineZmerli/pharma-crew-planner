import ScheduleTable from "@/components/ScheduleTable";
import { Calendar } from "lucide-react";

export default function PlanningPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Calendar className="h-6 w-6 text-primary" />
          Planning hebdomadaire
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Optimisé automatiquement par l'IA avec contraintes réglementaires</p>
      </div>

      <div className="glass-card rounded-2xl p-4 flex flex-wrap gap-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="h-3 w-8 rounded bg-primary" />
          <span className="text-muted-foreground">Pharmacien (obligatoire)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-8 rounded bg-secondary" />
          <span className="text-muted-foreground">Préparateur</span>
        </div>
        <div className="ml-auto text-muted-foreground">Min. 2 employés par shift • 1 pharmacien requis</div>
      </div>

      <ScheduleTable />
    </div>
  );
}
