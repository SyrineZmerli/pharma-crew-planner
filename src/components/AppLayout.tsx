import { ReactNode } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { LayoutDashboard, Calendar, Users, MessageSquare, TrendingUp, Shield } from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { to: "/", icon: LayoutDashboard, label: "Tableau de bord" },
  { to: "/planning", icon: Calendar, label: "Planning" },
  { to: "/employes", icon: Users, label: "Employés" },
  { to: "/previsions", icon: TrendingUp, label: "Prévisions" },
  { to: "/assistant", icon: MessageSquare, label: "Assistant IA" },
];

export default function AppLayout({ children }: { children: ReactNode }) {
  const location = useLocation();

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col hero-gradient text-primary-foreground">
        <div className="p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-foreground/10 backdrop-blur-sm">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">PharmaRH</h1>
              <p className="text-xs opacity-70">Assistant Intelligent</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                  isActive
                    ? "bg-primary-foreground/15 backdrop-blur-sm shadow-lg"
                    : "hover:bg-primary-foreground/8 opacity-80 hover:opacity-100"
                }`}
              >
                <item.icon className="h-4.5 w-4.5" />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="p-4 mx-3 mb-4 rounded-xl bg-primary-foreground/10 backdrop-blur-sm">
          <p className="text-xs font-medium opacity-90">Data2Innov</p>
          <p className="text-[11px] opacity-60 mt-0.5">Stage PFE — Prototype v1</p>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 hero-gradient px-4 py-3 flex items-center gap-3">
        <Shield className="h-5 w-5 text-primary-foreground" />
        <span className="text-primary-foreground font-bold">PharmaRH</span>
      </div>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="md:hidden h-14" /> {/* mobile header spacer */}
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-6 lg:p-8"
        >
          {children}
        </motion.div>
      </main>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border flex justify-around py-2 z-50">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 text-[10px] ${
                isActive ? "text-primary font-semibold" : "text-muted-foreground"
              }`}
            >
              <item.icon className="h-5 w-5" />
              {item.label.split(" ")[0]}
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
}
