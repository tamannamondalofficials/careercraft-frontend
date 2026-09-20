"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, ArrowRight, Sparkles, LayoutTemplate, Shield, Award } from "lucide-react";
import { TEMPLATE_OPTIONS, TemplateOption } from "@/constants/templates";

export function TemplateGallerySection() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Templates (5)" },
    { id: "ats", label: "Maximum ATS Score" },
    { id: "executive", label: "Senior & Tech" },
    { id: "modern", label: "Creative & Product" },
  ];

  const filteredTemplates = TEMPLATE_OPTIONS.filter((tpl: TemplateOption) => {
    if (selectedCategory === "all") return true;
    if (selectedCategory === "ats") return tpl.id === "minimal" || tpl.id === "executive";
    if (selectedCategory === "executive") return tpl.id === "executive" || tpl.id === "compact";
    if (selectedCategory === "modern") return tpl.id === "modern" || tpl.id === "elegant";
    return true;
  });

  return (
    <section id="templates" className="w-full py-20 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold mb-4">
            <LayoutTemplate size={14} className="text-indigo-600" />
            <span>Recruiter-Approved Templates</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
            Pick a Template Calibrated for{" "}
            <span className="text-indigo-600">1-Page Fit</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600">
            Every template is engineered to pass ATS scanners, fit neatly on one A4 page, and highlight your career accomplishments.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`text-xs sm:text-sm font-semibold px-4 py-2 rounded-full transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-100"
                  : "bg-white text-gray-600 hover:text-gray-900 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTemplates.map((template: TemplateOption) => (
            <div
              key={template.id}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-indigo-300 transition-all overflow-hidden flex flex-col group"
            >
              {/* Template Card Visual Preview Header */}
              <div className="h-56 bg-gradient-to-br from-slate-100 to-slate-200 p-5 flex items-center justify-center relative overflow-hidden">
                {template.badge && (
                  <span className="absolute top-3 right-3 text-[11px] font-bold px-2.5 py-1 rounded-full bg-indigo-600 text-white shadow-xs">
                    {template.badge}
                  </span>
                )}

                {/* Scaled Mini-Paper Representation */}
                <div className="w-44 h-56 bg-white shadow-md rounded-sm p-3 flex flex-col justify-between border border-slate-300 group-hover:scale-105 transition-transform duration-300 pointer-events-none">
                  <div>
                    {/* Header bar */}
                    <div className="border-b border-slate-300 pb-1.5 mb-2">
                      <div className="h-2.5 bg-slate-800 rounded-xs w-3/4 mb-1" />
                      <div className="h-1.5 bg-indigo-500 rounded-xs w-1/2" />
                    </div>
                    {/* Fake lines for summary & experience */}
                    <div className="space-y-1 mb-2">
                      <div className="h-1 bg-slate-400 rounded-xs w-full" />
                      <div className="h-1 bg-slate-300 rounded-xs w-5/6" />
                    </div>
                    <div className="space-y-1">
                      <div className="h-1.5 bg-slate-700 rounded-xs w-1/3 mb-0.5" />
                      <div className="h-1 bg-slate-300 rounded-xs w-full" />
                      <div className="h-1 bg-slate-300 rounded-xs w-4/5" />
                    </div>
                  </div>
                  <div className="pt-2 border-t border-slate-200 flex justify-between items-center">
                    <span className="text-[8px] font-mono text-slate-400 uppercase tracking-wider">
                      {template.id}
                    </span>
                    <span className="text-[8px] text-emerald-600 font-bold">
                      A4 Ready
                    </span>
                  </div>
                </div>
              </div>

              {/* Template Meta & Action */}
              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                      {template.name}
                    </h3>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                      {template.category}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed mb-4">
                    {template.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs font-medium text-emerald-600 flex items-center gap-1">
                    <Check size={14} /> 100% Free Export
                  </span>
                  <button
                    onClick={() => router.push(`/editor?template=${template.id}`)}
                    className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-3.5 py-2 rounded-xl transition-all cursor-pointer"
                  >
                    <span>Use This Template</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
