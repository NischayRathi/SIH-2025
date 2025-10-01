"use client";
import {
  AlertTriangle,
  Smile,
  Heart,
  Activity,
  TrendingUp,
  Calendar,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";

const progressData = [
  { week: "Week 1", pain: 7.5, mood: 6.2, sleep: 6.0, exercise: 2 },
  { week: "Week 2", pain: 7.1, mood: 6.5, sleep: 6.3, exercise: 3 },
  { week: "Week 3", pain: 6.5, mood: 6.9, sleep: 6.8, exercise: 4 },
  { week: "Week 4", pain: 5.8, mood: 7.4, sleep: 7.2, exercise: 5 },
  { week: "Week 5", pain: 5.2, mood: 7.9, sleep: 7.6, exercise: 6 },
  { week: "Week 6", pain: 4.6, mood: 8.4, sleep: 8.1, exercise: 7 },
];

const vitalSigns = [
  { name: "Blood Pressure", value: 120, unit: "mmHg", status: "normal" },
  { name: "Heart Rate", value: 72, unit: "bpm", status: "normal" },
  { name: "Temperature", value: 98.6, unit: "°F", status: "normal" },
  { name: "Weight", value: 70, unit: "kg", status: "stable" },
];

const medicationAdherence = [
  { name: "Taken", value: 85, color: "#10B981" },
  { name: "Missed", value: 15, color: "#EF4444" },
];

const recovery = 78;

export default function HealthTrackerPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <h2 className="text-xl font-semibold text-green-700 dark:text-green-400">
        Health Tracker
      </h2>
      <p className="text-gray-600 dark:text-gray-300 flex items-center gap-2">
        Monitor your progress and recovery
      </p>

      {/* Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Pain */}
        <div className="bg-white dark:bg-gray-800 shadow-lg dark:shadow-xl rounded-lg p-6 flex items-center gap-4 hover:shadow-xl dark:hover:shadow-2xl transition-shadow border dark:border-gray-700">
          <div className="p-3 bg-red-100 dark:bg-red-900/50 rounded-full">
            <AlertTriangle className="text-red-500 dark:text-red-400 w-6 h-6" />
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Pain Score
            </p>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              {progressData[5].pain}/10
            </h3>
            <p className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              -39% improvement
            </p>
          </div>
        </div>

        {/* Mood */}
        <div className="bg-white dark:bg-gray-800 shadow-lg dark:shadow-xl rounded-lg p-6 flex items-center gap-4 hover:shadow-xl dark:hover:shadow-2xl transition-shadow border dark:border-gray-700">
          <div className="p-3 bg-yellow-100 dark:bg-yellow-900/50 rounded-full">
            <Smile className="text-yellow-500 dark:text-yellow-400 w-6 h-6" />
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Mood Score
            </p>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              {progressData[5].mood}/10
            </h3>
            <p className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +35% improvement
            </p>
          </div>
        </div>

        {/* Sleep Quality */}
        <div className="bg-white dark:bg-gray-800 shadow-lg dark:shadow-xl rounded-lg p-6 flex items-center gap-4 hover:shadow-xl dark:hover:shadow-2xl transition-shadow border dark:border-gray-700">
          <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-full">
            <Activity className="text-blue-500 dark:text-blue-400 w-6 h-6" />
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Sleep Quality
            </p>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              {progressData[5].sleep}/10
            </h3>
            <p className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +35% improvement
            </p>
          </div>
        </div>

        {/* Recovery */}
        <div className="bg-white dark:bg-gray-800 shadow-lg dark:shadow-xl rounded-lg p-6 flex items-center gap-4 hover:shadow-xl dark:hover:shadow-2xl transition-shadow border dark:border-gray-700">
          <div className="p-3 bg-green-100 dark:bg-green-900/50 rounded-full">
            <Heart className="text-green-600 dark:text-green-400 w-6 h-6" />
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Recovery Progress
            </p>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              {recovery}%
            </h3>
            <p className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +15% this month
            </p>
          </div>
        </div>
      </div>

      {/* Advanced Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Progress Trends - Line Chart */}
        <div className="bg-white dark:bg-gray-800 shadow-lg dark:shadow-xl rounded-lg p-6 border dark:border-gray-700">
          <h3 className="font-semibold mb-6 text-gray-800 dark:text-gray-100 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
            Health Progress Over Time
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={progressData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#f0f0f0"
                className="dark:!stroke-gray-600"
              />
              <XAxis
                dataKey="week"
                stroke="#666"
                fontSize={12}
                className="dark:!stroke-gray-300"
              />
              <YAxis
                stroke="#666"
                fontSize={12}
                className="dark:!stroke-gray-300"
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--tw-prose-pre-bg, #f8f9fa)",
                  border: "1px solid #e9ecef",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "var(--tw-text-opacity, #495057)" }}
                itemStyle={{ color: "var(--tw-text-opacity, #495057)" }}
              />
              <Line
                type="monotone"
                dataKey="pain"
                stroke="#ef4444"
                strokeWidth={3}
                dot={{ fill: "#ef4444", strokeWidth: 2, r: 6 }}
                name="Pain Level"
              />
              <Line
                type="monotone"
                dataKey="mood"
                stroke="#f59e0b"
                strokeWidth={3}
                dot={{ fill: "#f59e0b", strokeWidth: 2, r: 6 }}
                name="Mood Score"
              />
              <Line
                type="monotone"
                dataKey="sleep"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ fill: "#3b82f6", strokeWidth: 2, r: 6 }}
                name="Sleep Quality"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Exercise Progress - Bar Chart */}
        <div className="bg-white dark:bg-gray-800 shadow-lg dark:shadow-xl rounded-lg p-6 border dark:border-gray-700">
          <h3 className="font-semibold mb-6 text-gray-800 dark:text-gray-100 flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            Weekly Exercise Hours
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={progressData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#f0f0f0"
                className="dark:!stroke-gray-600"
              />
              <XAxis
                dataKey="week"
                stroke="#666"
                fontSize={12}
                className="dark:!stroke-gray-300"
              />
              <YAxis
                stroke="#666"
                fontSize={12}
                className="dark:!stroke-gray-300"
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--tw-prose-pre-bg, #f8f9fa)",
                  border: "1px solid #e9ecef",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "var(--tw-text-opacity, #495057)" }}
                itemStyle={{ color: "var(--tw-text-opacity, #495057)" }}
              />
              <Bar dataKey="exercise" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Vital Signs and Medication */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Vital Signs */}
        <div className="xl:col-span-2 bg-white dark:bg-gray-800 shadow-lg dark:shadow-xl rounded-lg p-6 border dark:border-gray-700">
          <h3 className="font-semibold mb-6 text-gray-800 dark:text-gray-100 flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-600 dark:text-red-400" />
            Current Vital Signs
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {vitalSigns.map((vital, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4"
              >
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  {vital.name}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                    {vital.value}
                    <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
                      {vital.unit}
                    </span>
                  </span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      vital.status === "normal"
                        ? "bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300"
                        : "bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-300"
                    }`}
                  >
                    {vital.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Medication Adherence - Pie Chart */}
        <div className="bg-white dark:bg-gray-800 shadow-lg dark:shadow-xl rounded-lg p-6 border dark:border-gray-700">
          <h3 className="font-semibold mb-6 text-gray-800 dark:text-gray-100 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            Medication Adherence
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={medicationAdherence}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {medicationAdherence.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value}%`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 mt-4">
            {medicationAdherence.map((entry, index) => (
              <div key={index} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: entry.color }}
                ></div>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {entry.name}: {entry.value}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recovery Progress - Area Chart */}
      <div className="bg-white dark:bg-gray-800 shadow-lg dark:shadow-xl rounded-lg p-6 border dark:border-gray-700">
        <h3 className="font-semibold mb-6 text-gray-800 dark:text-gray-100 flex items-center gap-2">
          <Heart className="w-5 h-5 text-green-600 dark:text-green-400" />
          Overall Recovery Progress
        </h3>
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Recovery Progress
            </span>
            <span className="text-sm font-bold text-green-600 dark:text-green-400">
              {recovery}%
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
            <div
              className="bg-gradient-to-r from-green-400 to-green-600 h-4 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${recovery}%` }}
            ></div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart
            data={progressData.map((item, index) => ({
              ...item,
              recovery: 45 + index * 5.5,
            }))}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="week" stroke="#666" fontSize={12} />
            <YAxis stroke="#666" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#f8f9fa",
                border: "1px solid #e9ecef",
                borderRadius: "8px",
              }}
              labelStyle={{ color: "#495057" }}
            />
            <Area
              type="monotone"
              dataKey="recovery"
              stroke="#10b981"
              fill="#10b981"
              fillOpacity={0.3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
