"use client";

import { X } from "lucide-react";
import { useState } from "react";

interface Props {
  text: string;
}

export default function AnnouncementBar({ text }: Props) {
  const [closed, setClosed] = useState(false);

  if (closed) return null;

  return (
    <div className="relative bg-gradient-to-r from-primary via-primary-container to-primary text-on-primary overflow-hidden h-11">
      <div className="absolute inset-0 flex items-center">
        <div className="flex whitespace-nowrap animate-marquee">
          <span className="mx-8 text-sm font-medium">{text}</span>
          <span className="mx-8 text-sm font-medium">{text}</span>
          <span className="mx-8 text-sm font-medium">{text}</span>
          <span className="mx-8 text-sm font-medium">{text}</span>
          <span className="mx-8 text-sm font-medium">{text}</span>
        </div>
      </div>
      <button
        onClick={() => setClosed(true)}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-1 rounded-full hover:bg-white/20 transition-colors"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
