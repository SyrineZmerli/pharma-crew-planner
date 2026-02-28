import sqlite3

def update_db():
    conn = sqlite3.connect('pharmacy.db')
    cursor = conn.cursor()
    
    # Table des employés (si pas déjà faite)
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS employees (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            role TEXT NOT NULL,
            max_hours INTEGER NOT NULL
        )
    ''')

    # NOUVELLE TABLE : Congés et Absences
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS absences (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            employee_name TEXT NOT NULL,
            date_debut TEXT NOT NULL,
            date_fin TEXT NOT NULL,
            type TEXT NOT NULL,
            FOREIGN KEY (employee_name) REFERENCES employees (name)
        )
    ''')
    
    conn.commit()
    conn.close()
    print("✅ Base de données mise à jour (Tables : Employees & Absences)")

if __name__ == "__main__":
    update_db()