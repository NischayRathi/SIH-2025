"use client";

import Image from "next/image";
import Navbar from "./components/navbar";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();

  // Function to get the appropriate dashboard URL based on user role
  const getDashboardUrl = () => {
    if (!session?.user) return "/dashboard";

    const userRole = (session.user as any)?.role || "user";

    switch (userRole) {
      case "admin":
        return "/admin/dashboard";
      case "doctor":
        return "/doctor/dashboard";
      case "receptionist":
        return "/receptionist/dashboard";
      case "user":
      default:
        return "/dashboard";
    }
  };

  const handleFindCenter = () => {
    if (status === "authenticated" && session) {
      const userRole = (session.user as any)?.role || "user";

      // For users, go to nearby centers; for staff, go to their main dashboard
      if (userRole === "user") {
        router.push("/dashboard/nearby-centers");
      } else {
        router.push(getDashboardUrl());
      }
    } else {
      router.push("/login");
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <Navbar />
      <section
        className="h-[90vh] bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm bg-cover bg-center flex flex-col justify-center items-start px-8 md:px-20 text-left relative transition-colors"
        style={{ backgroundImage: `url("/div.png")` }}
      >
        <div className="max-w-2xl p-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-green-800 dark:text-green-300">
            Your Path to Authentic{" "}
            <span className="text-green-600 dark:text-green-400">
              Panchakarma
            </span>{" "}
            Healing
          </h1>

          {/* 👤 Personalized greeting if logged in */}
          {status === "loading" ? (
            <p className="mt-3 text-lg text-gray-700 dark:text-gray-300">
              <span className="animate-pulse">Loading...</span>
            </p>
          ) : status === "authenticated" && session ? (
            <p className="mt-3 text-lg text-gray-700 dark:text-gray-300">
              Welcome back,{" "}
              <span className="font-semibold">{session?.user?.name}</span> 👋
            </p>
          ) : (
            <p className="mt-3 text-lg text-gray-700 dark:text-gray-300">
              Please log in to start your healing journey 🌿
            </p>
          )}

          <p className="mt-4 text-gray-800 dark:text-gray-200">
            Find verified clinics, receive personalized guidance, and track your
            healing journey with a platform built on trust and technology.
          </p>

          {/* ✅ Dynamic Redirect Button */}
          <button
            onClick={handleFindCenter}
            className="mt-6 px-6 py-3 rounded-lg bg-[#87a96b] hover:bg-[#76966a] dark:bg-green-600 dark:hover:bg-green-700 text-white font-semibold transition-colors"
          >
            Find a Panchakarma Center Near You
          </button>

          <div className="mt-4 flex gap-3">
            <input
              type="text"
              placeholder="Enter your city or pin code..."
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg w-full sm:w-80 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>
        </div>
      </section>

      {/* Healing Steps */}
      <section className="py-16 text-center bg-[#fcfcf5] dark:bg-gray-800">
        <h2 className="text-2xl font-bold text-[#4c5f26] dark:text-green-400">
          Healing, Simplified in 3 Steps
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10 max-w-6xl mx-auto px-6">
          <div>
            <div className="h-12 w-12 mx-auto bg-[#87a96b] dark:bg-green-600 rounded-full flex items-center justify-center text-xl">
              🔑
            </div>
            <h3 className="mt-4 font-semibold text-[#62723f] dark:text-green-400">
              Discover Verified Centers
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Explore top-rated, licensed Panchakarma centers near you.
            </p>
          </div>
          <div>
            <div className="h-12 w-12 mx-auto bg-[#87a96b] dark:bg-green-600 rounded-full flex items-center justify-center text-xl">
              📅
            </div>
            <h3 className="mt-4 font-semibold text-[#62723f] dark:text-green-400">
              Get Your Custom Plan
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Receive personalized diet, session, and lifestyle guidance.
            </p>
          </div>
          <div>
            <div className="h-12 w-12 mx-auto bg-[#87a96b] dark:bg-green-600 rounded-full flex items-center justify-center text-xl">
              📊
            </div>
            <h3 className="mt-4 font-semibold text-[#62723f] dark:text-green-400">
              Track Your Healing Journey
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Visualize your improvement with digital progress reports.
            </p>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <h2 className="text-2xl font-bold text-[#4c5f26] dark:text-green-400 text-center mb-10">
          Trust, Verified By Us
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto px-6">
          <div className="text-center">
            <div className="h-12 w-12 mx-auto bg-[#87a96b] dark:bg-green-600 rounded-full flex items-center justify-center text-xl">
              ✅
            </div>
            <h3 className="mt-4 font-semibold text-[#62723f] dark:text-green-400">
              Genuine Clinics, Guaranteed
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Every clinic on our platform is licensed and verified. Their
              credentials are immutably stored for transparency.
            </p>
          </div>
          <div className="text-center">
            <div className="h-12 w-12 mx-auto bg-[#87a96b] dark:bg-green-600 rounded-full flex items-center justify-center text-xl">
              💊
            </div>
            <h3 className="mt-4 font-semibold text-[#62723f] dark:text-green-400">
              Authentic Ayurvedic Medicines
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Scan prescribed medicines to instantly verify their authenticity
              and source.
            </p>
          </div>
        </div>
      </section>

      {/* AI Section */}
      <section className="py-16 bg-[#f4f5f1] dark:bg-gray-800">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 px-6 items-center">
          <div>
            <h2 className="text-2xl font-bold text-[#4c5f26] dark:text-green-400">
              A Smarter Path to Wellness, Guided by AI
            </h2>
            <ul className="mt-6 space-y-3 text-gray-700 dark:text-gray-300">
              <li>
                <div className="flex items-center ">
                  <div className="h-10 w-10 bg-[#87a96b] dark:bg-green-600 rounded-md flex items-center justify-center text-xl m-4">
                    📌
                  </div>
                  <div>
                    <h3 className="mt-4 font-semibold text-[#62723f] dark:text-green-400">
                      Automated Reminders
                    </h3>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">
                      For session and pre-session prep
                    </p>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex items-center ">
                  <div className="h-10 w-10 bg-[#87a96b] dark:bg-green-600 rounded-md flex items-center justify-center text-xl m-4">
                    🤖
                  </div>
                  <div>
                    <h3 className="mt-4 font-semibold text-[#62723f] dark:text-green-400">
                      AI-Predicted Session Plans
                    </h3>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">
                      For optimal treatment duration
                    </p>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex items-center ">
                  <div className="h-10 w-10 bg-[#87a96b] dark:bg-green-600 rounded-md flex items-center justify-center text-xl m-4">
                    🥗
                  </div>
                  <div>
                    <h3 className="mt-4 font-semibold text-[#62723f] dark:text-green-400">
                      Personalized Lifestyle & Diet Tips
                    </h3>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">
                      Sent daily
                    </p>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex items-center ">
                  <div className="h-10 w-10 bg-[#87a96b] dark:bg-green-600 rounded-md flex items-center justify-center text-xl m-4">
                    🧘
                  </div>
                  <div>
                    <h3 className="mt-4 font-semibold text-[#62723f] dark:text-green-400">
                      Curated Yoga & Meditation
                    </h3>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">
                      Video recommendations
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          {/* Image container */}
          <div className="relative w-full h-64 md:h-80">
            <Image
              src="/div.svg"
              alt="Description"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </section>

      {/* Progress Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <h2 className="text-2xl font-bold text-[#4c5f26] dark:text-green-400 text-center">
          Visualize Your Journey to Health
        </h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 mt-10 px-6 items-center">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <Image
              src="/chart.svg"
              alt="Chart"
              width={500}
              height={300}
              className="mx-auto"
            />
          </div>

          {/* Key Benefits */}
          <div>
            <h3 className="font-semibold text-[#62723f] dark:text-green-400">
              Key Benefits
            </h3>
            <ul className="mt-4 space-y-3 text-gray-700 dark:text-gray-300">
              <li>
                <div className="flex items-center ">
                  <div className="h-10 w-10 bg-[#87a96b] dark:bg-green-600 rounded-md flex items-center justify-center text-xl m-4">
                    📊
                  </div>
                  <div>
                    <h3 className="mt-4 font-semibold text-[#62723f] dark:text-green-400">
                      Track key metrics like pain, energy, and mood
                    </h3>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">
                      Video recommendations
                    </p>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex items-center ">
                  <div className="h-10 w-10 bg-[#87a96b] dark:bg-green-600 rounded-md flex items-center justify-center text-xl m-4">
                    📝
                  </div>
                  <div>
                    <h3 className="mt-4 font-semibold text-[#62723f] dark:text-green-400">
                      Receive a digital report after each session
                    </h3>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">
                      Video recommendations
                    </p>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex items-center ">
                  <div className="h-10 w-10 bg-[#87a96b] dark:bg-green-600 rounded-md flex items-center justify-center text-xl m-4">
                    🔒
                  </div>
                  <div>
                    <h3 className="mt-4 font-semibold text-[#62723f] dark:text-green-400">
                      Securely download and share your progress
                    </h3>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">
                      Video recommendations
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
