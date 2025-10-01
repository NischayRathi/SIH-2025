"use client";
import dynamic from "next/dynamic";

const LeafletMap = dynamic(() => import("../../components/LeafletMap"), {
  ssr: false, // ✅ ensures map is only loaded in the browser
});

const centers = [
  {
    id: 1,
    name: "Ayur Wellness Center",
    desc: "Traditional Panchakarma Treatments",
    rating: 4.8,
    reviews: 124,
    price: "₹2,500/session",
    distance: "2.3 km away • 15 min drive",
    lat: 28.6139,
    lng: 77.209,
  },
  {
    id: 2,
    name: "Holistic Healing Hub",
    desc: "Authentic Ayurvedic Therapies",
    rating: 4.6,
    reviews: 89,
    price: "₹3,200/session",
    distance: "4.1 km away • 22 min drive",
    lat: 28.7041,
    lng: 77.1025,
  },
];

export default function NearbyCentersPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-green-700 dark:text-green-400">
        Nearby Centers
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* List */}
        <div className="space-y-4">
          {centers.map((c) => (
            <div
              key={c.id}
              className="bg-white dark:bg-gray-800 shadow-lg dark:shadow-xl rounded p-4 border dark:border-gray-700"
            >
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                {c.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {c.desc}
              </p>
              <p className="text-yellow-500 dark:text-yellow-400 mt-1">
                {"★".repeat(Math.round(c.rating))}{" "}
                <span className="text-gray-600 dark:text-gray-300">
                  {c.rating} ({c.reviews} reviews)
                </span>
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {c.distance}
              </p>
              <p className="text-green-700 dark:text-green-400 font-medium">
                {c.price}
              </p>
              <button className="mt-2 w-full bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white py-2 rounded transition-colors">
                Book Appointment
              </button>
            </div>
          ))}
        </div>

        {/* Map */}
        <div className="bg-white dark:bg-gray-800 shadow-lg dark:shadow-xl rounded p-4 border dark:border-gray-700">
          <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">
            Map View
          </h3>
          <LeafletMap centers={centers} />
        </div>
      </div>
    </div>
  );
}
