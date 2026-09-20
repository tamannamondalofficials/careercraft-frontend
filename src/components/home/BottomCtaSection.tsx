"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, CheckCircle2, Sparkles, FileText } from "lucide-react";

export function BottomCtaSection() {
  const router = useRouter();

  return (
    <section className="w-full py-20 bg-gradient-to-b from-indigo-900 via-slate-900 to-slate-950 text-white relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-800/60 border border-indigo-700/60 text-indigo-300 text-xs font-bold mb-6">
          <Sparkles size={14} className="text-indigo-400" />
          <span>Start in Under 60 Seconds</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-6">
          Ready to Land Your Dream Job?
        </h2>

        <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto mb-10 leading-relaxed font-normal">
          Create a clean, ATS-compliant resume that gets noticed by hiring managers. Completely free forever.
        </p>

        <div className="flex flex-col items-center gap-4">
          <button
            onClick={() => router.push("/editor")}
            className="group flex items-center justify-center gap-3 bg-indigo-500 hover:bg-indigo-600 active:scale-[0.99] text-white text-lg font-bold px-10 py-4 rounded-2xl transition-all shadow-xl shadow-indigo-950 hover:shadow-2xl hover:-translate-y-0.5 cursor-pointer"
          >
            <span>Build My Resume Free</span>
            <ArrowRight size={20} className="group-hover:translate-x-1.5 transition-transform" />
          </button>

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-xs sm:text-sm text-slate-400 font-medium">
            <span className="flex items-center gap-1.5 text-slate-300">
              <CheckCircle2 size={15} className="text-emerald-400" />
              100% Free PDF
            </span>
            <span className="hidden sm:inline text-slate-600">•</span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <CheckCircle2 size={15} className="text-emerald-400" />
              No signup required
            </span>
            <span className="hidden sm:inline text-slate-600">•</span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <CheckCircle2 size={15} className="text-emerald-400" />
              No watermark
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
