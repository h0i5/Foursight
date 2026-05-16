"use client";
import { DotmSquare1 } from "@/app/components/ui/dotm-square-1";

export default function Loading() {
  return (
    <DotmSquare1
      size={32}
      dotSize={4}
      speed={1.2}
      animated
      bloom
      opacityBase={0.35}
      opacityMid={0.65}
    />
  );
}
