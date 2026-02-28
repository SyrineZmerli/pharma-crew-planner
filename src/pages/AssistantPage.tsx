import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MessageSquare, 
  TrendingUp, 
  ShieldCheck, 
  Users, 
  Calendar as CalendarIcon, 
  Activity,
  AlertCircle
} from "lucide-react";

// Import de vos composants personnalisés
import ChatInterface from "@/components/ChatInterface";
import StaffManager from "@/components/StaffManager";

export default function AssistantPage() {
  // État pour l'animation du statut de l'IA
  const [lastAction, setLastAction] = useState<string | null>(null);
  
  // État pour les données de prédiction (Machine Learning)
  const [prediction, setPrediction] = useState({ charge: 0, alerte: false });
  const [loading, setLoading] = useState(true);

  // Initialisation : Récupérer la charge prévue au chargement
  useEffect(() => {
    const fetchPrediction = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/predict-load");
        if (response.ok) {
          const data = await response.json();
          setPrediction({ charge: data.valeur || 0, alerte: data.alerte || false });
        }
      } catch (error) {
        console.error("Erreur de connexion au Backend:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPrediction();
  }, []);

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8 flex flex-col gap-6">
      
      {/* --- HEADER : IDENTITÉ DU PROJET --- */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6">
        <div>
          <h1 className="text-3xl font-black tracking-tight flex items-center gap-3">
            <div className="bg-primary p-2 rounded-xl text-primary-foreground">
              <Activity size={24} />
            </div>
            Pharma-RH <span className="text-primary">Agent</span>
          </h1>
          <p className="text-muted-foreground text-sm mt-1 font-medium">
            Assistant décisionnel : Optimisation RH & Prédiction de charge officinale.
          </p>
        </div>
        
        <div className="flex items-center gap-2 px-4 py-2 bg-muted/50 rounded-full border">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-widest">Serveur IA Connecté</span>
        </div>
      </header>

      {/* --- GRILLE PRINCIPALE --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1">
        
        {/* COLONNE GAUCHE : INTERFACE DE GESTION & ANALYSE (4 cols) */}
        <aside className="lg:col-span-4 xl:col-span-3 space-y-6 flex flex-col h-full overflow-y-auto">
          
          {/* 1. Formulaire d'ajout (Pharmacien / Préparateur) */}
          <section>
            <StaffManager />
          </section>

          {/* 2. Widget de Prédiction ML */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-5 rounded-3xl border-2 transition-all shadow-sm ${
              prediction.alerte 
                ? "bg-red-50/50 border-red-200 dark:bg-red-950/20" 
                : "bg-emerald-50/50 border-emerald-200 dark:bg-emerald-950/20"
            }`}
          >
            <div className="flex justify-between items-start">
              <h3 className={`text-xs font-black uppercase tracking-widest flex items-center gap-2 ${
                prediction.alerte ? "text-red-700" : "text-emerald-700"
              }`}>
                <TrendingUp size={16} /> Charge Active
              </h3>
              {prediction.alerte && <AlertCircle className="text-red-500 animate-bounce" size={18} />}
            </div>
            
            <div className="mt-4">
              <p className="text-4xl font-black tracking-tighter tabular-nums">
                {loading ? "..." : prediction.charge}
              </p>
              <p className="text-[11px] font-bold mt-2 opacity-80 leading-tight">
                {prediction.alerte 
                  ? "Surcharge détectée : Renfort de personnel recommandé pour le prochain shift."
                  : "Flux client stable : L'effectif actuel est conforme aux besoins."}
              </p>
            </div>
          </motion.div>

          {/* 3. Bloc Conformité RH */}
          <div className="p-5 rounded-3xl bg-card border shadow-sm space-y-3">
            <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <ShieldCheck size={16} className="text-primary" /> Conformité L5125
            </h3>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Le moteur de décision <strong>OR-Tools</strong> vérifie en temps réel la présence obligatoire d'au moins un pharmacien diplômé par tranche horaire d'ouverture.
            </p>
          </div>
        </aside>

        {/* COLONNE DROITE : AGENT CONVERSATIONNEL (8 cols) */}
        <main className="lg:col-span-8 xl:col-span-9 flex flex-col border rounded-3xl bg-card shadow-xl overflow-hidden min-h-[600px] relative">
          
          {/* Indicateur de Statut flottant */}
          <AnimatePresence>
            {lastAction && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 10 }}
                exit={{ opacity: 0 }}
                className="absolute top-4 right-4 z-10 px-3 py-1.5 bg-primary/90 text-primary-foreground rounded-full text-[10px] font-black uppercase shadow-lg flex items-center gap-2"
              >
                <div className="h-1.5 w-1.5 rounded-full bg-white animate-ping" />
                Action IA : {lastAction}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex-1 flex flex-col h-full overflow-hidden">
             {/* Le chat prend tout l'espace restant */}
             <ChatInterface onActionDetected={(action) => {
               setLastAction(action);
               setTimeout(() => setLastAction(null), 3000); // Disparait après 3s
             }} />
          </div>
        </main>

      </div>
    </div>
  );
}