"use client";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useState, useEffect } from "react";
import { apiURL } from "../components/apiURL";
import Navbar from "../components/navbar/Navbar";
import { NavTransition } from "../components/navbar/NavTransition";
import parseJwt from "../components/navbar/utils/parseJwt";
import Networth from "./sections/Networth";
import RouterComponent from "../components/RouterComponent";
import Footer from "../components/Footer";

export default function PortfolioPage() {
  let token = getCookie("token");
  const [details, setDetails] = useState<any>({});
  const [profitDetails, setProfitDetails] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let tokenContents;
    if (token) {
      tokenContents = parseJwt(token);
    }

    async function getNetworth() {
      let results;
      try {
        results = await axios({
          method: "post",
          url: apiURL + "/auth/getAccountDetails",
          headers: { Authorization: "Bearer " + token },
        });
        setDetails(results.data);
      } catch (err) {
        console.error(err);
      }
    }

    async function getProfit() {
      let results;
      try {
        results = await axios({
          method: "post",
          url: apiURL + "/transaction/getAccountProfit",
          headers: { Authorization: "Bearer " + token },
        });
        setProfitDetails(results.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    getProfit();
    getNetworth();
  }, [token]);
  return (
    <div className="flex flex-col min-h-screen md:mx-[15%]">
      <Navbar />
      <main className="flex-grow mx-6 md:mx-0 mb-12 overflow-x-hidden max-w-full">
        <div>
          <RouterComponent />
        </div>
        <Networth data={details} profitDetails={profitDetails} loading={loading} />
      </main>
      <div className="mx-6 md:mx-0 mt-8">
        <Footer />
      </div>
    </div>
  );
}
