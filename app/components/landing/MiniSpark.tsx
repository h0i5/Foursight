"use client";

const DATA_MAIN = [120, 118, 125, 122, 131, 128, 135, 133, 140, 138, 145, 142, 150, 148, 155];
const DATA_TALL = [130, 125, 132, 128, 138, 135, 142, 139, 148, 144, 152, 149, 158, 154, 162, 158, 165];

function toPath(data: number[], width: number, height: number): string {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const pad = height * 0.08;
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - pad - ((v - min) / range) * (height - pad * 2);
    return `${x},${y}`;
  });
  return "M " + points.join(" L ");
}

export function MiniSparkMain() {
  const w = 240;
  const h = 56;
  const path = toPath(DATA_MAIN, w, h);
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none" className="w-full max-w-[240px]">
      <defs>
        <linearGradient id="sg-main" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgb(var(--positive))" stopOpacity="0.18" />
          <stop offset="100%" stopColor="rgb(var(--positive))" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={path + ` L ${w},${h} L 0,${h} Z`} fill="url(#sg-main)" />
      <path d={path} stroke="rgb(var(--positive))" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function MiniSparkTall() {
  const w = 180;
  const h = 120;
  const path = toPath(DATA_TALL, w, h);
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none" className="w-full max-w-[180px]">
      <defs>
        <linearGradient id="sg-tall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgb(var(--positive))" stopOpacity="0.15" />
          <stop offset="100%" stopColor="rgb(var(--positive))" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={path + ` L ${w},${h} L 0,${h} Z`} fill="url(#sg-tall)" />
      <path d={path} stroke="rgb(var(--positive))" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
