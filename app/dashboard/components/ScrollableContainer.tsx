"use client";
import { useRef, useState, useEffect } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";

export default function ScrollableContainer({ children }: { children: React.ReactNode }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showRight, setShowRight] = useState(true);
  const [showLeft, setShowLeft] = useState(false);

  useEffect(() => {
    const check = () => {
      if (!scrollRef.current) return;
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const overflowing = scrollWidth > clientWidth;
      setShowRight(overflowing && scrollLeft + clientWidth < scrollWidth - 10);
      setShowLeft(overflowing && scrollLeft > 10);
    };

    check();
    const el = scrollRef.current;
    el?.addEventListener("scroll", check);
    const ro = new ResizeObserver(check);
    if (el) ro.observe(el);
    return () => {
      el?.removeEventListener("scroll", check);
      ro.disconnect();
    };
  }, [children]);

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        className="flex flex-row gap-3 overflow-x-auto scrollbar-hide"
      >
        {children}
      </div>

      {showRight && (
        <>
          <div className="absolute right-0 top-0 bottom-0 w-24 pointer-events-none bg-gradient-to-l from-background to-transparent" />
          <button
            onClick={() => scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" })}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-foreground text-background p-1.5 hover:bg-foreground/80 transition-colors z-10"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </>
      )}

      {showLeft && (
        <>
          <div className="absolute left-0 top-0 bottom-0 w-24 pointer-events-none bg-gradient-to-r from-background to-transparent" />
          <button
            onClick={() => scrollRef.current?.scrollBy({ left: -300, behavior: "smooth" })}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-foreground text-background p-1.5 hover:bg-foreground/80 transition-colors z-10"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </>
      )}
    </div>
  );
}
