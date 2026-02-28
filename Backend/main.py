import sqlite3
import numpy as np
import pandas as pd
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from ortools.sat.python import cp_model
from sklearn.ensemble import RandomForestRegressor
from typing import List, Optional

app = FastAPI(title="Pharma-RH Agent Décisionnel")

# Configuration CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # À restreindre en production à http://localhost:8080
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Modèles de Données ---
class Employee(BaseModel):
    name: str
    role: str # 'Pharmacien' ou 'Préparateur'
    max_hours: int

class ChatInput(BaseModel):
    message: str

# --- Initialisation de la Base de Données ---
def init_db():
    conn = sqlite3.connect('pharmacy.db')
    cursor = conn.cursor()
    cursor.execute('''CREATE TABLE IF NOT EXISTS employees 
                     (id INTEGER PRIMARY KEY, name TEXT, role TEXT, max_hours INTEGER)''')
    cursor.execute('''CREATE TABLE IF NOT EXISTS absences 
                     (id INTEGER PRIMARY KEY, emp_name TEXT, jour TEXT, type TEXT)''')
    conn.commit()
    conn.close()

init_db()

# --- Fonctions Utilitaires DB ---
def get_staff():
    conn = sqlite3.connect('pharmacy.db')
    df = pd.read_sql_query("SELECT name, role, max_hours FROM employees", conn)
    conn.close()
    return df.to_dict('records')

def get_absences():
    conn = sqlite3.connect('pharmacy.db')
    cursor = conn.cursor()
    cursor.execute("SELECT emp_name, jour FROM absences")
    rows = cursor.fetchall()
    conn.close()
    abs_dict = {}
    for name, jour in rows:
        if name not in abs_dict: abs_dict[name] = []
        abs_dict[name].append(jour)
    return abs_dict

# --- Moteur de Décision : Optimisation du Planning ---
def solve_pharmacy_schedule(staff, absences):
    model = cp_model.CpModel()
    days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"]
    shifts = ["Matin", "Après-midi"]
    
    # Variables : est-ce que l'employé E travaille le jour J au shift S
    work = {}
    for e in staff:
        for d in days:
            for s in shifts:
                work[(e['name'], d, s)] = model.NewBoolVar(f"w_{e['name']}_{d}_{s}")

    # CONTRAINTE 1 : Présence d'au moins 1 Pharmacien par shift (LÉGAL)
    for d in days:
        for s in shifts:
            pharmas = [e['name'] for e in staff if e['role'] == 'Pharmacien']
            model.Add(sum(work[(p, d, s)] for p in pharmas) >= 1)

    # CONTRAINTE 2 : Capacité minimale (ex: 2 personnes total par shift)
    for d in days:
        for s in shifts:
            model.Add(sum(work[(e['name'], d, s)] for e in staff) >= 2)

    # CONTRAINTE 3 : Respect des absences
    for name, day_list in absences.items():
        for d in day_list:
            if d in days:
                for s in shifts:
                    model.Add(work[(name, d, s)] == 0)

    # Résolution
    solver = cp_model.CpSolver()
    status = solver.Solve(model)

    if status == cp_model.OPTIMAL or status == cp_model.FEASIBLE:
        res = []
        for d in days:
            for s in shifts:
                for e in staff:
                    if solver.Value(work[(e['name'], d, s)]) == 1:
                        res.append({"jour": d, "shift": s, "nom": e['name'], "role": e['role']})
        return res
    return None

# --- Intelligence Artificielle : Prédiction de Charge ---
@app.get("/api/predict-load")
async def predict_load():
    # Simulation de données historiques
    X = np.arange(100).reshape(-1, 1)
    y = 20 + 5 * np.sin(X/5).flatten() + np.random.normal(0, 2, 100)
    model = RandomForestRegressor(n_estimators=10).fit(X, y)
    
    prediction = float(model.predict([[101]])[0])
    is_alert = prediction > 24
    return {"valeur": round(prediction, 1), "alerte": is_alert}

# --- Agent Conversationnel ---
@app.post("/api/chat")
async def chat_agent(data: ChatInput):
    msg = data.message.lower()
    
    # INTENTION : PLANNING
    if any(k in msg for k in ["planning", "horaire", "emploi"]):
        staff = get_staff()
        if not staff: return {"content": "⚠️ La base de données est vide. Ajoutez des employés d'abord."}
        
        absences = get_absences()
        result = solve_pharmacy_schedule(staff, absences)
        
        if not result: return {"content": "❌ Impossible de respecter les contraintes légales avec le staff actuel."}
        
        # Formatage Décisionnel
        output = "### 📋 Assistant RH : Planning Décisionnel\n\n"
        output += "*Conformité : ✅ Pharmacien présent par tranche.* \n\n"
        curr_day = ""
        for r in result:
            if r['jour'] != curr_day:
                curr_day = r['jour']
                output += f"\n**{curr_day.upper()}**\n"
            icon = "☀️" if r['shift'] == "Matin" else "🌙"
            output += f"{icon} {r['nom']} ({'Ph' if r['role'] == 'Pharmacien' else 'Pr'})\n"
        return {"content": output}

    # INTENTION : ANALYSE DE CHARGE
    elif any(k in msg for k in ["charge", "prevision", "activite"]):
        pred = await predict_load()
        status = "🔴 **SURCHARGE PRÉVUE**" if pred['alerte'] else "🟢 **ACTIVITÉ CALME**"
        return {"content": f"{status}\n\nL'IA prévoit un indice de **{pred['valeur']}**. Je recommande d'ajuster le staff du matin."}

    return {"content": "Je suis votre assistant RH. Je peux générer un **planning conforme**, analyser la **charge** ou noter une **absence**."}

# Routes Admin Staff
@app.post("/api/employees")
async def add_emp(e: Employee):
    conn = sqlite3.connect('pharmacy.db')
    conn.execute("INSERT INTO employees (name, role, max_hours) VALUES (?,?,?)", (e.name, e.role, e.max_hours))
    conn.commit()
    conn.close()
    return {"status": "ok"}
# Route pour ajouter un employé
@app.post("/api/employees")
async def add_employee(emp: Employee):
    conn = sqlite3.connect('pharmacy.db')
    cursor = conn.cursor()
    cursor.execute("INSERT INTO employees (name, role, max_hours) VALUES (?, ?, ?)", 
                   (emp.name, emp.role, emp.max_hours))
    conn.commit()
    conn.close()
    return {"status": "success"}

# Route pour ajouter une absence manuellement
@app.post("/api/absences_manual")
async def add_absence_manual(data: dict):
    conn = sqlite3.connect('pharmacy.db')
    cursor = conn.cursor()
    cursor.execute("INSERT INTO absences (emp_name, jour, type) VALUES (?, ?, ?)", 
                   (data['emp_name'], data['jour'], data['type']))
    conn.commit()
    conn.close()
    return {"status": "success"}
if __name__ == "__main__":
    import uvicorn
    # On force le rechargement pour voir les erreurs en direct
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)