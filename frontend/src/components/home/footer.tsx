import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 border-t-2 border-gray-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Persona AI</h3>
            <p className="text-sm">
              Discover your personality with AI-driven insights. Explore your social tendencies and unlock a deeper understanding of yourself.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/predict" className="hover:text-blue-400 transition">
                  Predict Personality
                </Link>
              </li>
              <li>
                <Link href="/notebook" className="hover:text-blue-400 transition">
                  Model Notebook
                </Link>
              </li>
              <li>
                <Link href="/dataset" className="hover:text-blue-400 transition">
                  Dataset
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
            <p className="text-sm">
              Have questions? Reach out at{" "}
              <a href="mailto:support@persona.ai" className="hover:text-blue-400 transition">
                support@persona.ai
              </a>
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm">
          &copy; {new Date().getFullYear()} Persona AI. All rights reserved.
        </div>
      </div>
    </footer>
  );
}