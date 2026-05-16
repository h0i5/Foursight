import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mono",
  display: "swap",
});
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "sileo";
import { ThemeProvider } from "./components/theme/ThemeProvider";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "Foursight",
  description: "An Indian Stock Market based traning and analysis platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans`}>
        <ThemeProvider>
          <div className="flex flex-col min-h-screen bg-background overflow-x-hidden">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                <Navbar logStatus={true} />
              </div>
            </div>
            <main className="flex-grow">
              {children}
            </main>
            <div className="px-4 sm:px-6 lg:px-8 mt-8">
              <div className="max-w-7xl mx-auto">
                <Footer />
              </div>
            </div>
          </div>
          <Toaster
            position="bottom-right"
            options={{
              fill: "#171717",
              roundness: 16,
              styles: {
                title: "text-white!",
                description: "text-white/75!",
                badge: "bg-white/10! rounded-[16px]!",
                button: "bg-white/10! hover:bg-white/15! rounded-[16px]!",
              },
            }}
          />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
