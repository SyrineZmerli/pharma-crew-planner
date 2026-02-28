import { useState } from "react";
import { UserPlus, CalendarOff, Save, User } from "lucide-react";

export default function StaffManager() {
  const [activeTab, setActiveTab] = useState<'staff' | 'abs'>('staff');
  const [name, setName] = useState("");
  const [role, setRole] = useState("Pharmacien");
  const [day, setDay] = useState("Lundi");

  const handleAddEmployee = async () => {
    if (!name) return alert("Nom requis");
    try {
      const res = await fetch("http://localhost:8000/api/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, role, max_hours: 35 }),
      });
      if (res.ok) {
        setName("");
        alert(`✅ ${name} ajouté au staff !`);
      }
    } catch (e) { console.error(e); }
  };

  const handleAddAbsence = async () => {
    if (!name) return alert("Nom requis");
    try {
      const res = await fetch("http://localhost:8000/api/absences_manual", { // Route à ajouter au backend
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emp_name: name, jour: day, type: "Congé" }),
      });
      if (res.ok) alert(`📅 Absence notée pour ${name} le ${day}`);
    } catch (e) { console.error(e); }
  };

  return (
    <div className="bg-card border rounded-2xl shadow-sm overflow-hidden transition-all">
      {/* Onglets */}
      <div className="flex border-b">
        <button 
          onClick={() => setActiveTab('staff')}
          className={`flex-1 py-3 text-xs font-bold flex items-center justify-center gap-2 ${activeTab === 'staff' ? 'bg-primary/10 text-primary' : 'text-muted-foreground'}`}
        >
          <UserPlus size={14} /> + Staff
        </button>
        <button 
          onClick={() => setActiveTab('abs')}
          className={`flex-1 py-3 text-xs font-bold flex items-center justify-center gap-2 ${activeTab === 'abs' ? 'bg-orange-500/10 text-orange-600' : 'text-muted-foreground'}`}
        >
          <CalendarOff size={14} /> + Congé
        </button>
      </div>

      <div className="p-4 space-y-3">
        {/* Champ Nom (Commun) */}
        <div className="space-y-1">
          <label className="text-[10px] uppercase font-bold text-muted-foreground ml-1">Nom de l'employé</label>
          <input 
            className="w-full p-2.5 text-sm rounded-xl border bg-background focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            placeholder="ex: Jean Dupont"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {activeTab === 'staff' ? (
          <div className="space-y-1 animate-in fade-in slide-in-from-top-1">
            <label className="text-[10px] uppercase font-bold text-muted-foreground ml-1">Rôle</label>
            <select 
              className="w-full p-2.5 text-sm rounded-xl border bg-background outline-none"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="Pharmacien">Pharmacien (Titulaire/Adjoint)</option>
              <option value="Préparateur">Préparateur</option>
            </select>
          </div>
        ) : (
          <div className="space-y-1 animate-in fade-in slide-in-from-top-1">
            <label className="text-[10px] uppercase font-bold text-muted-foreground ml-1">Jour d'absence</label>
            <select 
              className="w-full p-2.5 text-sm rounded-xl border bg-background outline-none"
              value={day}
              onChange={(e) => setDay(e.target.value)}
            >
              {["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"].map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
        )}

        <button 
          onClick={activeTab === 'staff' ? handleAddEmployee : handleAddAbsence}
          className={`w-full py-3 rounded-xl text-white text-xs font-black flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95 ${activeTab === 'staff' ? 'bg-primary hover:bg-primary/90' : 'bg-orange-500 hover:bg-orange-600'}`}
        >
          <Save size={14} /> 
          {activeTab === 'staff' ? "ENREGISTRER STAFF" : "NOTER ABSENCE"}
        </button>
      </div>
    </div>
  );
}