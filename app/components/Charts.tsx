"use client";

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface ChartsProps {
  progressData: { week: string; pain: number; mood: number }[];
  recovery: number;
}

const COLORS = ["#22c55e", "#e5e7eb"];

export default function Charts({ progressData, recovery }: ChartsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Line Chart */}
      <div className="bg-white shadow rounded p-4 text-black">
        <h3 className="font-semibold mb-4 text-green-700">Progress Trends</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={progressData}>
            <CartesianGrid stroke="#f3f4f6" />
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip contentStyle={{ backgroundColor: "#fff", borderRadius: "8px" }} />
            <Legend />
            <Line
              type="monotone"
              dataKey="pain"
              stroke="#ef4444"
              strokeWidth={3}
              dot={{ r: 4, fill: "#ef4444" }}
              name="Pain Score"
            />
            <Line
              type="monotone"
              dataKey="mood"
              stroke="#f59e0b"
              strokeWidth={3}
              dot={{ r: 4, fill: "#f59e0b" }}
              name="Mood Score"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Recovery Gauge */}
      <div className="bg-white shadow rounded p-4 flex flex-col items-center">
        <h3 className="font-semibold mb-6 text-green-700">Recovery Gauge</h3>
        <PieChart width={400} height={250}>
          <Pie
            data={[
              { name: "Recovered", value: recovery },
              { name: "Remaining", value: 100 - recovery },
            ]}
            startAngle={180}
            endAngle={0}
            innerRadius={80}
            outerRadius={120}
            dataKey="value"
            stroke="none"
          >
            <Cell fill={COLORS[0]} />
            <Cell fill={COLORS[1]} />
          </Pie>
        </PieChart>
        <p className="text-2xl font-bold -mt-14 text-green-700">{recovery}% Recovery</p>
      </div>
    </div>
  );
}
