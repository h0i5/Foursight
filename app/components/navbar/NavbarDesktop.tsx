/* eslint-disable @next/next/no-img-element */
"use client";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { CiSearch } from "react-icons/ci";
import { NavTransition } from "./NavTransition";
import { useEffect, useState, useRef } from "react";
import Hamburger from "./utils/Hamburger";

export default function NavbarDesktop(props: any) {
  const [logStatus, setLogStatus] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const token = getCookie("token");
    if (token) {
      setLogStatus(true);
    } else {
      setLogStatus(false);
    }
  }, [logStatus]);

  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  
  async function handleSearch(e: any) {
    e.preventDefault();
    router.push(`/stocks?search=${query}`);
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check for Ctrl+K (or Cmd+K on Mac)
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="flex flex-col py-4">
      <div className="flex items-center flex-row justify-between">
        <NavTransition className="flex flex-row items-center" href="/">
          <img src="/FoursightLogo.png" alt="Foursight Logo" className="h-8" />
          <span className="ml-2 font-medium text-black">Foursight</span>
        </NavTransition>
        <div className="flex flex-row items-center gap-2">
          <div className={`flex flex-row items-center border transition px-3 h-[34px] relative ${
            isFocused ? "border-black" : "border-[#374151] hover:border-black"
          }`}>
            <form
              className="flex flex-row items-center justify-center h-full w-full"
              onSubmit={handleSearch}
            >
              <input
                ref={searchInputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="bg-transparent focus:border-none focus:outline-none border-none px-2 text-xs font-mono h-full flex-1"
                type="text"
                placeholder="Search stocks (Ctrl+K)"
              />
              <button type="submit" className="my-auto">
                <CiSearch className="hover:text-[#037a68] text-base" />
              </button>
            </form>
          </div>
          {!logStatus && (
            <NavTransition href="/signup" className="flex">
              <button className="hover:bg-black/90 transition bg-black h-[34px] px-4 text-xs font-mono text-white border border-black flex items-center justify-center">
                SIGN UP
              </button>
            </NavTransition>
          )}
          {logStatus && <Hamburger />}
        </div>
      </div>
    </div>
  );
}
