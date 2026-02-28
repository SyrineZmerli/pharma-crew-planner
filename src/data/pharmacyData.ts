// Mock data for the pharmacy HR assistant
export interface Employee {
  id: string;
  name: string;
  role: "Pharmacien" | "Préparateur" | "Stagiaire";
  maxHours: number;
  email: string;
  avatar: string;
  status: "active" | "absent" | "congé";
}

export interface ShiftAssignment {
  day: string;
  shift: "Matin" | "Après-midi";
  employeeId: string;
  employeeName: string;
  role: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export const employees: Employee[] = [
  { id: "1", name: "Alice Dupont", role: "Pharmacien", maxHours: 40, email: "alice@pharma.fr", avatar: "AD", status: "active" },
  { id: "2", name: "Bob Martin", role: "Préparateur", maxHours: 35, email: "bob@pharma.fr", avatar: "BM", status: "active" },
  { id: "3", name: "Charlie Leroy", role: "Préparateur", maxHours: 35, email: "charlie@pharma.fr", avatar: "CL", status: "absent" },
  { id: "4", name: "David Moreau", role: "Préparateur", maxHours: 30, email: "david@pharma.fr", avatar: "DM", status: "active" },
  { id: "5", name: "Emma Bernard", role: "Pharmacien", maxHours: 40, email: "emma@pharma.fr", avatar: "EB", status: "congé" },
];

export const days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];
export const shifts = ["Matin", "Après-midi"] as const;

export const schedule: ShiftAssignment[] = [
  { day: "Lundi", shift: "Matin", employeeId: "1", employeeName: "Alice Dupont", role: "Pharmacien" },
  { day: "Lundi", shift: "Matin", employeeId: "2", employeeName: "Bob Martin", role: "Préparateur" },
  { day: "Lundi", shift: "Après-midi", employeeId: "1", employeeName: "Alice Dupont", role: "Pharmacien" },
  { day: "Lundi", shift: "Après-midi", employeeId: "4", employeeName: "David Moreau", role: "Préparateur" },
  { day: "Mardi", shift: "Matin", employeeId: "1", employeeName: "Alice Dupont", role: "Pharmacien" },
  { day: "Mardi", shift: "Matin", employeeId: "3", employeeName: "Charlie Leroy", role: "Préparateur" },
  { day: "Mardi", shift: "Après-midi", employeeId: "1", employeeName: "Alice Dupont", role: "Pharmacien" },
  { day: "Mardi", shift: "Après-midi", employeeId: "2", employeeName: "Bob Martin", role: "Préparateur" },
  { day: "Mercredi", shift: "Matin", employeeId: "1", employeeName: "Alice Dupont", role: "Pharmacien" },
  { day: "Mercredi", shift: "Matin", employeeId: "4", employeeName: "David Moreau", role: "Préparateur" },
  { day: "Mercredi", shift: "Après-midi", employeeId: "1", employeeName: "Alice Dupont", role: "Pharmacien" },
  { day: "Mercredi", shift: "Après-midi", employeeId: "2", employeeName: "Bob Martin", role: "Préparateur" },
  { day: "Jeudi", shift: "Matin", employeeId: "1", employeeName: "Alice Dupont", role: "Pharmacien" },
  { day: "Jeudi", shift: "Matin", employeeId: "3", employeeName: "Charlie Leroy", role: "Préparateur" },
  { day: "Jeudi", shift: "Après-midi", employeeId: "1", employeeName: "Alice Dupont", role: "Pharmacien" },
  { day: "Jeudi", shift: "Après-midi", employeeId: "4", employeeName: "David Moreau", role: "Préparateur" },
  { day: "Vendredi", shift: "Matin", employeeId: "1", employeeName: "Alice Dupont", role: "Pharmacien" },
  { day: "Vendredi", shift: "Matin", employeeId: "2", employeeName: "Bob Martin", role: "Préparateur" },
  { day: "Vendredi", shift: "Après-midi", employeeId: "1", employeeName: "Alice Dupont", role: "Pharmacien" },
  { day: "Vendredi", shift: "Après-midi", employeeId: "3", employeeName: "Charlie Leroy", role: "Préparateur" },
];

export const workloadPredictions = [
  { day: "Lun", actual: 210, predicted: 215 },
  { day: "Mar", actual: 245, predicted: 240 },
  { day: "Mer", actual: 190, predicted: 195 },
  { day: "Jeu", actual: 260, predicted: 255 },
  { day: "Ven", actual: 280, predicted: 275 },
  { day: "Sam", actual: null, predicted: 300 },
  { day: "Dim", actual: null, predicted: 180 },
];

export function getAssistantResponse(question: string): string {
  const q = question.toLowerCase();
  if (q.includes("planning") || q.includes("emploi du temps")) {
    return "📋 **Planning de la semaine**\n\nLe planning actuel est optimisé avec les contraintes suivantes :\n- Minimum 2 employés par shift\n- Au moins 1 pharmacien par shift\n- Respect des heures max par employé\n\nConsultez l'onglet **Planning** pour voir le détail complet.";
  }
  if (q.includes("absence") || q.includes("congé")) {
    return "📝 **Gestion des absences**\n\n- **Charlie Leroy** : Absent aujourd'hui\n- **Emma Bernard** : En congé cette semaine\n\nLe planning a été automatiquement ajusté. Souhaitez-vous enregistrer une nouvelle absence ?";
  }
  if (q.includes("charge") || q.includes("prévision") || q.includes("activité")) {
    return "📊 **Prévision de charge**\n\nCharge moyenne prévue : **245 clients/jour**\n\n⚠️ **Jeudi et Vendredi** présentent une forte activité prévue (>250). Je recommande de planifier du renfort.\n\nSamedi prévu à **300** — renfort fortement conseillé.";
  }
  if (q.includes("heure") || q.includes("temps de travail")) {
    return "⏰ **Heures de travail cette semaine**\n\n| Employé | Heures | Max |\n|---------|--------|-----|\n| Alice Dupont | 40h | 40h |\n| Bob Martin | 24h | 35h |\n| Charlie Leroy | 16h | 35h |\n| David Moreau | 24h | 30h |\n\nTous les employés sont dans leurs limites contractuelles.";
  }
  if (q.includes("réglementation") || q.includes("conformité")) {
    return "⚖️ **Conformité réglementaire**\n\n✅ Présence pharmacien obligatoire : **Conforme**\n✅ Temps de repos entre shifts : **Conforme**\n✅ Heures supplémentaires : **Aucune détectée**\n✅ Formation continue : 2 sessions à planifier ce mois";
  }
  if (q.includes("bonjour") || q.includes("salut") || q.includes("hello")) {
    return "👋 Bonjour ! Je suis votre **assistant RH intelligent** pour la pharmacie.\n\nJe peux vous aider avec :\n- 📋 La gestion du planning\n- 📊 Les prévisions de charge\n- 📝 Les absences et congés\n- ⏰ Le suivi des heures\n- ⚖️ La conformité réglementaire\n\nQue souhaitez-vous savoir ?";
  }
  return "🤖 Je suis votre assistant RH pharmacie. Je peux vous aider avec :\n\n- **\"planning\"** — Voir le planning optimisé\n- **\"absence\"** — Gérer les absences\n- **\"charge\"** — Prévisions d'activité\n- **\"heures\"** — Suivi du temps de travail\n- **\"conformité\"** — Vérifier la réglementation\n\nPosez-moi votre question !";
}
