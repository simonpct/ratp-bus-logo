import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Générateur de Logo Bus RATP | Créez vos logos de ligne de bus",
  description:
    "Créez et exportez des logos de lignes de bus RATP personnalisés. Sélectionnez votre ligne, votre terminus et exportez en PNG, JPG ou SVG. Inclut les logos Métro, Tram et RER.",
  keywords: [
    "RATP",
    "bus",
    "logo",
    "générateur",
    "ligne de bus",
    "transport",
    "Île-de-France",
    "IDFM",
    "métro",
    "tram",
    "RER",
    "export",
    "PNG",
    "SVG",
    "personnalisation",
  ],
  authors: [{ name: "RATP Bus Logo Generator" }],
  creator: "RATP Bus Logo Generator",
  publisher: "RATP Bus Logo Generator",
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL || "http://localhost:3000"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Générateur de Logo Bus RATP",
    description:
      "Créez et exportez des logos de lignes de bus RATP personnalisés avec terminus et direction.",
    url: "/",
    siteName: "Générateur de Logo Bus RATP",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Générateur de Logo Bus RATP",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Générateur de Logo Bus RATP",
    description:
      "Créez et exportez des logos de lignes de bus RATP personnalisés",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/image-256.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
