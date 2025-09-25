"use client";

import Image from "next/image";
import Navbar from "./components/navbar";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const handleFindCenter = () => {
    if (status === "authenticated") {
      router.push("/dashboard/nearby-centers");
    } else {
      router.push("/login");
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <Navbar />
      <section
        className="h-[90vh] bg-white/70 backdrop-blur-sm bg-cover bg-center flex flex-col justify-center items-start px-8 md:px-20 text-left relative"
        style={{ backgroundImage: `url("/div.png")` }}
      >
        <div className="max-w-2xl p-6 rounded-md">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#4d5f27]">
            Your Path to Authentic{" "}
            <span className="text-[#87a96b]">Panchakarma</span> Healing
          </h1>

          {/* 👤 Personalized greeting if logged in */}
          {status === "authenticated" ? (
            <p className="mt-3 text-lg text-gray-700">
              Welcome back,{" "}
              <span className="font-semibold">{session?.user?.name}</span> 👋
            </p>
          ) : (
            <p className="mt-3 text-lg text-gray-700">
              Please log in to start your healing journey 🌿
            </p>
          )}

          <p className="mt-4 text-gray-800">
            Find verified clinics, receive personalized guidance, and track your
            healing journey with a platform built on trust and technology.
          </p>

          {/* ✅ Dynamic Redirect Button */}
          <button
            onClick={handleFindCenter}
            className="mt-6 px-6 py-3 rounded-lg bg-[#87a96b] text-white font-semibold"
          >
            Find a Panchakarma Center Near You
          </button>

          <div className="mt-4 flex gap-3">
            <input
              type="text"
              placeholder="Enter your city or pin code..."
              className="px-4 py-3 border rounded-lg w-full sm:w-80"
            />
          </div>
        </div>
      </section>

      {/* Healing Steps */}
      <section className="py-16 text-center bg-[#fcfcf5] ">
        <h2 className="text-2xl font-bold text-[#4c5f26]">
          Healing, Simplified in 3 Steps
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10 max-w-6xl mx-auto px-6">
          <div>
            <div className="h-12 w-12 mx-auto bg-[#87a96b] rounded-full flex items-center justify-center text-xl">
              🔑
            </div>
            <h3 className="mt-4 font-semibold text-[#62723f]">
              Discover Verified Centers
            </h3>
            <p className="mt-2 text-gray-600 ">
              Explore top-rated, licensed Panchakarma centers near you.
            </p>
          </div>
          <div>
            <div className="h-12 w-12 mx-auto bg-[#87a96b] rounded-full flex items-center justify-center text-xl">
              📅
            </div>
            <h3 className="mt-4 font-semibold text-[#62723f]">
              Get Your Custom Plan
            </h3>
            <p className="mt-2 text-gray-600">
              Receive personalized diet, session, and lifestyle guidance.
            </p>
          </div>
          <div>
            <div className="h-12 w-12 mx-auto bg-[#87a96b] rounded-full flex items-center justify-center text-xl">
              📊
            </div>
            <h3 className="mt-4 font-semibold text-[#62723f]">
              Track Your Healing Journey
            </h3>
            <p className="mt-2 text-gray-600">
              Visualize your improvement with digital progress reports.
            </p>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-gray-50">
        <h2 className="text-2xl font-bold text-[#4c5f26] text-center mb-10">
          Trust, Verified By Us
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto px-6">
          <div className="text-center">
            <div className="h-12 w-12 mx-auto bg-[#87a96b] rounded-full flex items-center justify-center text-xl">
              ✅
            </div>
            <h3 className="mt-4 font-semibold text-[#62723f]">
              Genuine Clinics, Guaranteed
            </h3>
            <p className="mt-2 text-gray-600">
              Every clinic on our platform is licensed and verified. Their
              credentials are immutably stored for transparency.
            </p>
          </div>
          <div className="text-center">
            <div className="h-12 w-12 mx-auto bg-[#87a96b] rounded-full flex items-center justify-center text-xl">
              💊
            </div>
            <h3 className="mt-4 font-semibold text-[#62723f]">
              Authentic Ayurvedic Medicines
            </h3>
            <p className="mt-2 text-gray-600">
              Scan prescribed medicines to instantly verify their authenticity
              and source.
            </p>
          </div>
        </div>
      </section>

      {/* AI Section */}
      <section className="py-16 bg-[#f4f5f1]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 px-6 items-center">
          <div>
            <h2 className="text-2xl font-bold text-[#4c5f26]">
              A Smarter Path to Wellness, Guided by AI
            </h2>
            <ul className="mt-6 space-y-3 text-gray-700">
              <li>
                <div className="flex items-center ">
                  <div className="h-10 w-10 bg-[#87a96b] rounded-md flex items-center justify-center text-xl m-4">
                    📌
                  </div>
                  <div>
                    <h3 className="mt-4 font-semibold text-[#62723f]">
                      Automated Reminders
                    </h3>
                    <p className="mt-2 text-gray-600">
                      For session and pre-session prep
                    </p>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex items-center ">
                  <div className="h-10 w-10 bg-[#87a96b] rounded-md flex items-center justify-center text-xl m-4">
                    🤖
                  </div>
                  <div>
                    <h3 className="mt-4 font-semibold text-[#62723f]">
                      AI-Predicted Session Plans
                    </h3>
                    <p className="mt-2 text-gray-600">
                      For optimal treatment duration
                    </p>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex items-center ">
                  <div className="h-10 w-10 bg-[#87a96b] rounded-md flex items-center justify-center text-xl m-4">
                    🥗
                  </div>
                  <div>
                    <h3 className="mt-4 font-semibold text-[#62723f]">
                      Personalized Lifestyle & Diet Tips
                    </h3>
                    <p className="mt-2 text-gray-600">Sent daily</p>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex items-center ">
                  <div className="h-10 w-10 bg-[#87a96b] rounded-md flex items-center justify-center text-xl m-4">
                    🧘
                  </div>
                  <div>
                    <h3 className="mt-4 font-semibold text-[#62723f]">
                      Curated Yoga & Meditation
                    </h3>
                    <p className="mt-2 text-gray-600">Video recommendations</p>
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
      <section className="py-16 bg-gray-50">
        <h2 className="text-2xl font-bold text-[#4c5f26] text-center">
          Visualize Your Journey to Health
        </h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 mt-10 px-6 items-center">
          <div className="bg-white rounded-xl shadow p-6">
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
            <h3 className="font-semibold text-[#62723f]">Key Benefits</h3>
            <ul className="mt-4 space-y-3 text-gray-700">
              <li>
                <div className="flex items-center ">
                  <div className="h-10 w-10 bg-[#87a96b] rounded-md flex items-center justify-center text-xl m-4">
                    📊
                  </div>
                  <div>
                    <h3 className="mt-4 font-semibold text-[#62723f]">
                      Track key metrics like pain, energy, and mood
                    </h3>
                    <p className="mt-2 text-gray-600">
                      Video recommendations
                    </p>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex items-center ">
                  <div className="h-10 w-10 bg-[#87a96b] rounded-md flex items-center justify-center text-xl m-4">
                    📝
                  </div>
                  <div>
                    <h3 className="mt-4 font-semibold text-[#62723f]">
                      Receive a digital report after each session
                    </h3>
                    <p className="mt-2 text-gray-600">
                      Video recommendations
                    </p>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex items-center ">
                  <div className="h-10 w-10 bg-[#87a96b] rounded-md flex items-center justify-center text-xl m-4">
                    🔒
                  </div>
                  <div>
                    <h3 className="mt-4 font-semibold text-[#62723f]">
                      Securely download and share your progress
                    </h3>
                    <p className="mt-2 text-gray-600">
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
