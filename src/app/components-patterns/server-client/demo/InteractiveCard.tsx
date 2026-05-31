"use client";

import { useState } from "react";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export default function InteractiveCard({ post }: { post: Post }) {
  const [expanded, setExpanded] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(Math.floor(Math.random() * 80) + 10);

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 transition-all hover:shadow-sm">
      {/* Client component badge */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded font-mono font-medium">
          "use client" — InteractiveCard
        </span>
        <span className="text-xs text-gray-400">User #{post.userId}</span>
      </div>

      <h3 className="font-semibold text-gray-900 mb-2 capitalize">{post.title}</h3>

      {/* Expandable body — client state */}
      <p className={`text-sm text-gray-500 leading-relaxed transition-all ${expanded ? "" : "line-clamp-2"}`}>
        {post.body}
      </p>

      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs text-blue-600 hover:text-blue-800 font-medium transition-colors"
        >
          {expanded ? "Show less ↑" : "Read more ↓"}
        </button>
        <button
          onClick={() => {
            setLiked(!liked);
            setLikeCount(c => liked ? c - 1 : c + 1);
          }}
          className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full transition-all ${
            liked
              ? "bg-red-50 text-red-600 border border-red-200"
              : "bg-gray-50 text-gray-500 border border-gray-200 hover:border-red-200 hover:text-red-500"
          }`}
        >
          {liked ? "❤️" : "🤍"} {likeCount}
        </button>
      </div>
    </div>
  );
}
