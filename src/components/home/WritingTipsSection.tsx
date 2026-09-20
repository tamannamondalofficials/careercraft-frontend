"use client";

import React from "react";
import { BookOpen, CheckCircle, Lightbulb, ArrowRight, Target, FileSpreadsheet, Cpu } from "lucide-react";

export function WritingTipsSection() {
  const tips = [
    {
      icon: Target,
      number: "01",
      title: "The 3-Sentence Summary Formula",
      desc: "Recruiters spend 6 seconds scanning. Keep your summary under 40 words with this formula:",
      formula: "Sentence 1: Title + Years of Experience.\nSentence 2: Core specializations & key tools.\nSentence 3: Biggest quantified achievement.",
      example: "Senior Full Stack Engineer with 5+ years building scalable apps in React, Node, and AWS. Cut latency by 40% for 500k+ users."
    },
    {
      icon: FileSpreadsheet,
      number: "02",
      title: "The Google X-Y-Z Formula for Bullet Points",
      desc: "Instead of listing generic duties, frame every bullet point around measurable business impact:",
      formula: "“Accomplished [X], as measured by [Y], by doing [Z]”",
      example: "Grew organic inbound pipeline by 140% (Y) by architecting an automated programmatic SEO engine (Z), generating $850k in pipeline (X)."
    },
    {
      icon: Cpu,
      number: "03",
      title: "ATS Scannability Checklist",
      desc: "Ensure Applicant Tracking Systems parse 100% of your data cleanly without garbled text:",
      formula: "• Standard headings (Experience, Education, Skills)\n• Single-column layout without nested tables\n• Standard date formats (YYYY-MM or YYYY)",
      example: "CareerCraft templates automatically enforce these structural rules by default."
    }
  ];

  return (
    <section className="w-full py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-800 text-xs font-bold mb-4">
            <Lightbulb size={14} className="text-amber-600" />
            <span>Resume Best Practices</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
            3 Rules to Double Your Interview Callbacks
          </h2>
          <p className="text-base sm:text-lg text-gray-600">
            Write compelling bullet points and summary statements using proven recruitment frameworks.
          </p>
        </div>

        {/* 3 Tips Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tips.map((tip, idx) => {
            const Icon = tip.icon;
            return (
              <div
                key={idx}
                className="bg-[#F8FAFC] border border-gray-200/90 rounded-2xl p-6 flex flex-col justify-between hover:shadow-lg hover:border-indigo-200 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                      <Icon size={20} />
                    </div>
                    <span className="font-mono text-2xl font-black text-slate-300">
                      {tip.number}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {tip.title}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed mb-4">
                    {tip.desc}
                  </p>

                  {/* Formula Box */}
                  <div className="bg-white border border-slate-200/90 rounded-xl p-3 mb-3">
                    <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider block mb-1">
                      Formula:
                    </span>
                    <pre className="text-xs text-slate-800 font-mono whitespace-pre-wrap font-medium">
                      {tip.formula}
                    </pre>
                  </div>
                </div>

                {/* Example Box */}
                <div className="bg-indigo-50/60 border border-indigo-100 rounded-xl p-3 mt-2">
                  <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider block mb-1">
                    Good Example:
                  </span>
                  <p className="text-xs text-slate-700 italic leading-relaxed">
                    &ldquo;{tip.example}&rdquo;
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
