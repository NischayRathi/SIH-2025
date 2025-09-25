export default function HomePage() {
  return (
    <div className="space-y-6">
      {/* Wellness Tip */}
      <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white p-6 rounded-lg shadow">
        <p className="text-sm font-medium">Today’s Wellness Tip</p>
        <p className="mt-2 italic">“Wellness is not something you find. It is something you create.”</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 bg-white shadow rounded">
          <p className="text-gray-500 text-sm">Next Session</p>
          <p className="font-semibold text-green-700 mt-2">Tomorrow</p>
          <p className="text-xs text-gray-400">10:00 AM - Abhyanga Therapy</p>
        </div>
        <div className="p-4 bg-white shadow rounded text-center">
          <p className="text-gray-500 text-sm">Completed Sessions</p>
          <p className="text-2xl text-green-700  font-bold mt-2">8/12</p>
        </div>
        <div className="p-4 bg-white shadow rounded">
          <p className="text-gray-500 text-sm">Progress</p>
          <div className="mt-2 h-2 bg-gray-200 rounded">
            <div className="h-2 bg-green-500 rounded w-[67%]" />
          </div>
          <p className="text-xs text-gray-400 mt-1">67%</p>
        </div>
      </div>

      {/* Diet + Yoga */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded p-4">
          <h3 className="font-semibold text-green-700 mb-4">Today’s Diet Plan</h3>
          <ul className="space-y-3">
            <li className="flex justify-between bg-gray-50 p-3 rounded">
              <div>
                <p className="font-medium text-green-700">Breakfast</p>
                <p className="text-xs text-gray-500">7:00 - 11:00 AM</p>
              </div>
              <p className="text-sm text-gray-600">Warm milk</p>
            </li>
            <li className="flex justify-between bg-gray-50 p-3 rounded">
              <div>
                <p className="font-medium text-green-700">Lunch</p>
                <p className="text-xs text-gray-500">12:30 PM</p>
              </div>
              <p className="text-sm text-gray-600">Khichdi with ghee</p>
            </li>
            <li className="flex justify-between bg-gray-50 p-3 rounded">
              <div>
                <p className="font-medium text-green-700">Dinner</p>
                <p className="text-xs text-gray-500">7:00 - 8:00 PM</p>
              </div>
              <p className="text-sm text-gray-600">Light soup</p>
            </li>
          </ul>
        </div>

        <div className="bg-white shadow rounded p-4">
          <h3 className="font-semibold mb-4 text-green-700">Recommended Yoga</h3>
          <ul className="space-y-3">
            <li className="p-3 rounded bg-gray-50">
              <p className="font-medium text-green-700">Surya Namaskar</p>
              <p className="text-xs text-gray-500">15 mins • Morning routine</p>
            </li>
            <li className="p-3 rounded bg-gray-50">
              <p className="font-medium text-green-700">Pranayama</p>
              <p className="text-xs text-gray-500">10 mins • Breathing exercise</p>
            </li>
            <li className="p-3 rounded bg-gray-50">
              <p className="font-medium text-green-700">Shavasana</p>
              <p className="text-xs text-gray-500">5 mins • Relaxation</p>
            </li>
          </ul>
        </div>
      </div>

      {/* Lifestyle Tips */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 shadow rounded bg-blue-100">
          <p className="font-medium text-black">Hydration</p>
          <p className="text-xs text-gray-600">Drink 2L water daily</p>
        </div>
        <div className="p-4 shadow rounded bg-purple-100">
          <p className="font-medium text-black">Sleep</p>
          <p className="text-xs text-gray-600">7-8 hours quality sleep</p>
        </div>
        <div className="p-4 shadow rounded bg-green-100">
          <p className="font-medium text-black">Activity</p>
          <p className="text-xs text-gray-600">Take gentle walks daily</p>
        </div>
      </div>
    </div>
  );
}
