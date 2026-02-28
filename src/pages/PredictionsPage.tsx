import WorkloadChart from "@/components/WorkloadChart";
import { TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";
import { workloadPredictions } from "@/data/pharmacyData";
import { motion } from "framer-motion";

export default function PredictionsPage() {
  const avgPredicted = Math.round(
    workloadPredictions.reduce((sum, d) => sum + d.predicted, 0) / workloadPredictions.length
  );
  const peakDay = workloadPredictions.reduce((max, d) => (d.predicted > max.predicted ? d : max));
  const needsReinforcement = peakDay.predicted > 250;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-primary" />
          Prévisions d'activité
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Modèle prédictif basé sur RandomForest</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-2xl p-5 text-center">
          <p className="text-sm text-muted-foreground">Moyenne prévue</p>
          <p className="text-3xl font-bold text-foreground mt-1">{avgPredicted}</p>
          <p className="text-xs text-muted-foreground">clients/jour</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="glass-card rounded-2xl p-5 text-center">
          <p className="text-sm text-muted-foreground">Jour pic</p>
          <p className="text-3xl font-bold text-foreground mt-1">{peakDay.day}</p>
          <p className="text-xs text-muted-foreground">{peakDay.predicted} clients</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className={`glass-card rounded-2xl p-5 text-center ${needsReinforcement ? "border-pharma-warm/30" : ""}`}>
          <p className="text-sm text-muted-foreground">Recommandation</p>
          <div className="flex items-center justify-center gap-2 mt-2">
            {needsReinforcement ? (
              <>
                <AlertTriangle className="h-5 w-5 text-pharma-warm" />
                <span className="font-bold text-pharma-warm">Renfort conseillé</span>
              </>
            ) : (
              <>
                <CheckCircle className="h-5 w-5 text-accent" />
                <span className="font-bold text-accent">Effectif suffisant</span>
              </>
            )}
          </div>
        </motion.div>
      </div>

      <WorkloadChart />
    </div>
  );
}
