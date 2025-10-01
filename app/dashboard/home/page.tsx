export default function HomePage() {
  return (
    <div className="space-y-6">
      {/* Wellness Tip */}
      <div className="bg-gradient-to-r from-green-400 to-blue-500 dark:from-green-600 dark:to-blue-600 text-white p-6 rounded-lg shadow-lg dark:shadow-xl">
        <p className="text-sm font-medium">Today's Wellness Tip</p>
        <p className="mt-2 italic">
          "Wellness is not something you find. It is something you create."
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 bg-white dark:bg-gray-800 shadow-lg dark:shadow-xl rounded border dark:border-gray-700">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Next Session
          </p>
          <p className="font-semibold text-green-700 dark:text-green-400 mt-2">
            Tomorrow
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500">
            10:00 AM - Abhyanga Therapy
          </p>
        </div>
        <div className="p-4 bg-white dark:bg-gray-800 shadow-lg dark:shadow-xl rounded text-center border dark:border-gray-700">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Completed Sessions
          </p>
          <p className="text-2xl text-green-700 dark:text-green-400 font-bold mt-2">
            8/12
          </p>
        </div>
        <div className="p-4 bg-white dark:bg-gray-800 shadow-lg dark:shadow-xl rounded border dark:border-gray-700">
          <p className="text-gray-500 dark:text-gray-400 text-sm">Progress</p>
          <div className="mt-2 h-2 bg-gray-200 dark:bg-gray-600 rounded">
            <div className="h-2 bg-green-500 dark:bg-green-400 rounded w-[67%]" />
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">67%</p>
        </div>
      </div>

      {/* Diet + Yoga */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 shadow-lg dark:shadow-xl rounded p-4 border dark:border-gray-700">
          <h3 className="font-semibold text-green-700 dark:text-green-400 mb-4">
            Today's Diet Plan
          </h3>
          <ul className="space-y-3">
            <li className="flex justify-between bg-gray-50 dark:bg-gray-700 p-3 rounded">
              <div>
                <p className="font-medium text-green-700 dark:text-green-400">
                  Breakfast
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  7:00 - 11:00 AM
                </p>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Warm milk
              </p>
            </li>
            <li className="flex justify-between bg-gray-50 dark:bg-gray-700 p-3 rounded">
              <div>
                <p className="font-medium text-green-700 dark:text-green-400">
                  Lunch
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  12:30 PM
                </p>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Khichdi with ghee
              </p>
            </li>
            <li className="flex justify-between bg-gray-50 dark:bg-gray-700 p-3 rounded">
              <div>
                <p className="font-medium text-green-700 dark:text-green-400">
                  Dinner
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  7:00 - 8:00 PM
                </p>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Light soup
              </p>
            </li>
          </ul>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-lg dark:shadow-xl rounded p-4 border dark:border-gray-700">
          <h3 className="font-semibold mb-4 text-green-700 dark:text-green-400">
            Recommended Yoga
          </h3>
          <ul className="space-y-3">
            <li className="p-3 rounded bg-gray-50 dark:bg-gray-700">
              <p className="font-medium text-green-700 dark:text-green-400">
                Surya Namaskar
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                15 mins • Morning routine
              </p>
            </li>
            <li className="p-3 rounded bg-gray-50 dark:bg-gray-700">
              <p className="font-medium text-green-700 dark:text-green-400">
                Pranayama
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                10 mins • Breathing exercise
              </p>
            </li>
            <li className="p-3 rounded bg-gray-50 dark:bg-gray-700">
              <p className="font-medium text-green-700 dark:text-green-400">
                Shavasana
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                5 mins • Relaxation
              </p>
            </li>
          </ul>
        </div>
      </div>

      {/* Lifestyle Tips */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 shadow-lg dark:shadow-xl rounded bg-blue-100 dark:bg-blue-900/50 border dark:border-blue-800">
          <p className="font-medium text-black dark:text-blue-200">Hydration</p>
          <p className="text-xs text-gray-600 dark:text-blue-300">
            Drink 2L water daily
          </p>
        </div>
        <div className="p-4 shadow-lg dark:shadow-xl rounded bg-purple-100 dark:bg-purple-900/50 border dark:border-purple-800">
          <p className="font-medium text-black dark:text-purple-200">Sleep</p>
          <p className="text-xs text-gray-600 dark:text-purple-300">
            7-8 hours quality sleep
          </p>
        </div>
        <div className="p-4 shadow-lg dark:shadow-xl rounded bg-green-100 dark:bg-green-900/50 border dark:border-green-800">
          <p className="font-medium text-black dark:text-green-200">Activity</p>
          <p className="text-xs text-gray-600 dark:text-green-300">
            Take gentle walks daily
          </p>
        </div>
      </div>
    </div>
  );
}
