/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState, useRef } from "react";
import { NavTransition } from "./NavTransition";
import Hamburger from "./utils/Hamburger";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { CiSearch } from "react-icons/ci";

const NavbarMobile = (props: any) => {
  const router = useRouter();
  const [logStatus, setLogStatus] = useState(false);
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  async function handleSearch(e: any) {
    e.preventDefault();
    router.push(`/stocks?search=${query}`);
  }

  useEffect(() => {
    const token = getCookie("token");
    if (token) {
      setLogStatus(true);
    } else {
      setLogStatus(false);
    }
  }, [logStatus]);

  const [isVisible, setIsVisible] = useState(false);

  const handleButtonClick = () => {
    setIsVisible(!isVisible);
    // Focus input after making it visible
    if (!isVisible) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check for Ctrl+K (or Cmd+K on Mac)
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsVisible(true);
        setTimeout(() => {
          searchInputRef.current?.focus();
        }, 100);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="py-4 px-6">
      <div className="flex flex-row items-center justify-between">
        <NavTransition className="flex flex-row items-center" href="/">
          <img src="/FoursightLogo.png" alt="Foursight Logo" className="h-8" />
          <span className="ml-2 font-medium text-black">Foursight</span>
        </NavTransition>
        <div className="flex flex-row justify-center items-center gap-2">
          <button onClick={handleButtonClick} className="p-2">
            <CiSearch className="text-black cursor-pointer text-lg" />
          </button>
          {!logStatus && (
            <NavTransition href="/signup" className="flex">
              <button className="bg-black flex items-center justify-center h-[34px] px-3 text-xs font-mono text-white border border-black hover:bg-black/90 transition">
                SIGN UP
              </button>
            </NavTransition>
          )}
          {logStatus && <Hamburger />}
        </div>
      </div>
      <div
        className={`search-bar mt-3 flex flex-row border transition px-3 h-[34px] items-center ${
          isFocused ? "border-black" : "border-[#374151] hover:border-black"
        } ${isVisible ? "animate-in" : ""}`}
      >
        <form
          className="flex flex-row w-full justify-between h-full items-center"
          onSubmit={handleSearch}
        >
          <input
            ref={searchInputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="w-full flex bg-transparent focus:border-none focus:outline-none border-none px-2 text-xs font-mono h-full"
            type="text"
            placeholder="Search stocks (Ctrl+K)"
          />
          <button type="submit" className="my-auto">
            <CiSearch className="hover:text-[#037a68]" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default NavbarMobile;
