"use client";

import FeaturesSection from "@/components/home/features";
import HeroSection from "@/components/home/heroSection";


export default function Home() {
  return (
    <div className="bg-white dark:bg-gray-900">
      <main className="flex flex-col items-center">
        <HeroSection />
        <FeaturesSection />
      </main>
    </div>
  );
}