"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
      router.push("/receptionist/login?error=insufficient_privileges");
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
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700">
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
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {session.user?.name}
                </p>
                <p className="text-xs text-gray-600">Front Desk Staff</p>
              </div>
              <button
                onClick={() => router.push("/api/auth/signout")}
                className="px-4 py-2 text-sm text-red-600 hover:text-red-700 font-medium"
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
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome, {session.user?.name}!
          </h2>
          <p className="text-gray-600 mb-6">
            Manage patient registrations, appointments, and front desk
            operations.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-purple-50 rounded-lg p-6">
              <div className="flex items-center">
                <Calendar className="w-8 h-8 text-purple-600 mr-3" />
                <div>
                  <h3 className="text-lg font-semibold text-purple-800">
                    Today's Appointments
                  </h3>
                  <p className="text-2xl font-bold text-purple-600">28</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-6">
              <div className="flex items-center">
                <Users className="w-8 h-8 text-blue-600 mr-3" />
                <div>
                  <h3 className="text-lg font-semibold text-blue-800">
                    Walk-ins
                  </h3>
                  <p className="text-2xl font-bold text-blue-600">7</p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-6">
              <div className="flex items-center">
                <Phone className="w-8 h-8 text-green-600 mr-3" />
                <div>
                  <h3 className="text-lg font-semibold text-green-800">
                    Calls Handled
                  </h3>
                  <p className="text-2xl font-bold text-green-600">45</p>
                </div>
              </div>
            </div>

            <div className="bg-orange-50 rounded-lg p-6">
              <div className="flex items-center">
                <Clock className="w-8 h-8 text-orange-600 mr-3" />
                <div>
                  <h3 className="text-lg font-semibold text-orange-800">
                    Pending
                  </h3>
                  <p className="text-2xl font-bold text-orange-600">3</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Operations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Patient Services */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center mb-6">
              <Users className="w-8 h-8 text-purple-600 mr-3" />
              <h3 className="text-2xl font-bold text-gray-800">
                Patient Services
              </h3>
            </div>

            <div className="space-y-4">
              <button className="w-full flex items-center justify-between p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                    <Users className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-gray-800">
                      Patient Registration
                    </h4>
                    <p className="text-sm text-gray-600">
                      Register new patients
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
                      Appointment Management
                    </h4>
                    <p className="text-sm text-gray-600">
                      Schedule and manage appointments
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400" />
              </button>

              <button className="w-full flex items-center justify-between p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <Phone className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-gray-800">
                      Phone Management
                    </h4>
                    <p className="text-sm text-gray-600">
                      Handle patient calls and inquiries
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Administrative Tasks */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center mb-6">
              <ClipboardList className="w-8 h-8 text-green-600 mr-3" />
              <h3 className="text-2xl font-bold text-gray-800">
                Administrative Tasks
              </h3>
            </div>

            <div className="space-y-4">
              <button className="w-full flex items-center justify-between p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <CreditCard className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-gray-800">
                      Billing & Insurance
                    </h4>
                    <p className="text-sm text-gray-600">
                      Process payments and insurance
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400" />
              </button>

              <button className="w-full flex items-center justify-between p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                    <FileText className="w-5 h-5 text-orange-600" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-gray-800">
                      Medical Records
                    </h4>
                    <p className="text-sm text-gray-600">
                      Manage patient records
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400" />
              </button>

              <button className="w-full flex items-center justify-between p-4 bg-red-50 hover:bg-red-100 rounded-lg transition-colors">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-3">
                    <ClipboardList className="w-5 h-5 text-red-600" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-gray-800">Reports</h4>
                    <p className="text-sm text-gray-600">
                      Generate daily reports
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Today's Schedule */}
        <div className="mt-8 bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">
            Today's Schedule
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <Clock className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">
                    Dr. Smith - Cardiology
                  </p>
                  <p className="text-sm text-gray-600">9:00 AM - 12:00 PM</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                Active
              </span>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                  <Clock className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">
                    Dr. Johnson - General Medicine
                  </p>
                  <p className="text-sm text-gray-600">2:00 PM - 6:00 PM</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                Upcoming
              </span>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <Clock className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">
                    Dr. Williams - Pediatrics
                  </p>
                  <p className="text-sm text-gray-600">3:00 PM - 7:00 PM</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                Upcoming
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
