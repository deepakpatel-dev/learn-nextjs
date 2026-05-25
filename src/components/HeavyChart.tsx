"use client";

import { useEffect, useRef } from "react";

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const VALUES = [45, 72, 38, 91, 55, 67, 83, 29, 64, 78, 52, 95];
const ANIM_MS = 700;

interface HeavyChartProps {
  onReady?: () => void;
}

export default function HeavyChart({ onReady }: HeavyChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Use a ref so the animation closure always calls the latest onReady
  const onReadyRef = useRef(onReady);
  useEffect(() => { onReadyRef.current = onReady; });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    const PAD = 44;
    const maxVal = Math.max(...VALUES);
    const slotW = (W - PAD * 2) / VALUES.length;
    // Rebind to a const so TypeScript keeps the non-null type inside the closure
    const c: CanvasRenderingContext2D = ctx;

    let raf: number;
    const t0 = performance.now();

    function draw(now: number) {
      const progress = Math.min((now - t0) / ANIM_MS, 1);
      // Ease-out cubic
      const ease = 1 - Math.pow(1 - progress, 3);

      c.clearRect(0, 0, W, H);

      // Horizontal grid lines + y-axis labels
      c.strokeStyle = "#e5e7eb";
      c.lineWidth = 1;
      for (let i = 0; i <= 5; i++) {
        const y = PAD + ((H - PAD * 2) / 5) * i;
        c.beginPath();
        c.moveTo(PAD, y);
        c.lineTo(W - PAD, y);
        c.stroke();
        c.fillStyle = "#9ca3af";
        c.font = "10px system-ui";
        c.textAlign = "right";
        c.fillText(String(Math.round(maxVal - (maxVal / 5) * i)), PAD - 6, y + 3);
      }

      // Bars (animated height)
      VALUES.forEach((v, i) => {
        const fullBarH = ((H - PAD * 2) * v) / maxVal;
        const barH = Math.max(fullBarH * ease, 2);
        const x = PAD + i * slotW + slotW * 0.12;
        const y = H - PAD - barH;
        const bw = slotW * 0.76;

        const grad = c.createLinearGradient(0, y, 0, H - PAD);
        grad.addColorStop(0, "#3b82f6");
        grad.addColorStop(1, "#1d4ed8");
        c.fillStyle = grad;
        c.beginPath();
        c.roundRect(x, y, bw, barH, 4);
        c.fill();

        // Month label
        c.fillStyle = "#6b7280";
        c.font = "9px system-ui";
        c.textAlign = "center";
        c.fillText(MONTHS[i], x + bw / 2, H - PAD + 14);

        // Value label (only when animation is complete)
        if (progress >= 1) {
          c.fillStyle = "#1f2937";
          c.font = "bold 10px system-ui";
          c.fillText(String(v), x + bw / 2, y - 5);
        }
      });

      if (progress < 1) {
        raf = requestAnimationFrame(draw);
      } else {
        onReadyRef.current?.();
      }
    }

    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, []); // intentionally empty — animation runs once on mount

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h3 className="font-semibold text-gray-800 mb-4">Monthly Performance Chart</h3>
      <canvas ref={canvasRef} width={580} height={260} className="w-full" />
      <p className="text-xs text-gray-400 mt-3 text-center">
        Dynamically loaded — excluded from the initial JS bundle
      </p>
    </div>
  );
}
