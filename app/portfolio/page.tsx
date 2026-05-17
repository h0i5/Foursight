"use client";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useState, useEffect } from "react";
import { apiURL } from "../components/apiURL";
import Networth from "./sections/Networth";

export default function PortfolioPage() {
  let token = getCookie("token");
  const [details, setDetails] = useState<any>({});
  const [profitDetails, setProfitDetails] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPortfolio() {
      try {
        const [networthResult, profitResult] = await Promise.all([
          axios({ method: "post", url: apiURL + "/auth/getAccountDetails", headers: { Authorization: "Bearer " + token } }),
          axios({ method: "post", url: apiURL + "/transaction/getAccountProfit", headers: { Authorization: "Bearer " + token } }),
        ]);
        setDetails(networthResult.data);
        setProfitDetails(profitResult.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadPortfolio();
  }, [token]);

  return (
    <div className="px-4 sm:px-6 lg:px-8 pt-8 mb-16">
      <div className="max-w-7xl mx-auto">
        <div
          className="mt-8 mb-8"
        >
          <span className="text-xs font-mono text-muted-foreground tracking-wider">PORTFOLIO</span>
        </div>
        <Networth data={details} profitDetails={profitDetails} loading={loading} />
      </div>
    </div>
  );
}
