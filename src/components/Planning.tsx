import React, { useState } from 'react';

const PlanningComponent = () => {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(false);

  const generatePlanning = async () => {
    setLoading(true);
    const response = await fetch('http://localhost:8000/api/generate-planning', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        employees: [
          { name: "Alice", role: "Pharmacien", max_hours: 40 },
          { name: "Bob", role: "Préparateur", max_hours: 35 },
          { name: "Charlie", role: "Préparateur", max_hours: 35 },
          { name: "David", role: "Préparateur", max_hours: 30 }
        ],
        absences: { "Charlie": ["Mercredi"] }
      }),
    });
    const data = await response.json();
    setSchedule(data.schedule);
    setLoading(false);
  };

  return (
    <div className="p-4">
      <button 
        onClick={generatePlanning}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? 'Génération...' : 'Générer le Planning IA'}
      </button>

      <div className="mt-4">
        {schedule.map((s, i) => (
          <div key={i} className="border-b py-2">
            <strong>{s.jour} ({s.shift}) :</strong> {s.employe} - <span className="text-gray-500">{s.role}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlanningComponent;