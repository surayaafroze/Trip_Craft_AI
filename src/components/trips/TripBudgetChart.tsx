"use client";

import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from "recharts";

interface Activity {
  cost: string | number;
}

interface TripBudgetChartProps {
  itinerary: { day: number; activities: Activity[] }[];
  budgetTarget: number;
}

export default function TripBudgetChart({ itinerary, budgetTarget }: TripBudgetChartProps) {
  if (!itinerary || itinerary.length === 0) {
    return (
      <div className="h-64 flex flex-col items-center justify-center bg-gray-50/50 border-2 border-dashed border-gray-200 rounded-3xl text-gray-500 font-medium">
        <p>No budget data available.</p>
        <p className="text-sm font-normal mt-1 text-gray-400">Add activities to see the breakdown.</p>
      </div>
    );
  }

  const data = itinerary.map(day => {
    const totalDayCost = day.activities.reduce((sum: number, act: Activity) => sum + (Number(act.cost) || 0), 0);
    return {
      name: `Day ${day.day}`,
      cost: totalDayCost,
    };
  });

  const dailyBudgetTarget = budgetTarget / (itinerary.length || 1);

  return (
    <div className="h-[400px] w-full bg-white p-8 border border-gray-100 rounded-3xl premium-shadow">
      <h3 className="text-xl font-bold mb-6 text-foreground tracking-tight">Daily Budget Breakdown</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
          <XAxis dataKey="name" tick={{fill: '#6B7280', fontWeight: 500}} axisLine={false} tickLine={false} dy={10} />
          <YAxis tick={{fill: '#6B7280', fontWeight: 500}} axisLine={false} tickLine={false} tickFormatter={(value) => `$${value}`} dx={-10} />
          <Tooltip 
            cursor={{ fill: 'transparent' }} 
            formatter={(value: number | string | readonly (number | string)[] | undefined) => [`$${value || 0}`, "Estimated Cost"]}
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)', fontWeight: 'bold' }} 
          />
          <Legend wrapperStyle={{ paddingTop: '20px', fontWeight: 500, color: '#4B5563' }} />
          <ReferenceLine y={dailyBudgetTarget} label={{ position: 'top', value: 'Avg Budget', fill: '#ef4444', fontWeight: 'bold', fontSize: 12 }} stroke="#ef4444" strokeDasharray="3 3" />
          <Bar dataKey="cost" name="Estimated Cost" fill="#0891b2" radius={[6, 6, 0, 0]} barSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
