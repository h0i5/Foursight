"use client";
import { useRef, useState, useEffect } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";

export default function ScrollableContainer({ children }: { children: React.ReactNode }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [showLeftArrow, setShowLeftArrow] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        const hasMoreContent = scrollWidth > clientWidth;
        const isAtEnd = scrollLeft + clientWidth >= scrollWidth - 10;
        const isAtStart = scrollLeft <= 10;
        
        setShowRightArrow(hasMoreContent && !isAtEnd);
        setShowLeftArrow(hasMoreContent && !isAtStart);
      }
    };

    checkScroll();
    const scrollElement = scrollRef.current;
    scrollElement?.addEventListener("scroll", checkScroll);
    
    // Check on resize
    const resizeObserver = new ResizeObserver(checkScroll);
    if (scrollElement) {
      resizeObserver.observe(scrollElement);
    }

    return () => {
      scrollElement?.removeEventListener("scroll", checkScroll);
      resizeObserver.disconnect();
    };
  }, [children]);

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        className="flex flex-row gap-3 overflow-x-auto pb-2 -mx-6 md:mx-0 px-6 md:px-0 scrollbar-hide"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {children}
      </div>
      
      {/* Right fade gradient */}
      {showRightArrow && (
        <div className="absolute right-0 top-0 bottom-2 w-32 pointer-events-none bg-gradient-to-l from-white via-white/80 to-transparent" />
      )}
      
      {/* Left fade gradient */}
      {showLeftArrow && (
        <div className="absolute left-0 top-0 bottom-2 w-32 pointer-events-none bg-gradient-to-r from-white via-white/80 to-transparent" />
      )}
      
      {/* Right scroll arrow */}
      {showRightArrow && (
        <button
          onClick={scrollRight}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black text-white p-2 border border-black hover:bg-black/90 transition-colors z-10"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      )}
      
      {/* Left scroll arrow */}
      {showLeftArrow && (
        <button
          onClick={scrollLeft}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black text-white p-2 border border-black hover:bg-black/90 transition-colors z-10"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
