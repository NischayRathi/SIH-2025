"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { handleCompleteLogout } from "@/lib/logout";
import {
  Stethoscope,
  Users,
  Calendar,
  Pill,
  ClipboardList,
  Activity,
  ArrowRight,
  Loader2,
} from "lucide-react";

export default function DoctorDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.push("/doctor/login");
      return;
    }

    const userRole = (session.user as any)?.role;
    if (userRole !== "doctor") {
      // Redirect to appropriate dashboard based on actual role
      switch (userRole) {
        case "admin":
          router.push("/admin/dashboard");
          break;
        case "receptionist":
          router.push("/receptionist/dashboard");
          break;
        case "user":
          router.push("/dashboard");
          break;
        default:
          router.push("/login");
      }
      return;
    }

    setLoading(false);
  }, [session, status, router]);

  if (loading || status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="animate-spin w-8 h-8 text-green-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading doctor dashboard...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm dark:shadow-gray-700/20 border-b dark:border-gray-700 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Stethoscope className="w-8 h-8 text-green-600 dark:text-green-400 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  Doctor Dashboard
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Medical Professional Portal
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-green-600 dark:bg-green-500 flex items-center justify-center text-white font-semibold">
                  {session.user?.name?.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm text-gray-900 dark:text-gray-100 font-medium">
                  Dr. {session.user?.name}
                </span>
              </div>
              <button
                onClick={handleCompleteLogout}
                className="p-2 rounded hover:bg-red-50 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 transition-colors"
                title="Sign Out"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-gray-700/20 p-8 mb-8 border dark:border-gray-700 transition-colors">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
            Welcome, Dr. {session.user?.name}!
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Manage your patients, appointments, and medical practice
            efficiently.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-6 transition-colors">
              <div className="flex items-center">
                <Calendar className="w-8 h-8 text-green-600 dark:text-green-400 mr-3" />
                <div>
                  <h3 className="text-lg font-semibold text-green-800 dark:text-green-200">
                    Today's Appointments
                  </h3>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    12
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-6 transition-colors">
              <div className="flex items-center">
                <Users className="w-8 h-8 text-blue-600 dark:text-blue-400 mr-3" />
                <div>
                  <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200">
                    My Patients
                  </h3>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    156
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/30 rounded-lg p-6 transition-colors">
              <div className="flex items-center">
                <Pill className="w-8 h-8 text-purple-600 dark:text-purple-400 mr-3" />
                <div>
                  <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-200">
                    Prescriptions
                  </h3>
                  <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    8
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-orange-50 dark:bg-orange-900/30 rounded-lg p-6 transition-colors">
              <div className="flex items-center">
                <Activity className="w-8 h-8 text-orange-600 dark:text-orange-400 mr-3" />
                <div>
                  <h3 className="text-lg font-semibold text-orange-800 dark:text-orange-200">
                    Consultations
                  </h3>
                  <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                    24
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Doctor Tools */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Patient Management */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-gray-700/20 p-8 transition-colors">
            <div className="flex items-center mb-6">
              <Users className="w-8 h-8 text-green-600 dark:text-green-400 mr-3" />
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                Patient Management
              </h3>
            </div>

            <div className="space-y-4">
              <button className="w-full flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/30 hover:bg-green-100 dark:hover:bg-green-900/50 rounded-lg transition-colors">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mr-3">
                    <Users className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200">
                      My Patients
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      View and manage patient records
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 dark:text-gray-500" />
              </button>

              <button className="w-full flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-lg transition-colors">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center mr-3">
                    <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200">
                      Appointments
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Schedule and manage appointments
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 dark:text-gray-500" />
              </button>
            </div>
          </div>

          {/* Medical Tools */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-gray-700/20 p-8 transition-colors">
            <div className="flex items-center mb-6">
              <ClipboardList className="w-8 h-8 text-purple-600 dark:text-purple-400 mr-3" />
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                Medical Tools
              </h3>
            </div>

            <div className="space-y-4">
              <button className="w-full flex items-center justify-between p-4 bg-purple-50 dark:bg-purple-900/30 hover:bg-purple-100 dark:hover:bg-purple-900/50 rounded-lg transition-colors">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-800 rounded-full flex items-center justify-center mr-3">
                    <Pill className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200">
                      Prescriptions
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Write and manage prescriptions
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 dark:text-gray-500" />
              </button>

              <button className="w-full flex items-center justify-between p-4 bg-orange-50 dark:bg-orange-900/30 hover:bg-orange-100 dark:hover:bg-orange-900/50 rounded-lg transition-colors">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-orange-100 dark:bg-orange-800 rounded-full flex items-center justify-center mr-3">
                    <ClipboardList className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200">
                      Medical Reports
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Generate and view medical reports
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 dark:text-gray-500" />
              </button>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-gray-700/20 p-8 transition-colors">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
            Recent Activity
          </h3>
          <div className="space-y-4">
            <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg transition-colors">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mr-4">
                <Users className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="font-medium text-gray-800 dark:text-gray-200">
                  New patient consultation
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  John Doe - 2 hours ago
                </p>
              </div>
            </div>

            <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg transition-colors">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center mr-4">
                <Pill className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="font-medium text-gray-800 dark:text-gray-200">
                  Prescription updated
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Sarah Smith - 4 hours ago
                </p>
              </div>
            </div>

            <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg transition-colors">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-800 rounded-full flex items-center justify-center mr-4">
                <Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="font-medium text-gray-800 dark:text-gray-200">
                  Appointment scheduled
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Mike Johnson - 6 hours ago
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
