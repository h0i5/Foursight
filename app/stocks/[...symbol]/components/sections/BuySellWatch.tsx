"use client";
import Popup from "reactjs-popup";
import BuyPopup from "../handlers/BuyPopup";
import SellPopup from "../handlers/SellPopup";
import { apiURL } from "@/app/components/apiURL";
import axios from "axios";
import { getCookie } from "cookies-next";
import { sileo } from "sileo";
import React, { useState, useEffect } from "react";
import { NavTransition } from "@/app/components/navbar/NavTransition";

export default function BuySellWatch(props: any) {
  let symbol = props.symbol || "";
  let token = getCookie("token") as string | undefined;
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [buyOpen, setBuyOpen] = useState(false);
  const [sellOpen, setSellOpen] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === "b" || e.key === "B") {
        if (!token) { setShowLoginPrompt(true); return; }
        setBuyOpen(true);
      }
      if (e.key === "s" || e.key === "S") {
        if (!token) { setShowLoginPrompt(true); return; }
        setSellOpen(true);
      }
      if (e.key === "w" || e.key === "W") {
        handleWatchlistAddition();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [token]);

  async function handleWatchlistAddition() {
    if (!token) { setShowLoginPrompt(true); return; }
    let results;
    try {
      results = await axios({
        method: "post",
        url: apiURL + "/transaction/addWatchlist",
        headers: { Authorization: "Bearer " + token },
        data: { scrip: decodeURIComponent(symbol) },
      });
    } catch (err: any) {
      results = err.response;
    }
    if (results?.status === 200) sileo.success({ title: "Added to watchlist" });
    if (results?.status === 409) sileo.error({ title: "Already in watchlist!" });
  }

  const popupStyle = {
    width: "fit-content",
    border: "1px solid rgb(var(--border))",
    borderRadius: "0",
    padding: "0",
    background: "rgb(var(--card))",
    animation: "modalFadeIn 0.2s ease-out",
  };

  const overlayStyle = {
    background: "rgba(0, 0, 0, 0.5)",
    animation: "overlayFadeIn 0.2s ease-out",
  };

  return (
    <>
      <div className="flex flex-row gap-2 w-full xl:w-auto">
        <button
          onClick={() => token ? setBuyOpen(true) : setShowLoginPrompt(true)}
          className="flex-1 px-5 py-2.5 bg-card border border-border text-positive text-xs font-mono font-semibold hover:bg-positive hover:text-white hover:border-positive transition-colors flex items-center justify-center gap-2"
        >
          BUY<span className="hidden xl:inline opacity-40 font-normal">[B]</span>
        </button>
        <Popup
          contentStyle={popupStyle}
          overlayStyle={overlayStyle}
          open={buyOpen}
          onClose={() => setBuyOpen(false)}
          modal
          closeOnDocumentClick
          lockScroll
        >
          {/* @ts-ignore */}
          {(close: () => void) => (
            <BuyPopup
              companyName={props.companyName}
              symbol={decodeURIComponent(props.symbol)}
              ltp={props.ltp}
              onClose={() => { close(); setBuyOpen(false); }}
            />
          )}
        </Popup>

        <button
          onClick={() => token ? setSellOpen(true) : setShowLoginPrompt(true)}
          className="flex-1 px-5 py-2.5 bg-card border border-border text-negative text-xs font-mono font-semibold hover:bg-negative hover:text-white hover:border-negative transition-colors flex items-center justify-center gap-2"
        >
          SELL<span className="hidden xl:inline opacity-40 font-normal">[S]</span>
        </button>
        <Popup
          contentStyle={popupStyle}
          overlayStyle={overlayStyle}
          open={sellOpen}
          onClose={() => setSellOpen(false)}
          modal
          closeOnDocumentClick
          lockScroll
        >
          {/* @ts-ignore */}
          {(close: () => void) => (
            <SellPopup
              companyName={props.companyName}
              symbol={decodeURIComponent(props.symbol)}
              ltp={props.ltp}
              onClose={() => { close(); setSellOpen(false); }}
            />
          )}
        </Popup>

        <button
          onClick={handleWatchlistAddition}
          className="flex-1 px-5 py-2.5 border border-border bg-card text-foreground text-xs font-mono hover:bg-foreground hover:text-background hover:border-foreground transition-colors flex items-center justify-center gap-2"
        >
          WATCH<span className="hidden xl:inline opacity-40 font-normal">[W]</span>
        </button>
      </div>

      {showLoginPrompt && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.5)", animation: "overlayFadeIn 0.2s ease-out" }}
          onClick={() => setShowLoginPrompt(false)}
        >
          <div
            className="bg-card border border-border p-8 w-full max-w-sm mx-4 flex flex-col gap-6"
            style={{ animation: "modalFadeIn 0.2s ease-out" }}
            onClick={e => e.stopPropagation()}
          >
            <div>
              <p className="font-mono text-xs text-muted-foreground tracking-widest uppercase mb-3">LOGIN REQUIRED</p>
              <h2 className="text-xl font-bold font-mono text-foreground mb-2">Sign in to trade</h2>
              <p className="text-sm text-foreground/60">Create a free account to buy, sell, and track stocks with ₹2.5L virtual capital.</p>
            </div>
            <div className="flex flex-col gap-2">
              <NavTransition
                href="/login"
                className="w-full px-6 py-3 bg-foreground text-background text-sm font-mono text-center hover:bg-foreground/90 transition-colors border border-foreground"
              >
                LOGIN →
              </NavTransition>
              <NavTransition
                href="/signup"
                className="w-full px-6 py-3 bg-card text-foreground text-sm font-mono text-center hover:bg-muted transition-colors border border-border"
              >
                CREATE ACCOUNT
              </NavTransition>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
