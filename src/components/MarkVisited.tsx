"use client";

import { useEffect } from "react";

export default function MarkVisited({ slug }: { slug: string }) {
  useEffect(() => {
    try {
      const raw = localStorage.getItem("opt-visited");
      const visited: string[] = raw ? JSON.parse(raw) : [];
      if (!visited.includes(slug)) {
        localStorage.setItem("opt-visited", JSON.stringify([...visited, slug]));
      }
    } catch {
      // localStorage may be unavailable (e.g. private browsing on some browsers)
    }
  }, [slug]);

  return null;
}
