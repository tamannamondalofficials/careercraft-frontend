"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  FileText, 
  ShieldCheck, 
  Download, 
  Laptop, 
  Briefcase, 
  TrendingUp, 
  Eye,
  Sliders
} from "lucide-react";

export function HeroSection() {
  const router = useRouter();

  // Interactive mini-demo state for live hero showcase
  const [demoRole, setDemoRole] = useState<'developer' | 'product' | 'marketing'>('developer');
  const [demoName, setDemoName] = useState('Alex Morgan');
  const [demoTitle, setDemoTitle] = useState('Senior Full Stack Engineer');

  const rolePresets = {
    developer: {
      name: 'Alex Morgan',
      title: 'Senior Full Stack Engineer',
      skills: 'React, TypeScript, Next.js, Node.js, PostgreSQL, Docker, AWS',
      summary: 'Full Stack Engineer with 5+ years building scalable cloud apps. Led microservices migration cutting latency by 40% for 500k+ active users.',
      experience: 'Apex Cloud Solutions • Lead Engineer (2022 - Present)',
      color: 'bg-indigo-50 border-indigo-200 text-indigo-700'
    },
    product: {
      name: 'Sarah Jenkins',
      title: 'Senior Product Manager',
      skills: 'Product Strategy, Roadmap Prioritization, SQL, A/B Testing, User Research',
      summary: 'Data-driven Product Manager with 6+ years scaling B2B SaaS. Grew enterprise ARR by $4.2M through streamlined onboarding workflows.',
      experience: 'ScaleFlow Dynamics • Senior PM (2021 - Present)',
      color: 'bg-emerald-50 border-emerald-200 text-emerald-700'
    },
    marketing: {
      name: 'David Chen',
      title: 'Growth Marketing Lead',
      skills: 'Performance Marketing, SEO/SEM, Google Analytics 4, HubSpot, CRO',
      summary: 'Growth Marketer with 5+ years scaling demand gen. Reduced CAC by 35% while doubling qualified pipeline across multi-channel campaigns.',
      experience: 'Vanguard Media • Growth Lead (2022 - Present)',
      color: 'bg-amber-50 border-amber-200 text-amber-700'
    }
  };

  const handleSelectPreset = (role: 'developer' | 'product' | 'marketing') => {
    setDemoRole(role);
    setDemoName(rolePresets[role].name);
    setDemoTitle(rolePresets[role].title);
  };

  return (
    <section className="relative w-full pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-indigo-50/70 via-purple-50/40 to-transparent -z-10 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        {/* Audience Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100/80 text-indigo-700 text-xs sm:text-sm font-semibold mb-6 shadow-2xs">
          <Sparkles size={15} className="text-indigo-600 animate-pulse" />
          <span>Made for freshers, developers & career switchers</span>
        </div>

        {/* Outcome-Driven Headline (<12 words) */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 tracking-tight leading-[1.12] mb-6 max-w-4xl">
          Land More Interviews With a{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600">
            Recruiter-Approved Resume
          </span>
        </h1>

        {/* Subtitle (1-2 lines) */}
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mb-8 leading-relaxed font-normal">
          Create a clean, ATS-compliant resume in 5 minutes with our live split-screen editor. Export to crisp PDF instantly.
        </p>

        {/* Action Button & Reassurance */}
        <div className="flex flex-col items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => router.push("/editor")}
            className="group w-full sm:w-auto flex items-center justify-center gap-3 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] text-white text-lg font-bold px-9 py-4 rounded-2xl transition-all shadow-xl shadow-indigo-200 hover:shadow-2xl hover:shadow-indigo-300 hover:-translate-y-0.5 cursor-pointer"
          >
            <span>Build My Resume Free</span>
            <ArrowRight size={20} className="group-hover:translate-x-1.5 transition-transform" />
          </button>

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-xs sm:text-sm text-gray-500 font-medium pt-1">
            <span className="flex items-center gap-1.5 text-gray-700">
              <CheckCircle2 size={15} className="text-emerald-500" />
              100% Free PDF
            </span>
            <span className="hidden sm:inline text-gray-300">•</span>
            <span className="flex items-center gap-1.5 text-gray-700">
              <CheckCircle2 size={15} className="text-emerald-500" />
              No signup required
            </span>
            <span className="hidden sm:inline text-gray-300">•</span>
            <span className="flex items-center gap-1.5 text-gray-700">
              <CheckCircle2 size={15} className="text-emerald-500" />
              No watermark
            </span>
          </div>
        </div>

        {/* Interactive Live Split-Screen Product Showcase (Show Product Early) */}
        <div className="mt-14 w-full max-w-5xl text-left">
          <div className="bg-slate-900 rounded-3xl p-3 sm:p-5 shadow-2xl border border-slate-800 ring-1 ring-slate-800/60">
            {/* Top Editor Mockup Window Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 sm:pb-4 border-b border-slate-800 px-2">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-xs font-mono text-slate-400 ml-2 hidden sm:inline">
                  careercraft.app/editor — Live Preview
                </span>
              </div>

              {/* Demo Role Switcher Tabs */}
              <div className="flex items-center gap-1.5 bg-slate-800/90 p-1 rounded-xl">
                <span className="text-[11px] text-slate-400 font-semibold px-2 hidden md:inline">
                  Try Sample Role:
                </span>
                <button
                  onClick={() => handleSelectPreset('developer')}
                  className={`text-xs px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                    demoRole === 'developer'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Developer
                </button>
                <button
                  onClick={() => handleSelectPreset('product')}
                  className={`text-xs px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                    demoRole === 'product'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Product
                </button>
                <button
                  onClick={() => handleSelectPreset('marketing')}
                  className={`text-xs px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                    demoRole === 'marketing'
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Marketing
                </button>
              </div>
            </div>

            {/* Split-Screen Interactive Visual Container */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-4">
              {/* Left Side: Interactive Form Simulation */}
              <div className="lg:col-span-5 bg-slate-800/70 border border-slate-700/60 rounded-2xl p-4 sm:p-5 flex flex-col justify-between">
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                      <Sliders size={14} /> Quick Live Edit
                    </span>
                    <span className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
                      <CheckCircle2 size={12} /> Live Sync
                    </span>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={demoName}
                      onChange={(e) => setDemoName(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500 transition-colors"
                      placeholder="Your Name"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                      Target Job Title
                    </label>
                    <input
                      type="text"
                      value={demoTitle}
                      onChange={(e) => setDemoTitle(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500 transition-colors"
                      placeholder="Job Title"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                      Professional Summary (Concise ATS)
                    </label>
                    <p className="text-[11px] text-slate-300 bg-slate-900/90 border border-slate-700/80 rounded-lg p-2.5 line-clamp-3 leading-relaxed">
                      {rolePresets[demoRole].summary}
                    </p>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                      Target Skills Taxonomies
                    </label>
                    <p className="text-[11px] text-indigo-300 bg-slate-900/90 border border-slate-700/80 rounded-lg p-2 font-mono text-[10.5px]">
                      {rolePresets[demoRole].skills}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-700/70 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">
                    Template: <strong className="text-white">Executive (A4)</strong>
                  </span>
                  <button
                    onClick={() => router.push(`/editor?preset=${demoRole}`)}
                    className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    Open in Editor <ArrowRight size={14} />
                  </button>
                </div>
              </div>

              {/* Right Side: High-Fidelity Resume Document Preview */}
              <div 
                onClick={() => router.push(`/editor?preset=${demoRole}`)}
                className="lg:col-span-7 bg-white rounded-2xl p-5 sm:p-6 shadow-xl border border-slate-100 flex flex-col justify-between cursor-pointer group hover:ring-2 hover:ring-indigo-500 transition-all min-h-[360px]"
              >
                <div>
                  {/* Resume Header */}
                  <div className="border-b-2 border-slate-900 pb-3 mb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h2 className="text-xl font-bold text-slate-900 tracking-tight group-hover:text-indigo-600 transition-colors">
                          {demoName || "Alex Morgan"}
                        </h2>
                        <p className="text-xs font-semibold text-indigo-600 tracking-wide mt-0.5">
                          {demoTitle || "Senior Full Stack Engineer"}
                        </p>
                      </div>
                      <div className="text-right text-[10px] text-slate-500 space-y-0.5 font-medium">
                        <p>alex@example.com • +1 (555) 234-5678</p>
                        <p>San Francisco, CA • linkedin.com/in/alex</p>
                      </div>
                    </div>
                  </div>

                  {/* Summary Section */}
                  <div className="mb-3">
                    <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-700 mb-1 border-b border-slate-200 pb-0.5">
                      Professional Summary
                    </h3>
                    <p className="text-[10.5px] text-slate-600 leading-relaxed">
                      {rolePresets[demoRole].summary}
                    </p>
                  </div>

                  {/* Experience Section */}
                  <div className="mb-3">
                    <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-700 mb-1 border-b border-slate-200 pb-0.5">
                      Work Experience
                    </h3>
                    <div>
                      <div className="flex justify-between items-baseline">
                        <span className="text-[11px] font-bold text-slate-900">
                          {rolePresets[demoRole].title}
                        </span>
                        <span className="text-[9.5px] text-slate-500 font-medium">
                          2022 — Present
                        </span>
                      </div>
                      <p className="text-[10px] text-indigo-600 font-medium mb-1">
                        {rolePresets[demoRole].experience}
                      </p>
                      <ul className="text-[10px] text-slate-600 space-y-0.5 list-disc pl-3 leading-relaxed">
                        <li>Led core product engineering scaling to 500k+ active users.</li>
                        <li>Architected resilient pipelines cutting latency and cloud costs by 35%.</li>
                      </ul>
                    </div>
                  </div>

                  {/* Skills Section */}
                  <div>
                    <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-700 mb-1 border-b border-slate-200 pb-0.5">
                      Skills & Technologies
                    </h3>
                    <p className="text-[10px] text-slate-700 font-medium">
                      {rolePresets[demoRole].skills}
                    </p>
                  </div>
                </div>

                {/* Card Hover Action Banner */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500">
                  <span className="flex items-center gap-1 text-emerald-600">
                    <CheckCircle2 size={14} /> 100% ATS-Compliant Layout
                  </span>
                  <span className="text-indigo-600 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Click to customize this resume →
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
