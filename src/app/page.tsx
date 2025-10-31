import { LogoGenerator } from "@/components/logo-generator";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Générateur de Logo de Bus RATP
          </h1>
          <p className="text-gray-600 mt-2">
            Créez des logos personnalisés pour les lignes de bus
          </p>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <LogoGenerator />
      </main>
    </div>
  );
}
