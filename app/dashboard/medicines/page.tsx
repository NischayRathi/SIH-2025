"use client";

import { useState } from "react";
import { CheckCircle, AlertCircle, Star } from "lucide-react";

interface Medicine {
  id: number;
  name: string;
  details: string;
  batch: string;
  usage: string;
  verified: boolean;
  store: string;
  rating: number;
  price: string;
}

const allMedicines: Medicine[] = [
  {
    id: 1,
    name: "Ashwagandha Capsules",
    details: "500mg - 60 Capsules",
    batch: "XXXXXX01",
    usage: "1 capsule twice daily",
    verified: true,
    store: "MedPlus Pharmacy",
    rating: 4.8,
    price: "₹299",
  },
  {
    id: 2,
    name: "Triphala Powder",
    details: "100g Pack",
    batch: "XXXXXX00",
    usage: "1 tsp with warm water",
    verified: false,
    store: "Ayur Store",
    rating: 4.2,
    price: "₹180",
  },
  {
    id: 3,
    name: "Brahmi Oil",
    details: "200ml Bottle",
    batch: "XXXXXX02",
    usage: "Head massage before sleep",
    verified: true,
    store: "Himalaya Store",
    rating: 4.9,
    price: "₹450",
  },
  {
    id: 4,
    name: "Tulsi Drops",
    details: "30ml Bottle",
    batch: "XXXXXX03",
    usage: "5 drops in warm water daily",
    verified: true,
    store: "Ayurveda Plus",
    rating: 4.7,
    price: "₹120",
  },
  {
    id: 5,
    name: "Neem Tablets",
    details: "250mg - 100 Tablets",
    batch: "XXXXXX04",
    usage: "2 tablets after meals",
    verified: true,
    store: "Organic Store",
    rating: 4.6,
    price: "₹210",
  },
  {
    id: 6,
    name: "Chyawanprash",
    details: "500g Pack",
    batch: "XXXXXX05",
    usage: "1 tsp daily with milk",
    verified: true,
    store: "AyurStore",
    rating: 4.5,
    price: "₹350",
  },
  {
    id: 7,
    name: "Giloy Juice",
    details: "1L Bottle",
    batch: "XXXXXX06",
    usage: "30ml with water twice daily",
    verified: false,
    store: "Herbal Life",
    rating: 4.0,
    price: "₹399",
  },
  {
    id: 8,
    name: "Shatavari Powder",
    details: "200g Pack",
    batch: "XXXXXX07",
    usage: "1 tsp in warm milk",
    verified: true,
    store: "Nature’s Best",
    rating: 4.4,
    price: "₹275",
  },
  {
    id: 9,
    name: "Amla Capsules",
    details: "500mg - 90 Capsules",
    batch: "XXXXXX08",
    usage: "1 capsule with water daily",
    verified: true,
    store: "Herbal World",
    rating: 4.3,
    price: "₹240",
  },
];


const ITEMS_PER_PAGE = 6;

export default function MedicinesPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(allMedicines.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentMedicines = allMedicines.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <div className="flex flex-col min-h-screen px-4 md:px-8 py-6">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-xl md:text-2xl font-semibold text-green-700">Medicines</h2>
        <p className="text-gray-600 text-sm md:text-base">Manage your prescribed medications</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3 text-green-700 mb-6">
        <input
          type="text"
          placeholder="Search medicines..."
          className="border text-green-700 px-4 py-2 rounded flex-1 w-full"
        />
        <select className="border px-3 py-2 rounded w-full md:w-auto">
          <option>All Categories</option>
          <option>Capsules</option>
          <option>Powder</option>
          <option>Oil</option>
        </select>
        <button className="px-4 py-2 bg-green-600 text-white rounded w-full md:w-auto">
          Filter
        </button>
      </div>

      {/* Medicine Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-green-700">
        {currentMedicines.map((m) => (
          <div key={m.id} className="bg-white shadow rounded p-4 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-base md:text-lg">{m.name}</h3>
                {m.verified ? (
                  <span className="flex items-center gap-1 text-green-700 bg-green-100 text-xs px-2 py-1 rounded">
                    <CheckCircle size={14} /> Verified
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-red-700 bg-red-100 text-xs px-2 py-1 rounded">
                    <AlertCircle size={14} /> Fake Alert
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600">{m.details}</p>
              <p className="text-xs text-gray-500">Batch number: {m.batch}</p>
              <p className="text-xs text-gray-500 mb-3">Usage: {m.usage}</p>
            </div>

            <div className="border-t pt-3 mt-2">
              <p className="text-sm text-gray-700">{m.store}</p>
              <p className="flex items-center text-yellow-500 text-sm">
                <Star size={14} fill="currentColor" /> {m.rating}
              </p>
              <div className="flex justify-between items-center mt-2">
                <p className="font-bold text-green-700">{m.price}</p>
                <button className="px-3 py-1 bg-green-600 text-white text-sm rounded">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          {/* Previous */}
          <button
            className={`px-4 py-2 rounded w-full sm:w-auto ${
              currentPage === 1
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-700 hover:bg-gray-100"
            }`}
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          >
            Previous
          </button>

          {/* Page numbers */}
          <div className="flex gap-2 flex-wrap justify-center">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded ${
                  currentPage === page
                    ? "bg-green-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          {/* Next */}
          <button
            className={`px-4 py-2 rounded w-full sm:w-auto ${
              currentPage === totalPages
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-700 hover:bg-gray-100"
            }`}
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}



