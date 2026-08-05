import type { Metadata } from "next";
import { Inter, Playfair_Display, Playball } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["700", "800", "900"],
  display: "swap",
});

const playball = Playball({
  subsets: ["latin"],
  variable: "--font-script",
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Charlotte Wilson for Princeton ISD School Board | Results Over Rhetoric",
  description:
    "Charlotte Wilson is a Princeton parent, current Special Education teacher, Department Chair, and Pre-K Team Lead running for Princeton ISD School Board with a focus on student achievement, teacher support, transparency, and strong Special Education.",
  metadataBase: new URL("https://charlotteforprinceton.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Charlotte Wilson for Princeton ISD School Board | Results Over Rhetoric",
    description:
      "Charlotte Wilson is a Princeton parent, current Special Education teacher, Department Chair, and Pre-K Team Lead running for Princeton ISD School Board.",
    url: "https://charlotteforprinceton.com",
    siteName: "Charlotte Wilson Campaign",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Charlotte Wilson for Princeton ISD School Board",
    description:
      "Charlotte Wilson is a Princeton parent, current Special Education teacher, Department Chair, and Pre-K Team Lead running for Princeton ISD School Board.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${playball.variable}`}
    >
      <body>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Navigation />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
