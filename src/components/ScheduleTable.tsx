import { days, shifts, schedule } from "@/data/pharmacyData";
import { Badge } from "@/components/ui/badge";

export default function ScheduleTable() {
  return (
    <div className="glass-card rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left p-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Jour</th>
              {shifts.map((s) => (
                <th key={s} className="text-left p-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider">{s}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {days.map((day, i) => (
              <tr key={day} className={`border-b border-border/50 ${i % 2 === 0 ? "bg-muted/30" : ""}`}>
                <td className="p-4 font-semibold text-foreground">{day}</td>
                {shifts.map((shift) => {
                  const assigned = schedule.filter((s) => s.day === day && s.shift === shift);
                  return (
                    <td key={shift} className="p-4">
                      <div className="flex flex-wrap gap-1.5">
                        {assigned.map((a) => (
                          <Badge
                            key={a.employeeId}
                            variant={a.role === "Pharmacien" ? "default" : "secondary"}
                            className="text-xs font-medium"
                          >
                            {a.employeeName.split(" ")[0]}
                          </Badge>
                        ))}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
