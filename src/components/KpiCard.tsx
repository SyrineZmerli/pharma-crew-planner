import { ReactNode } from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface KpiCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: { value: string; positive: boolean };
  color: "teal" | "mint" | "sky" | "warm" | "rose";
}

const colorMap = {
  teal: "bg-primary/10 text-primary",
  mint: "bg-accent/10 text-accent",
  sky: "bg-pharma-sky/10 text-pharma-sky",
  warm: "bg-pharma-warm/10 text-pharma-warm",
  rose: "bg-pharma-rose/10 text-pharma-rose",
};

export default function KpiCard({ title, value, subtitle, icon: Icon, trend, color }: KpiCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-2xl p-5"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
          <p className="text-3xl font-bold mt-1 text-foreground">{value}</p>
          {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
          {trend && (
            <span className={`text-xs font-medium mt-2 inline-block ${trend.positive ? "text-accent" : "text-pharma-rose"}`}>
              {trend.positive ? "↑" : "↓"} {trend.value}
            </span>
          )}
        </div>
        <div className={`p-3 rounded-xl ${colorMap[color]}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </motion.div>
  );
}
