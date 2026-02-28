import { workloadPredictions } from "@/data/pharmacyData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

export default function WorkloadChart() {
  return (
    <div className="glass-card rounded-2xl p-6">
      <h3 className="font-bold text-foreground mb-1">Prévision de charge</h3>
      <p className="text-sm text-muted-foreground mb-6">Clients/jour — réel vs prévu</p>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={workloadPredictions} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(200 18% 90%)" />
            <XAxis dataKey="day" tick={{ fontSize: 12, fill: "hsl(210 10% 50%)" }} />
            <YAxis tick={{ fontSize: 12, fill: "hsl(210 10% 50%)" }} />
            <Tooltip
              contentStyle={{
                borderRadius: "12px",
                border: "1px solid hsl(200 18% 90%)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
                fontSize: "13px",
              }}
            />
            <Legend />
            <Bar dataKey="actual" name="Réel" fill="hsl(174 62% 32%)" radius={[6, 6, 0, 0]} />
            <Bar dataKey="predicted" name="Prévu" fill="hsl(195 70% 55%)" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
