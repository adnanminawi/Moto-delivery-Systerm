"use client";

import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

export default function RideChart({
  completed,
  searching,
  cancelled,
}) {
  const data = [
    { name: "Completed", value: completed },
    { name: "Searching", value: searching },
    { name: "Cancelled", value: cancelled },
  ];

  const colors = [
    "#22c55e",
    "#f59e0b",
    "#ef4444",
  ];

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="font-bold text-xl mb-5">
        Ride Status
      </h2>

      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            outerRadius={120}
            label
          >
            {data.map((_, index) => (
              <Cell
                key={index}
                fill={colors[index]}
              />
            ))}
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}