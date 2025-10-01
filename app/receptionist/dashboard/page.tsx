"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { handleCompleteLogout } from "@/lib/logout";
import {
  Users,
  Calendar,
  Phone,
  ClipboardList,
  CreditCard,
  FileText,
  ArrowRight,
  Loader2,
  Clock,
} from "lucide-react";

export default function ReceptionistDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.push("/receptionist/login");
      return;
    }

    const userRole = (session.user as any)?.role;
    if (userRole !== "receptionist") {
      // Redirect to appropriate dashboard based on actual role
      switch (userRole) {
        case "admin":
          router.push("/admin/dashboard");
          break;
        case "doctor":
          router.push("/doctor/dashboard");
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
          <Loader2 className="animate-spin w-8 h-8 text-purple-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading receptionist dashboard...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm dark:shadow-gray-700/20 border-b dark:border-gray-700 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Users className="w-8 h-8 text-purple-600 dark:text-purple-400 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  Receptionist Dashboard
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Front Desk Operations Portal
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-purple-600 dark:bg-purple-500 flex items-center justify-center text-white font-semibold">
                  {session.user?.name?.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm text-gray-900 dark:text-gray-100 font-medium">
                  {session.user?.name}
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
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-gray-700/20 p-8 mb-8 transition-colors">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
            Welcome, {session.user?.name}!
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Manage patient registrations, appointments, and front desk
            operations.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-purple-50 dark:bg-purple-900/30 rounded-lg p-6 transition-colors">
              <div className="flex items-center">
                <Calendar className="w-8 h-8 text-purple-600 dark:text-purple-400 mr-3" />
                <div>
                  <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-200">
                    Today's Appointments
                  </h3>
                  <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    28
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-6 transition-colors">
              <div className="flex items-center">
                <Users className="w-8 h-8 text-blue-600 dark:text-blue-400 mr-3" />
                <div>
                  <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200">
                    Walk-ins
                  </h3>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    7
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-6 transition-colors">
              <div className="flex items-center">
                <Phone className="w-8 h-8 text-green-600 dark:text-green-400 mr-3" />
                <div>
                  <h3 className="text-lg font-semibold text-green-800 dark:text-green-200">
                    Calls Handled
                  </h3>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    45
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-orange-50 dark:bg-orange-900/30 rounded-lg p-6 transition-colors">
              <div className="flex items-center">
                <Clock className="w-8 h-8 text-orange-600 dark:text-orange-400 mr-3" />
                <div>
                  <h3 className="text-lg font-semibold text-orange-800 dark:text-orange-200">
                    Pending
                  </h3>
                  <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                    3
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Operations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Patient Services */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-gray-700/20 p-8 transition-colors">
            <div className="flex items-center mb-6">
              <Users className="w-8 h-8 text-purple-600 dark:text-purple-400 mr-3" />
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                Patient Services
              </h3>
            </div>

            <div className="space-y-4">
              <button className="w-full flex items-center justify-between p-4 bg-purple-50 dark:bg-purple-900/30 hover:bg-purple-100 dark:hover:bg-purple-900/50 rounded-lg transition-colors">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-800 rounded-full flex items-center justify-center mr-3">
                    <Users className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200">
                      Patient Registration
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Register new patients
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
                      Appointment Management
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Schedule and manage appointments
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 dark:text-gray-500" />
              </button>

              <button className="w-full flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/30 hover:bg-green-100 dark:hover:bg-green-900/50 rounded-lg transition-colors">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mr-3">
                    <Phone className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200">
                      Phone Management
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Handle patient calls and inquiries
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 dark:text-gray-500" />
              </button>
            </div>
          </div>

          {/* Administrative Tasks */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-gray-700/20 p-8 transition-colors">
            <div className="flex items-center mb-6">
              <ClipboardList className="w-8 h-8 text-green-600 dark:text-green-400 mr-3" />
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                Administrative Tasks
              </h3>
            </div>

            <div className="space-y-4">
              <button className="w-full flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/30 hover:bg-green-100 dark:hover:bg-green-900/50 rounded-lg transition-colors">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mr-3">
                    <CreditCard className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200">
                      Billing & Insurance
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Process payments and insurance
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 dark:text-gray-500" />
              </button>

              <button className="w-full flex items-center justify-between p-4 bg-orange-50 dark:bg-orange-900/30 hover:bg-orange-100 dark:hover:bg-orange-900/50 rounded-lg transition-colors">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-orange-100 dark:bg-orange-800 rounded-full flex items-center justify-center mr-3">
                    <FileText className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200">
                      Medical Records
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Manage patient records
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 dark:text-gray-500" />
              </button>

              <button className="w-full flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/30 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-lg transition-colors">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-red-100 dark:bg-red-800 rounded-full flex items-center justify-center mr-3">
                    <ClipboardList className="w-5 h-5 text-red-600 dark:text-red-400" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200">
                      Reports
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Generate daily reports
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 dark:text-gray-500" />
              </button>
            </div>
          </div>
        </div>

        {/* Today's Schedule */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-gray-700/20 p-8 transition-colors">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
            Today's Schedule
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg transition-colors">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center mr-4">
                  <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="font-medium text-gray-800 dark:text-gray-200">
                    Dr. Smith - Cardiology
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    9:00 AM - 12:00 PM
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 rounded-full text-sm font-medium">
                Active
              </span>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg transition-colors">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-800 rounded-full flex items-center justify-center mr-4">
                  <Clock className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="font-medium text-gray-800 dark:text-gray-200">
                    Dr. Johnson - General Medicine
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    2:00 PM - 6:00 PM
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200 rounded-full text-sm font-medium">
                Upcoming
              </span>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg transition-colors">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mr-4">
                  <Clock className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="font-medium text-gray-800 dark:text-gray-200">
                    Dr. Williams - Pediatrics
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    3:00 PM - 7:00 PM
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200 rounded-full text-sm font-medium">
                Upcoming
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
