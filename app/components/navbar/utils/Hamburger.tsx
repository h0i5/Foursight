"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { NavTransition } from "../NavTransition";

export default function Hamburger() {
  const [isOpen, setIsOpen] = useState(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleClickOutside = (event: any) => {
    if (isOpen && !event.target.closest(".relative")) {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [isOpen, handleClickOutside]);

  let dropdownClass =
    "block px-4 py-2 text-sm hover:bg-gray-100 transition-colors duration-300 ease-in-out font-mono";

  let options = [
    {
      title: "PORTFOLIO",
      id: 1,
      href: "/portfolio",
    },
    {
      title: "WATCHLIST",
      id: 2,
      href: "/watchlist",
    },
    {
      title: "TOP MOVERS",
      id: 3,
      href: "/topmovers",
    },
    {
      title: "LOG OUT",
      id: 4,
      href: "/logout",
    },
  ];

  return (
    <div className="ml-2 flex items-center justify-center">
      <div className="relative inline-block text-left">
        <div>
          <button
            type="button"
            className="inline-flex w-full justify-center rounded-md border border-[#374151] px-2 h-[34px] text-sm font-mono font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100 transition-all duration-300 ease-in-out items-center"
            id="menu-button"
            aria-expanded={isOpen}
            aria-haspopup="true"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              className=" h-5 w-5 transition-transform duration-300 ease-in-out"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
              style={{
                transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
              }}
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        {isOpen && (
          <div
            className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transition-all duration-1s ease-in-out transform opacity-0 scale-95"
            style={{
              transform: isOpen
                ? "translateY(0) scale(1)"
                : "translateY(-10px) scale(0.9)",
              opacity: isOpen ? "1" : "0",
              transition: "all 0.3s ease-in-out",
            }}
          >
            <div
              className="py-1 transition-all duration-300 ease-in-out"
              role="none"
            >
              {options.map((option) => (
                <NavTransition
                  key={option.id}
                  href={option.href}
                  className={`${dropdownClass} ${
                    option.title === "LOG OUT"
                      ? "text-[#ce0000]"
                      : "text-gray-700"
                  }`}
                >
                  {option.title}
                </NavTransition>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
