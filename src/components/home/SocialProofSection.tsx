"use client";

import React from "react";
import { Star, CheckCircle, Award, Users, Zap, Building2, Quote } from "lucide-react";

export function SocialProofSection() {
  const stats = [
    { value: "45,000+", label: "Resumes Created", desc: "Across 30+ countries" },
    { value: "94%", label: "Interview Callback Rate", desc: "For ATS-tailored applications" },
    { value: "< 5 Mins", label: "Average Time", desc: "From blank to downloaded PDF" },
    { value: "$0", label: "Always Free", desc: "No watermarks, no paywalls" },
  ];

  const companies = [
    "Google",
    "Amazon",
    "Microsoft",
    "Stripe",
    "Uber",
    "Airbnb",
    "Spotify"
  ];

  const testimonials = [
    {
      name: "Marcus Vance",
      role: "Software Engineer at Stripe",
      text: "I applied to 20+ roles with my old Word resume with zero replies. Rebuilt it on CareerCraft with the Executive template and landed 4 interviews in 10 days.",
      avatar: "MV",
      rating: 5,
      tag: "Career Switcher"
    },
    {
      name: "Ananya Sharma",
      role: "Product Manager at TechCorp",
      text: "The split-screen live preview is brilliant. It forced me to keep my summary concise and fit everything on one page. Downloaded crisp PDF without any watermark.",
      avatar: "AS",
      rating: 5,
      tag: "Tech Professional"
    },
    {
      name: "Jordan Lee",
      role: "Financial Analyst",
      text: "Other resume builders lure you in and then demand $20 before letting you download. CareerCraft gave me an ATS-friendly PDF instantly. 100% recommended.",
      avatar: "JL",
      rating: 5,
      tag: "Finance & Operations"
    }
  ];

  return (
    <section className="w-full py-16 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 pb-14 border-b border-gray-100">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center text-center p-4">
              <span className="text-3xl sm:text-4xl font-extrabold text-indigo-600 tracking-tight">
                {stat.value}
              </span>
              <span className="text-sm font-bold text-gray-900 mt-1">
                {stat.label}
              </span>
              <span className="text-xs text-gray-500 mt-0.5 font-medium">
                {stat.desc}
              </span>
            </div>
          ))}
        </div>

        {/* Company Logos Strip */}
        <div className="pt-12 pb-14 text-center">
          <p className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-6">
            Candidates who used CareerCraft have landed interviews at
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-70 grayscale hover:grayscale-0 transition-all">
            {companies.map((company, idx) => (
              <div 
                key={idx} 
                className="text-lg sm:text-xl font-bold font-mono tracking-tight text-gray-600 flex items-center gap-1.5"
              >
                <Building2 size={18} className="text-indigo-600" />
                <span>{company}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          {testimonials.map((item, idx) => (
            <div 
              key={idx}
              className="bg-[#F8FAFC] border border-slate-200/80 rounded-2xl p-6 flex flex-col justify-between hover:shadow-lg hover:border-indigo-200 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" />
                    ))}
                  </div>
                  <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                    {item.tag}
                  </span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed italic mb-6">
                  &ldquo;{item.text}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-200/60">
                <div className="w-10 h-10 rounded-full bg-indigo-600 text-white font-bold text-sm flex items-center justify-center">
                  {item.avatar}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 leading-tight">
                    {item.name}
                  </h4>
                  <p className="text-xs text-gray-500 font-medium">
                    {item.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
