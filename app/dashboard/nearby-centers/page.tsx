"use client"
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
      <h2 className="text-xl font-semibold text-green-700">Nearby Centers</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* List */}
        <div className="space-y-4">
          {centers.map((c) => (
            <div key={c.id} className="bg-white shadow rounded p-4">
              <h3 className="font-semibold">{c.name}</h3>
              <p className="text-sm text-gray-600">{c.desc}</p>
              <p className="text-yellow-500 mt-1">
                {"★".repeat(Math.round(c.rating))}{" "}
                <span className="text-gray-600">
                  {c.rating} ({c.reviews} reviews)
                </span>
              </p>
              <p className="text-sm text-gray-500 mt-1">{c.distance}</p>
              <p className="text-green-700 font-medium">{c.price}</p>
              <button className="mt-2 w-full bg-green-600 text-white py-2 rounded">
                Book Appointment
              </button>
            </div>
          ))}
        </div>

        {/* Map */}
        <div className="bg-white shadow rounded p-4">
          <h3 className="font-semibold mb-2">Map View</h3>
          <LeafletMap centers={centers} />
        </div>
      </div>
    </div>
  );
}
