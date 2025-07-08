"use client";
import { motion } from "framer-motion";

export default function FeaturesSection() {
  const features = [
    {
      title: "AI-Powered Analysis",
      description: "Leverage advanced machine learning to analyze your social habits and uncover your personality type with precision.",
      icon: "🧠",
    },
    {
      title: "Instant Insights",
      description: "Get real-time results that reveal whether you're an introvert, extrovert, or ambivert, tailored to your unique profile.",
      icon: "⚡",
    },
    {
      title: "Data-Driven Results",
      description: "Explore the dataset behind our model and understand the science of personality prediction.",
      icon: "📊",
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 m-4">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold text-center text-gray-800 dark:text-gray-100 mb-12"
        >
          Why Choose Persona AI?
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
    );
}