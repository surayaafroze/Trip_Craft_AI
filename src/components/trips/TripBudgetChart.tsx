"use client";

import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from "recharts";

interface TripBudgetChartProps {
  itinerary: Record<string, unknown>[];
  budgetTarget: number;
}

export default function TripBudgetChart({ itinerary, budgetTarget }: TripBudgetChartProps) {
  if (!itinerary || itinerary.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center bg-gray-50 border rounded-xl text-gray-500">
        No itinerary data available for chart.
      </div>
    );
  }

  const data = itinerary.map(day => {
    const totalDayCost = (day.activities as Record<string, unknown>[]).reduce((sum: number, act: Record<string, unknown>) => sum + (Number(act.cost) || 0), 0);
    return {
      name: `Day ${day.day}`,
      cost: totalDayCost,
    };
  });

  const dailyBudgetTarget = budgetTarget / (itinerary.length || 1);

  return (
    <div className="h-80 w-full bg-white p-4 border rounded-xl shadow-sm">
      <h3 className="text-lg font-bold mb-4 text-center">Budget Breakdown per Day</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip cursor={{ fill: 'transparent' }} formatter={(value) => `$${value}`} />
          <Legend />
          <ReferenceLine y={dailyBudgetTarget} label="Daily Budget Avg" stroke="red" strokeDasharray="3 3" />
          <Bar dataKey="cost" name="Estimated Cost" fill="#2563eb" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
