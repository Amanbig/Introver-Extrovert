import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <div className="max-w-2xl w-full text-center space-y-8 py-16">
        <div className="flex justify-center">
          <Image
            src="/globe.svg"
            alt="Persona AI Logo"
            width={80}
            height={80}
            className="mb-4"
            priority
          />
        </div>
        <h1 className="text-4xl font-bold tracking-tight">
          Welcome to <span className="text-primary">Persona AI</span>
        </h1>
        <p className="text-lg text-muted-foreground">
          Discover your personality type using AI! Analyze your social habits and get instant insights into whether you lean more introvert or extrovert.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link href="/predict">
            <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold shadow hover:bg-primary/90 transition">
              Get Started
            </button>
          </Link>
          <Link href="/notebook">
            <button className="border border-primary px-6 py-3 rounded-lg font-semibold text-primary hover:bg-primary/10 transition">
              View Model Notebook
            </button>
          </Link>
        </div>
        <div className="mt-8 text-sm text-muted-foreground">
          <span>
            Curious about the data?{" "}
            <Link href="/dataset" className="underline hover:text-primary">
              Explore the dataset
            </Link>
          </span>
        </div>
      </div>
    </main>
  );
}
