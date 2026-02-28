import { employees } from "@/data/pharmacyData";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Mail, Clock } from "lucide-react";

const statusConfig = {
  active: { label: "Actif", className: "bg-accent/10 text-accent border-accent/20" },
  absent: { label: "Absent", className: "bg-pharma-rose/10 text-pharma-rose border-pharma-rose/20" },
  congé: { label: "En congé", className: "bg-pharma-warm/10 text-pharma-warm border-pharma-warm/20" },
};

export default function EmployeeList() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {employees.map((emp, i) => {
        const status = statusConfig[emp.status];
        return (
          <motion.div
            key={emp.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass-card rounded-2xl p-5"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-11 w-11 rounded-xl hero-gradient flex items-center justify-center text-sm font-bold text-primary-foreground">
                {emp.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground truncate">{emp.name}</p>
                <p className="text-xs text-muted-foreground">{emp.role}</p>
              </div>
              <Badge variant="outline" className={`text-[10px] ${status.className}`}>
                {status.label}
              </Badge>
            </div>

            <div className="space-y-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5" />
                <span className="truncate">{emp.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-3.5 w-3.5" />
                <span>Max {emp.maxHours}h / semaine</span>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
