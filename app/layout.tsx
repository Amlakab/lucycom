import type { Metadata } from "next";
import "./globals.css";

import { ThemeProvider } from "@/lib/theme-context";
import { LanguageProvider } from "@/lib/language-context";
import { AuthProvider } from "@/lib/auth";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: "LUCYCOM TECHNOLOGIES S.C. | ICT, Telecom & Data Center Solutions",
  description: "LUCYCOM TECHNOLOGIES S.C. is a premier Ethiopian share company dedicated to designing, supplying, and supporting resilient, scalable, and international standards-compliant ICT infrastructure.",
  keywords: [
    "Lucycom Technologies",
    "Ethiopian Telecom Infrastructure",
    "Data Center Addis Ababa",
    "Smart Classrooms Ethiopia",
    "Enterprise Security",
    "Next-Gen Firewall",
    "AI CCTV Surveillance",
    "Electromechanical Contractor Ethiopia"
  ],
  authors: [{ name: "LUCYCOM TECHNOLOGIES S.C." }],
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "LUCYCOM TECHNOLOGIES S.C.",
    description: "Empowering Ethiopia's Digital Future through World-Class ICT & Telecom Infrastructure.",
    url: "https://www.lucycomtechnologies.com",
    siteName: "LUCYCOM TECHNOLOGIES S.C.",
    images: [
      {
        url: "/images/lucycom-hero.png",
        width: 1200,
        height: 630,
        alt: "Lucycom Technologies S.C.",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta 
          name="viewport" 
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=yes, viewport-fit=cover" 
        />
      </head>
      <body className="font-sans overflow-x-hidden antialiased selection:bg-blue-500 selection:text-white">
        <AuthProvider>
          <LanguageProvider>
            <ThemeProvider>
              <div className="relative min-h-screen overflow-x-hidden">
                {children}
              </div>
            </ThemeProvider>
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
