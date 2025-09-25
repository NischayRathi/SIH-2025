import { AlertTriangle, Smile, Heart } from "lucide-react";

const progressData = [
  { week: "Week 1", pain: 7.5, mood: 6.2 },
  { week: "Week 2", pain: 7.1, mood: 6.5 },
  { week: "Week 3", pain: 6.5, mood: 6.9 },
  { week: "Week 4", pain: 5.8, mood: 7.4 },
  { week: "Week 5", pain: 5.2, mood: 7.9 },
  { week: "Week 6", pain: 4.6, mood: 8.4 },
];

const recovery = 78;

export default function HealthTrackerPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <h2 className="text-xl font-semibold text-green-700">Health Tracker</h2>
      <p className="text-gray-600 flex items-center gap-2">
        Monitor your progress and recovery
      </p>

      {/* Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Pain */}
        <div className="bg-white shadow rounded p-4 flex items-center gap-4">
          <div className="p-3 bg-red-100 rounded">
            <AlertTriangle className="text-red-500" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Pain Score</p>
            <h3 className="text-2xl font-bold text-green-700">
              {progressData[5].pain}
            </h3>
            <p className="text-xs text-green-600">↓ -1.8 from last week</p>
          </div>
        </div>

        {/* Mood */}
        <div className="bg-white shadow rounded p-4 flex items-center gap-4">
          <div className="p-3 bg-yellow-100 rounded">
            <Smile className="text-yellow-500" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Mood Score</p>
            <h3 className="text-2xl font-bold text-green-700">
              {progressData[5].mood}
            </h3>
            <p className="text-xs text-green-600">↑ +2.1 from last week</p>
          </div>
        </div>

        {/* Recovery */}
        <div className="bg-white shadow rounded p-4 flex items-center gap-4">
          <div className="p-3 bg-green-100 rounded">
            <Heart className="text-green-600" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Recovery Progress</p>
            <h3 className="text-2xl font-bold text-green-700">{recovery}%</h3>
            <p className="text-xs text-green-600">↑ +12% from last week</p>
          </div>
        </div>
      </div>

      {/* Progress Bars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pain Trend */}
        <div className="bg-white shadow rounded p-4">
          <h3 className="font-semibold mb-4 text-green-700">Pain Trend</h3>
          <div className="space-y-3">
            {progressData.map((d, i) => (
              <div key={i}>
                <p className="text-sm text-gray-500">{d.week}</p>
                <div className="w-full bg-gray-200 rounded h-3">
                  <div
                    className="bg-red-500 h-3 rounded"
                    style={{ width: `${(d.pain / 10) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mood Trend */}
        <div className="bg-white shadow rounded p-4">
          <h3 className="font-semibold mb-4 text-green-700">Mood Trend</h3>
          <div className="space-y-3">
            {progressData.map((d, i) => (
              <div key={i}>
                <p className="text-sm text-gray-500">{d.week}</p>
                <div className="w-full bg-gray-200 rounded h-3">
                  <div
                    className="bg-yellow-500 h-3 rounded"
                    style={{ width: `${(d.mood / 10) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recovery Gauge (as bar) */}
      <div className="bg-white shadow rounded p-4 flex flex-col items-center">
        <h3 className="font-semibold mb-4 text-green-700">Recovery Progress</h3>
        <div className="w-full bg-gray-200 rounded h-6 mb-3">
          <div
            className="bg-green-500 h-6 rounded"
            style={{ width: `${recovery}%` }}
          ></div>
        </div>
        <p className="text-2xl font-bold text-green-700">{recovery}% Recovery</p>
      </div>
    </div>
  );
}
