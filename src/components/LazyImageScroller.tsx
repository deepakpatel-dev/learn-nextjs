"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const IMAGES = [
  { src: "/next.svg", alt: "Next.js logo", label: "next.svg" },
  { src: "/vercel.svg", alt: "Vercel logo", label: "vercel.svg" },
  { src: "/globe.svg", alt: "Globe", label: "globe.svg" },
  { src: "/window.svg", alt: "Window", label: "window.svg" },
  { src: "/file.svg", alt: "File icon", label: "file.svg" },
  { src: "/next.svg", alt: "Next.js logo", label: "next.svg (second instance)" },
];

export default function LazyImageScroller() {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visible, setVisible] = useState<boolean[]>(IMAGES.map(() => false));

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const raw = (entry.target as HTMLElement).getAttribute("data-idx");
            const idx = raw !== null ? parseInt(raw, 10) : -1;
            if (idx >= 0) {
              setVisible((prev) => {
                const next = [...prev];
                next[idx] = true;
                return next;
              });
              observer.unobserve(entry.target);
            }
          }
        });
      },
      { root: container, rootMargin: "0px", threshold: 0.25 }
    );

    itemRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-80 overflow-y-auto border border-gray-200 rounded-xl bg-white divide-y divide-gray-100 scroll-smooth"
    >
      {IMAGES.map((img, i) => (
        <div
          key={i}
          ref={(el) => { itemRefs.current[i] = el; }}
          data-idx={String(i)}
          className="flex items-center gap-4 p-4"
        >
          {/* Image slot */}
          <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
            {!visible[i] && (
              <div className="absolute inset-0 bg-gray-100 animate-pulse rounded-lg" />
            )}
            {visible[i] && (
              <Image
                src={img.src}
                alt={img.alt}
                width={64}
                height={64}
                loading="eager"
                className="w-full h-full object-contain"
              />
            )}
          </div>

          {/* Label + status */}
          <div className="flex-1 min-w-0">
            <code className="text-sm text-gray-800 block mb-1 truncate">{img.label}</code>
            <code className="text-xs text-gray-400 block mb-2">loading=&quot;lazy&quot;</code>
            <span
              className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium transition-colors ${
                visible[i]
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              {visible[i] ? "✓ Loaded" : "⏳ Not yet in view"}
            </span>
          </div>

          {/* Index number */}
          <span className="text-4xl font-bold text-gray-100 font-mono shrink-0">{i + 1}</span>
        </div>
      ))}
    </div>
  );
}
