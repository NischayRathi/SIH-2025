"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import {
  CheckCircle,
  AlertCircle,
  Clock,
  Pill,
  Calendar,
  User,
  Filter,
  Search,
  Plus,
  Bell,
} from "lucide-react";

interface Medicine {
  _id: string;
  medicineName: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
  startDate: string;
  endDate: string;
  status: "active" | "completed" | "discontinued";
  doctorId: {
    _id: string;
    name: string;
    specialization: string;
  };
  reminderTimes: string[];
  sideEffects?: string[];
}

export default function MedicinesPage() {
  const { data: session } = useSession();
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddMedicine, setShowAddMedicine] = useState(false);

  useEffect(() => {
    loadMedicines();
  }, []);

  const loadMedicines = async () => {
    try {
      const response = await fetch("/api/medicines");
      if (response.ok) {
        const data = await response.json();
        setMedicines(data);
      }
    } catch (error) {
      console.error("Failed to load medicines:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateMedicineStatus = async (medicineId: string, status: string) => {
    try {
      const response = await fetch("/api/medicines", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ medicineId, status }),
      });

      if (response.ok) {
        loadMedicines();
      }
    } catch (error) {
      console.error("Failed to update medicine:", error);
    }
  };

  const filteredMedicines = medicines.filter((medicine) => {
    const matchesFilter = filter === "all" || medicine.status === filter;
    const matchesSearch =
      medicine.medicineName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      medicine.doctorId.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "discontinued":
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case "active":
        return <Clock className="w-5 h-5 text-blue-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400";
      case "discontinued":
        return "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400";
      case "active":
        return "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400";
      default:
        return "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400";
    }
  };

  const isDueToday = (reminderTimes: string[]) => {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();

    return reminderTimes.some((time) => {
      const [hours, minutes] = time.split(":").map(Number);
      const reminderTime = hours * 60 + minutes;
      return Math.abs(currentTime - reminderTime) <= 30; // Within 30 minutes
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 dark:border-green-400"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            My Medicines
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Track your prescribed medications
          </p>
        </div>
        <button
          onClick={() => setShowAddMedicine(true)}
          className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Medicine
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow dark:shadow-xl p-6 border dark:border-gray-700">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex gap-4">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="all">All Medicines</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="discontinued">Discontinued</option>
              </select>
            </div>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" />
            <input
              type="text"
              placeholder="Search medicines..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>
        </div>
      </div>

      {/* Medicines List */}
      <div className="space-y-4">
        {filteredMedicines.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow dark:shadow-xl p-8 text-center border dark:border-gray-700">
            <Pill className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
              No medicines found
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              You don't have any medicines matching your current filter.
            </p>
            <button
              onClick={() => setShowAddMedicine(true)}
              className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Add Your First Medicine
            </button>
          </div>
        ) : (
          filteredMedicines.map((medicine) => (
            <div
              key={medicine._id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow dark:shadow-xl hover:shadow-md dark:hover:shadow-2xl transition-shadow border dark:border-gray-700"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full">
                      <Pill className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                        {medicine.medicineName}
                        {isDueToday(medicine.reminderTimes) && (
                          <Bell className="w-4 h-4 text-orange-500 dark:text-orange-400 animate-bounce" />
                        )}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {medicine.dosage}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(medicine.status)}
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                        medicine.status
                      )}`}
                    >
                      {medicine.status.charAt(0).toUpperCase() +
                        medicine.status.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                    <Clock className="w-4 h-4" />
                    <span>{medicine.frequency}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                    <Calendar className="w-4 h-4" />
                    <span>{medicine.duration}</span>
                  </div>
                </div>

                <div className="border-t dark:border-gray-600 pt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <User className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      Prescribed by {medicine.doctorId.name} (
                      {medicine.doctorId.specialization})
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                    <span className="font-medium">Instructions:</span>{" "}
                    {medicine.instructions}
                  </p>

                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
                    <span>
                      <span className="font-medium">Start:</span>{" "}
                      {new Date(medicine.startDate).toLocaleDateString()}
                    </span>
                    <span>
                      <span className="font-medium">End:</span>{" "}
                      {new Date(medicine.endDate).toLocaleDateString()}
                    </span>
                  </div>

                  {medicine.reminderTimes.length > 0 && (
                    <div className="mt-2">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                        Reminders:{" "}
                      </span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {medicine.reminderTimes.map((time, index) => (
                          <span
                            key={index}
                            className={`px-2 py-1 text-xs rounded-full ${
                              isDueToday([time])
                                ? "bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-400"
                                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                            }`}
                          >
                            {time}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {medicine.sideEffects && medicine.sideEffects.length > 0 && (
                    <div className="mt-2">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                        Side Effects:{" "}
                      </span>
                      <span className="text-sm text-red-600 dark:text-red-400">
                        {medicine.sideEffects.join(", ")}
                      </span>
                    </div>
                  )}
                </div>

                {medicine.status === "active" && (
                  <div className="flex gap-2 mt-4 pt-4 border-t dark:border-gray-600">
                    <button
                      onClick={() =>
                        updateMedicineStatus(medicine._id, "completed")
                      }
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white rounded-lg text-sm font-medium transition-colors"
                    >
                      Mark Complete
                    </button>
                    <button
                      onClick={() =>
                        updateMedicineStatus(medicine._id, "discontinued")
                      }
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white rounded-lg text-sm font-medium transition-colors"
                    >
                      Discontinue
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Medicine Modal - Show placeholder for now */}
      {showAddMedicine && (
        <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-black dark:bg-opacity-70 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6 border dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Add Medicine
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Medicine addition form will be implemented soon.
            </p>
            <button
              onClick={() => setShowAddMedicine(false)}
              className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
