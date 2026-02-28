import KpiCard from "@/components/KpiCard";
import ScheduleTable from "@/components/ScheduleTable";
import WorkloadChart from "@/components/WorkloadChart";
import { Users, Calendar, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Tableau de bord</h1>
        <p className="text-sm text-muted-foreground mt-1">Vue d'ensemble de votre pharmacie</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard title="Employés actifs" value={3} subtitle="sur 5 au total" icon={Users} color="teal" />
        <KpiCard title="Shifts cette semaine" value={20} subtitle="tous pourvus" icon={Calendar} color="mint" trend={{ value: "100%", positive: true }} />
        <KpiCard title="Charge moy. prévue" value="245" subtitle="clients/jour" icon={TrendingUp} color="sky" trend={{ value: "+8%", positive: false }} />
        <KpiCard title="Conformité" value="100%" subtitle="toutes règles respectées" icon={CheckCircle} color="teal" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <WorkloadChart />
        <div className="space-y-4">
          <div className="glass-card rounded-2xl p-5">
            <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-pharma-warm" />
              Alertes
            </h3>
            <div className="space-y-3">
              {[
                { text: "Charlie Leroy absent mercredi — planning ajusté", type: "warn" },
                { text: "Emma Bernard en congé toute la semaine", type: "info" },
                { text: "Forte charge prévue samedi (~300 clients)", type: "warn" },
              ].map((alert, i) => (
                <div key={i} className={`text-sm p-3 rounded-xl ${alert.type === "warn" ? "bg-pharma-warm/8 text-pharma-warm" : "bg-pharma-sky/8 text-pharma-sky"}`}>
                  {alert.text}
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card rounded-2xl p-5">
            <h3 className="font-bold text-foreground mb-3">Planning du jour</h3>
            <div className="space-y-2">
              {["Alice Dupont — Matin & Après-midi", "Bob Martin — Matin"].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="h-2 w-2 rounded-full bg-accent" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
