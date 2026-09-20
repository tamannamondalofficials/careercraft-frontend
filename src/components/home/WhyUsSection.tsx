"use client";

import React from "react";
import { Check, X, ShieldCheck, Zap, Lock, FileText, Sparkles } from "lucide-react";

export function WhyUsSection() {
  const comparisonRows = [
    {
      feature: "100% Free High-Res PDF Export",
      careercraft: "Free Forever",
      careercraftCheck: true,
      word: "Manual Export",
      wordCheck: false,
      competitors: "Paid ($15-$25/mo)",
      competitorsCheck: false,
    },
    {
      feature: "No Sign-Up or Credit Card Required",
      careercraft: "Instant Access",
      careercraftCheck: true,
      word: "Requires Office License",
      wordCheck: false,
      competitors: "Forced Account Creation",
      competitorsCheck: false,
    },
    {
      feature: "Real-Time Split-Screen Live Preview",
      careercraft: "Sub-millisecond Sync",
      careercraftCheck: true,
      word: "No Live Layout",
      wordCheck: false,
      competitors: "Laggy / Multi-step",
      competitorsCheck: false,
    },
    {
      feature: "Calibrated for 1-Page A4 Fit",
      careercraft: "Auto-tuned Margins",
      careercraftCheck: true,
      word: "Spills to 2 pages easily",
      wordCheck: false,
      competitors: "Random line wraps",
      competitorsCheck: false,
    },
    {
      feature: "ATS Keyword & Layout Optimization",
      careercraft: "Standard Headers & Text",
      careercraftCheck: true,
      word: "Easily broken formatting",
      wordCheck: false,
      competitors: "Overdesigned graphics",
      competitorsCheck: false,
    },
    {
      feature: "No Watermarks on Downloaded File",
      careercraft: "100% Clean PDF",
      careercraftCheck: true,
      word: "Clean",
      wordCheck: true,
      competitors: "Heavy Watermarks on Free",
      competitorsCheck: false,
    },
  ];

  const pillars = [
    {
      icon: Zap,
      title: "Zero Paywalls or Traps",
      desc: "Unlike other builders that let you type for 20 minutes before demanding a credit card, CareerCraft is 100% free to build, preview, and download."
    },
    {
      icon: ShieldCheck,
      title: "Recruiter & ATS Tested",
      desc: "Our templates use single-column structures, standard font hierarchies, and clean section demarcation that Applicant Tracking Systems parse cleanly."
    },
    {
      icon: Lock,
      title: "Privacy First by Design",
      desc: "Your draft is saved locally in your browser so you never lose work. We do not sell your personal data or spam your inbox."
    },
    {
      icon: FileText,
      title: "Single-Page Discipline",
      desc: "Recruiters spend 6 to 7 seconds on an initial review. Our layout proportions keep your summary and key impact strictly on one page."
    }
  ];

  return (
    <section id="why-us" className="w-full py-20 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold mb-4">
            <Sparkles size={14} className="text-indigo-600" />
            <span>Honest & Transparent</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
            Why Job Seekers Choose CareerCraft
          </h2>
          <p className="text-base sm:text-lg text-gray-600">
            Compare CareerCraft against traditional Word templates and expensive subscription resume tools.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-md overflow-hidden mb-16">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200 bg-slate-50/70">
                  <th className="py-5 px-6 text-sm font-bold text-gray-700 w-2/5">
                    Feature & Advantage
                  </th>
                  <th className="py-5 px-6 text-sm font-extrabold text-indigo-700 bg-indigo-50/70 border-x border-indigo-100 w-1/5 text-center">
                    CareerCraft
                  </th>
                  <th className="py-5 px-6 text-sm font-bold text-gray-500 w-1/5 text-center">
                    Microsoft Word / Docs
                  </th>
                  <th className="py-5 px-6 text-sm font-bold text-gray-500 w-1/5 text-center">
                    Paid Resume Builders
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {comparisonRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-6 text-sm font-semibold text-gray-800">
                      {row.feature}
                    </td>
                    <td className="py-4 px-6 text-sm font-bold text-indigo-700 bg-indigo-50/40 border-x border-indigo-100 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <Check size={16} className="text-emerald-600 stroke-[3]" />
                        <span>{row.careercraft}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-xs text-gray-600 text-center font-medium">
                      <div className="flex items-center justify-center gap-1.5">
                        {row.wordCheck ? (
                          <Check size={14} className="text-emerald-500" />
                        ) : (
                          <X size={14} className="text-rose-400" />
                        )}
                        <span>{row.word}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-xs text-gray-600 text-center font-medium">
                      <div className="flex items-center justify-center gap-1.5">
                        {row.competitorsCheck ? (
                          <Check size={14} className="text-emerald-500" />
                        ) : (
                          <X size={14} className="text-rose-400" />
                        )}
                        <span>{row.competitors}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 4 Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-gray-200/90 rounded-2xl p-6 hover:shadow-lg hover:border-indigo-200 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
                  <Icon size={20} />
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-2">
                  {pillar.title}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
