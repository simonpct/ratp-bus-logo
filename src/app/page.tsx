import { LogoGenerator } from "@/components/logo-generator";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Générateur de Logo Bus RATP",
    description:
      "Créez et exportez des logos de lignes de bus RATP personnalisés avec terminus et direction. Supporte les formats PNG, JPG et SVG.",
    url: process.env.NEXT_PUBLIC_URL || "http://localhost:3000",
    applicationCategory: "DesignApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
    },
    featureList: [
      "Sélection de lignes de bus RATP",
      "Choix de terminus",
      "Direction personnalisée",
      "Export PNG, JPG, SVG",
      "Logos Métro, Tram, RER intégrés",
      "Prévisualisation en temps réel",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
        <footer className="bg-white border-t mt-12">
          <div className="container mx-auto px-4 py-6 text-center text-gray-600 text-sm">
            <p>
              Générateur de logos de lignes de bus RATP - Données IDFM Mobilités
            </p>
            <p className="mt-2">
              Créez et personnalisez vos logos de bus avec direction et terminus
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
