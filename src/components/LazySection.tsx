"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface LazySectionProps {
  children: ReactNode;
  className?: string;
  placeholderHeight?: string;
  label?: string;
  onVisible?: () => void;
}

export default function LazySection({
  children,
  className = "",
  placeholderHeight = "h-40",
  label = "Waiting for viewport…",
  onVisible,
}: LazySectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  // Capture onVisible at mount time; functional state updater makes this safe
  const onVisibleRef = useRef(onVisible);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          onVisibleRef.current?.();
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {visible ? (
        children
      ) : (
        <div
          className={`${placeholderHeight} bg-gray-100 animate-pulse rounded-xl flex items-center justify-center text-gray-400 text-sm`}
        >
          {label}
        </div>
      )}
    </div>
  );
}
