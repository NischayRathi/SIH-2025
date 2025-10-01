"use client";
import Link from "next/link";
import { Shield, UserPlus, Stethoscope, Users, ArrowRight } from "lucide-react";

export default function StaffPortalPage() {
  const roles = [
    {
      title: "Administrator",
      description: "System administration and management",
      icon: Shield,
      loginPath: "/admin/login",
      signupPath: "/admin/signup",
      color: "blue",
      bgColor: "from-blue-50 to-blue-100",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      buttonColor: "bg-blue-600 hover:bg-blue-700",
    },
    {
      title: "Doctor",
      description: "Medical professionals and specialists",
      icon: Stethoscope,
      loginPath: "/doctor/login",
      signupPath: "/doctor/signup",
      color: "green",
      bgColor: "from-green-50 to-green-100",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      buttonColor: "bg-green-600 hover:bg-green-700",
    },
    {
      title: "Receptionist",
      description: "Front desk and patient management",
      icon: Users,
      loginPath: "/receptionist/login",
      signupPath: "/receptionist/signup",
      color: "purple",
      bgColor: "from-purple-50 to-purple-100",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      buttonColor: "bg-purple-600 hover:bg-purple-700",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 pt-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-full mb-6">
            <Shield className="w-10 h-10 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            Staff Portal
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Access your healthcare management dashboard. Choose your role to
            continue.
          </p>
        </div>

        {/* Role Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <div
                key={role.title}
                className={`bg-gradient-to-br ${role.bgColor} dark:from-gray-800 dark:to-gray-700 rounded-2xl shadow-xl p-8 transform hover:scale-105 transition-all duration-300`}
              >
                <div className="text-center mb-8">
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 ${role.iconBg} dark:bg-gray-600 rounded-full mb-4`}
                  >
                    <Icon
                      className={`w-8 h-8 ${role.iconColor} dark:text-gray-300`}
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                    {role.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {role.description}
                  </p>
                </div>

                <div className="space-y-4">
                  <Link
                    href={role.loginPath}
                    className={`w-full ${role.buttonColor} text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center group`}
                  >
                    Sign In
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <Link
                    href={role.signupPath}
                    className="w-full bg-white hover:bg-gray-50 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-100 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center border border-gray-200 dark:border-gray-500 group"
                  >
                    Register
                    <UserPlus className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Patient Portal Link */}
        <div className="text-center">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 max-w-md mx-auto">
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              Are you a patient?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Access patient services and appointments
            </p>
            <Link
              href="/login"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-500 dark:to-blue-500 text-white rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 dark:hover:from-green-600 dark:hover:to-blue-600 transition-all"
            >
              Patient Portal
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
