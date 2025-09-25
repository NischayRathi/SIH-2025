"use client";

import { Calendar, Clock } from "lucide-react";

const upcomingAppointments = [
  {
    id: 1,
    title: "Abhyanga Massage",
    doctor: "Dr. Rajesh Kumar",
    date: "Nov 15, 2024 - 10:00 AM",
    status: "Confirmed",
  },
  {
    id: 2,
    title: "Panchakarma Consultation",
    doctor: "Dr. Priya Sharma",
    date: "Nov 20, 2024 - 2:00 PM",
    status: "Pending",
  },
];

const pastAppointments = [
  {
    id: 1,
    title: "Shirodhara Therapy",
    doctor: "Dr. Amit Patel",
    date: "Nov 5, 2024 - 11:00 AM",
    status: "Completed",
  },
  {
    id: 2,
    title: "Initial Consultation",
    doctor: "Dr. Rajesh Kumar",
    date: "Oct 28, 2024 - 9:00 AM",
    status: "Completed",
  },
];

export default function AppointmentsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <h2 className="text-xl font-semibold text-green-700">Appointments</h2>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button className="px-4 py-2 rounded bg-green-600 text-white font-medium">
          + Book New Session
        </button>
        <button className="px-4 py-2 rounded bg-blue-500 text-white font-medium">
          📅 Reschedule
        </button>
        <button className="px-4 py-2 rounded bg-red-500 text-white font-medium">
          ❌ Cancel
        </button>
      </div>

      {/* Calendar Mock (simplified static version) */}
      <div className="bg-white shadow rounded p-6">
        <h3 className="font-semibold mb-4 text-green-700">November 2024</h3>
        <div className="grid grid-cols-7 text-center gap-2 text-sm">
          {[
            "Sun",
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat",
          ].map((d) => (
            <div key={d} className="font-medium text-black">
              {d}
            </div>
          ))}
          {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => {
            const highlight =
              day === 5 || day === 11 ? "bg-green-400 text-white" : "";
            const selected = day === 7 ? "bg-blue-500 text-white" : "";
            const today = day === 15 ? "border border-green-700" : "";

            return (
              <div
                key={day}
                className={`text-black h-10 flex items-center justify-center rounded cursor-pointer ${highlight} ${selected} ${today}`}
              >
                {day}
              </div>
            );
          })}
        </div>
      </div>

      {/* Appointment Lists */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Upcoming */}
        <div className="bg-white shadow rounded p-4">
          <h3 className="font-semibold mb-4 text-green-700">Upcoming Appointments</h3>
          <ul className="space-y-3">
            {upcomingAppointments.map((a) => (
              <li
                key={a.id}
                className=" text-green-700 border rounded p-3 flex justify-between items-center"
              >
                <div>
                  <p className="font-medium text-green-700">{a.title}</p>
                  <p className="text-xs text-gray-500 ">{a.doctor}</p>
                  <p className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                    <Calendar size={14} /> {a.date}
                  </p>
                </div>
                <span
                  className={`px-2 py-1 text-xs rounded ${
                    a.status === "Confirmed"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {a.status}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Past */}
        <div className="bg-white shadow rounded p-4">
          <h3 className="font-semibold mb-4 text-green-700">Past Appointments</h3>
          <ul className="space-y-3">
            {pastAppointments.map((a) => (
              <li
                key={a.id}
                className=" text-green-700 border rounded p-3 flex justify-between items-center"
              >
                <div>
                  <p className="font-medium">{a.title}</p>
                  <p className="text-xs text-gray-500">{a.doctor}</p>
                  <p className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                    <Clock size={14} /> {a.date}
                  </p>
                </div>
                <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-700">
                  {a.status}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
