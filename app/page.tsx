import Link from "next/link";
import { NavTransition } from "./components/navbar/NavTransition";
import Navbar from "./components/navbar/Navbar";
import {
  HiChartBar,
  HiEye,
  HiTrendingUp,
  HiCollection,
  HiFire,
  HiCode,
} from "react-icons/hi";
import Footer from "./components/Footer";

export default function Homepage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="text-center md:text-start flex flex-col md:mx-[15%]">
        <Navbar logStatus={false} />
      </div>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="text-left">
                <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 text-black">
                  Master the Market with{" "}
                  <span className="text-[#037a68]">Paper Trading</span>
                </h1>
                <p className="text-xl text-black/70 mb-12 max-w-xl leading-relaxed">
                  Experience real-time market dynamics without the risk.
                  Foursight brings you a comprehensive paper trading platform to
                  hone your skills.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <NavTransition
                    href="/signup"
                    className="px-8 py-4 text-white bg-black hover:bg-black/90 transition-all text-sm font-mono border border-black inline-block"
                  >
                    START TRADING NOW
                  </NavTransition>
                  <NavTransition
                    href="/dashboard"
                    className="px-8 py-4 text-black bg-white hover:bg-black/5 transition-all text-sm font-mono border border-[#374151] inline-block"
                  >
                    VIEW DASHBOARD
                  </NavTransition>
                </div>
              </div>
              <div className="hidden md:block">
                <img
                  src="/StockPage.jpg"
                  alt="Foursight Stock Trading Platform"
                  className="w-full h-auto "
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-16 text-black">
              Powerful Features
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                icon={<HiChartBar />}
                title="Live Data for 2000+ Stocks"
                description="Access real-time data for a wide range of stocks, ensuring you're always up-to-date with the market."
                accent="green"
              />
              <FeatureCard
                icon={<HiEye />}
                title="Advanced Charting"
                description="Visualize stock performance with our charting, helping you make informed decisions."
                accent="green"
              />
              <FeatureCard
                icon={<HiTrendingUp />}
                title="Paper Trading Portfolio"
                description="Build and manage your virtual portfolio, testing strategies without risking real money."
                accent="green"
              />
              <FeatureCard
                icon={<HiCollection />}
                title="Customizable Watchlists"
                description="Create and monitor personalized watchlists to keep track of your favorite stocks."
                accent="green"
              />
              <FeatureCard
                icon={<HiFire />}
                title="Live Top Movers"
                description="Stay informed with real-time data on top gainers, losers, and most active stocks across all market caps."
                accent="red"
              />
              <FeatureCard
                icon={<HiCode />}
                title="Open Source"
                description="Foursight is an open-source project, built for aspiring traders."
                accent="green"
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-6">
          <div className="max-w-2xl mx-auto text-center">
            <div className="border border-[#374151] p-12 bg-white">
              <h2 className="text-4xl font-bold mb-6 text-black">
                Ready to Start Your Trading Journey?
              </h2>
              <p className="text-xl text-black/60 mb-8">
                Join traders who are honing their skills with Foursight. Sign up
                today and take your first step towards mastering the market.
              </p>
              <NavTransition
                href="/signup"
                className="px-8 py-4 text-white bg-black hover:bg-black/90 transition-all text-sm font-mono border border-black inline-block"
              >
                CREATE YOUR FREE ACCOUNT
              </NavTransition>
            </div>
          </div>
        </section>
      </main>

      <div className="mx-6 md:mx-[15%] mt-8">
        <Footer />
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description, accent }: any) {
  const accentColor = accent === "red" ? "#ce0000" : "#037a68";
  return (
    <div className="border border-[#374151] p-8 bg-white hover:border-black transition-colors">
      <div className="mb-4 text-2xl" style={{ color: accentColor }}>
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-3 text-black">{title}</h3>
      <p className="text-black/60 leading-relaxed">{description}</p>
    </div>
  );
}
