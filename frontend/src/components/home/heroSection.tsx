"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="max-w-4xl w-full text-center space-y-12 py-24"
      >
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ duration: 0.3 }}
          className="flex justify-center"
        >
          <Image
            src="/globe.svg"
            alt="Persona AI Logo"
            width={120}
            height={120}
            className="mb-8 drop-shadow-xl"
            priority
          />
        </motion.div>
        <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
          Discover Your <span className="text-blue-500">Persona</span> with AI
        </h1>
        <p className="text-xl sm:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
          Unlock insights into your personality type using cutting-edge AI. Analyze your social habits and discover whether you lean introvert, extrovert, or something in between.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center mt-12">
          <Link href="/predict">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-full font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              Start Your Journey
            </motion.button>
          </Link>
          <Link href="/notebook">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-blue-600 text-blue-600 px-10 py-4 rounded-full font-semibold hover:bg-blue-50 transition-all duration-300"
            >
              Explore the Model
            </motion.button>
          </Link>
        </div>
        <div className="mt-12 text-base text-gray-500">
          <span>
            Want to dive into the data?{" "}
            <Link href="/dataset" className="underline hover:text-blue-600 transition">
              Check out the dataset
            </Link>
          </span>
        </div>
      </motion.div>
    </section>
  );
}