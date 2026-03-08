import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Mission } from '../types';

interface DashboardProps {
  history: Mission[];
}

const COLORS = ['#059669', '#dc2626', '#f59e0b'];

export default function Dashboard({ history }: DashboardProps) {
  // 1. Volume de palettes par semaine (simplifié)
  const dataByDate = history.reduce((acc: any, mission) => {
    const date = mission.date;
    acc[date] = (acc[date] || 0) + Object.values(mission.items || {}).reduce((a: number, b) => a + (Number(b) || 0), 0);
    return acc;
  }, {});

  const chartData = Object.entries(dataByDate).map(([date, count]) => ({ date, count })).sort((a, b) => a.date.localeCompare(b.date)).slice(-7);

  // 2. Taux de conformité
  const validCount = history.filter(h => {
      // Logique simplifiée pour l'exemple
      const totalPalettes = Object.values(h.items || {}).reduce((a: number, b: any) => a + (Number(b) || 0), 0);
      return totalPalettes <= 33;
  }).length;
  
  const complianceData = [
    { name: 'Validées', value: validCount },
    { name: 'Refusées', value: history.length - validCount }
  ];

  // 3. Produit le plus transporté
  const productData = Object.entries(history.reduce((acc: any, mission) => {
    Object.entries(mission.items || {}).forEach(([key, q]) => {
        acc[key] = (acc[key] || 0) + (Number(q) || 0);
    });
    return acc;
  }, {})).map(([name, value]) => ({ name, value }));

  return (
    <div className="p-6 bg-white rounded-3xl shadow-lg border border-slate-200">
      <h2 className="text-xl font-black text-slate-800 mb-6">Tableau de bord</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="h-64">
          <h3 className="text-sm font-bold text-slate-500 mb-2">Palettes par jour</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#059669" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="h-64">
          <h3 className="text-sm font-bold text-slate-500 mb-2">Conformité</h3>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={complianceData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                {complianceData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
