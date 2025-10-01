"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
      router.push("/doctor/login?error=insufficient_privileges");
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
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700">
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
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  Dr. {session.user?.name}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Medical Professional</p>
              </div>
              <button
                onClick={() => router.push("/api/auth/signout")}
                className="px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-2xl p-8 mb-8 border dark:border-gray-700">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
            Welcome, Dr. {session.user?.name}!
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Manage your patients, appointments, and medical practice
            efficiently.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-green-50 rounded-lg p-6">
              <div className="flex items-center">
                <Calendar className="w-8 h-8 text-green-600 mr-3" />
                <div>
                  <h3 className="text-lg font-semibold text-green-800">
                    Today's Appointments
                  </h3>
                  <p className="text-2xl font-bold text-green-600">12</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-6">
              <div className="flex items-center">
                <Users className="w-8 h-8 text-blue-600 mr-3" />
                <div>
                  <h3 className="text-lg font-semibold text-blue-800">
                    My Patients
                  </h3>
                  <p className="text-2xl font-bold text-blue-600">156</p>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 rounded-lg p-6">
              <div className="flex items-center">
                <Pill className="w-8 h-8 text-purple-600 mr-3" />
                <div>
                  <h3 className="text-lg font-semibold text-purple-800">
                    Prescriptions
                  </h3>
                  <p className="text-2xl font-bold text-purple-600">8</p>
                </div>
              </div>
            </div>

            <div className="bg-orange-50 rounded-lg p-6">
              <div className="flex items-center">
                <Activity className="w-8 h-8 text-orange-600 mr-3" />
                <div>
                  <h3 className="text-lg font-semibold text-orange-800">
                    Consultations
                  </h3>
                  <p className="text-2xl font-bold text-orange-600">24</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Doctor Tools */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Patient Management */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center mb-6">
              <Users className="w-8 h-8 text-green-600 mr-3" />
              <h3 className="text-2xl font-bold text-gray-800">
                Patient Management
              </h3>
            </div>

            <div className="space-y-4">
              <button className="w-full flex items-center justify-between p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <Users className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-gray-800">My Patients</h4>
                    <p className="text-sm text-gray-600">
                      View and manage patient records
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400" />
              </button>

              <button className="w-full flex items-center justify-between p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <Calendar className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-gray-800">
                      Appointments
                    </h4>
                    <p className="text-sm text-gray-600">
                      Schedule and manage appointments
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Medical Tools */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center mb-6">
              <ClipboardList className="w-8 h-8 text-purple-600 mr-3" />
              <h3 className="text-2xl font-bold text-gray-800">
                Medical Tools
              </h3>
            </div>

            <div className="space-y-4">
              <button className="w-full flex items-center justify-between p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                    <Pill className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-gray-800">
                      Prescriptions
                    </h4>
                    <p className="text-sm text-gray-600">
                      Write and manage prescriptions
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400" />
              </button>

              <button className="w-full flex items-center justify-between p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                    <ClipboardList className="w-5 h-5 text-orange-600" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-gray-800">
                      Medical Reports
                    </h4>
                    <p className="text-sm text-gray-600">
                      Generate and view medical reports
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8 bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">
            Recent Activity
          </h3>
          <div className="space-y-4">
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                <Users className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800">
                  New patient consultation
                </p>
                <p className="text-sm text-gray-600">John Doe - 2 hours ago</p>
              </div>
            </div>

            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <Pill className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800">
                  Prescription updated
                </p>
                <p className="text-sm text-gray-600">
                  Sarah Smith - 4 hours ago
                </p>
              </div>
            </div>

            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                <Calendar className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800">
                  Appointment scheduled
                </p>
                <p className="text-sm text-gray-600">
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
