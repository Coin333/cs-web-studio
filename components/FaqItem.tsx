"use client";
import { useState } from "react";
import { Plus } from "lucide-react";

interface Props {
  question: string;
  answer: React.ReactNode;
  defaultOpen?: boolean;
}

export function FaqItem({ question, answer, defaultOpen = false }: Props) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 hover:border-zinc-700 transition-colors">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex items-start justify-between gap-4 p-5 md:p-6 text-left cursor-pointer"
      >
        <span className="text-base md:text-lg font-semibold text-zinc-100">
          {question}
        </span>
        <span
          className={
            "shrink-0 mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-full border transition-all duration-300 " +
            (open
              ? "bg-indigo-500/15 border-indigo-500/40 text-indigo-300 rotate-45"
              : "bg-white/5 border-white/10 text-zinc-300")
          }
        >
          <Plus className="w-4 h-4" />
        </span>
      </button>
      <div
        className={
          "grid transition-all duration-300 ease-out " +
          (open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")
        }
      >
        <div className="overflow-hidden">
          <div className="px-5 md:px-6 pb-5 md:pb-6 -mt-1 text-zinc-400 leading-relaxed text-sm md:text-base">
            {answer}
          </div>
        </div>
      </div>
    </div>
  );
}
