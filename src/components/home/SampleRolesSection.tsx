"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { 
  Code, 
  Layers, 
  TrendingUp, 
  DollarSign, 
  Palette, 
  GraduationCap, 
  ArrowRight, 
  CheckCircle2,
  FileCheck
} from "lucide-react";

export function SampleRolesSection() {
  const router = useRouter();

  const roleSamples = [
    {
      id: "tech",
      role: "Senior Software Engineer",
      category: "Technology & Engineering",
      icon: Code,
      color: "from-blue-500 to-indigo-600",
      skills: ["React", "TypeScript", "Next.js", "Node.js", "PostgreSQL", "Docker", "AWS"],
      summary: "Full Stack Engineer with 5+ years building scalable cloud apps. Led microservices migration cutting latency by 40% for 500k+ active users.",
      experienceHighlight: "Apex Cloud Solutions • Led squad of 6 engineers with 99.9% uptime CI/CD."
    },
    {
      id: "product",
      role: "Senior Product Manager",
      category: "Product & Strategy",
      icon: Layers,
      color: "from-emerald-500 to-teal-600",
      skills: ["Roadmap Prioritization", "User Research", "SQL", "A/B Testing", "Agile/Scrum"],
      summary: "Data-driven Product Manager with 6+ years scaling B2B SaaS. Grew enterprise ARR by $4.2M through streamlined customer onboarding.",
      experienceHighlight: "ScaleFlow Dynamics • Spearheaded product discovery & 0-to-1 launch."
    },
    {
      id: "marketing",
      role: "Growth Marketing Lead",
      category: "Marketing & Growth",
      icon: TrendingUp,
      color: "from-amber-500 to-orange-600",
      skills: ["Performance Marketing", "SEO/SEM", "HubSpot", "Google Analytics 4", "CRO"],
      summary: "Growth Marketer with 5+ years scaling multi-channel acquisition. Decreased blended CAC by 35% while doubling qualified pipeline.",
      experienceHighlight: "Vanguard Media • Managed $1.2M annual performance ad spend."
    },
    {
      id: "finance",
      role: "Senior Financial Analyst",
      category: "Finance & Accounting",
      icon: DollarSign,
      color: "from-purple-500 to-indigo-600",
      skills: ["Financial Modeling", "DCF Valuation", "Forecasting", "Tableau", "SAP/NetSuite"],
      summary: "Financial Analyst with 5+ years in corporate FP&A. Built automated rolling forecast models reducing monthly close cycle by 4 days.",
      experienceHighlight: "Apex Capital Partners • Managed $80M departmental budget models."
    },
    {
      id: "design",
      role: "Senior UI/UX Designer",
      category: "Design & Creative",
      icon: Palette,
      color: "from-pink-500 to-rose-600",
      skills: ["Figma", "Design Systems", "User Journeys", "Wireframing", "Prototyping"],
      summary: "Product Designer with 5+ years building accessible web & mobile systems. Redesigned core checkout flow increasing conversion by 28%.",
      experienceHighlight: "StudioCraft Interactive • Standardized multi-brand Figma token library."
    },
    {
      id: "fresher",
      role: "Entry Level / Graduate",
      category: "Freshers & Interns",
      icon: GraduationCap,
      color: "from-cyan-500 to-blue-600",
      skills: ["Python", "JavaScript", "SQL", "Data Structures", "Git", "Problem Solving"],
      summary: "Computer Science honors graduate with strong foundation in full-stack web development, algorithms, and collaborative agile engineering.",
      experienceHighlight: "University Projects & Capstone • Built real-time collaborative task app."
    }
  ];

  return (
    <section id="examples" className="w-full py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-bold mb-4">
            <FileCheck size={14} className="text-emerald-600" />
            <span>Multi-Profession Presets</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
            Pre-Filled Sample Resumes by Role
          </h2>
          <p className="text-base sm:text-lg text-gray-600">
            Never start from a blank page. Choose your profession to load vetted bullet points, metrics, and skill taxonomies.
          </p>
        </div>

        {/* Roles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roleSamples.map((sample) => {
            const Icon = sample.icon;
            return (
              <div
                key={sample.id}
                className="bg-[#FAFAFA] border border-gray-200/90 rounded-2xl p-6 flex flex-col justify-between hover:shadow-xl hover:border-indigo-200 transition-all group"
              >
                <div>
                  {/* Top Role Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${sample.color} text-white flex items-center justify-center shadow-sm`}>
                      <Icon size={20} />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                        {sample.role}
                      </h3>
                      <p className="text-xs text-gray-500 font-medium">
                        {sample.category}
                      </p>
                    </div>
                  </div>

                  {/* Summary Snippet */}
                  <div className="bg-white border border-gray-100 rounded-xl p-3.5 mb-4">
                    <p className="text-xs text-gray-700 leading-relaxed italic">
                      &ldquo;{sample.summary}&rdquo;
                    </p>
                  </div>

                  {/* Skills Pills */}
                  <div className="mb-4">
                    <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-2">
                      Key Skills
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {sample.skills.slice(0, 5).map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-[11px] font-semibold px-2.5 py-0.5 rounded-md bg-white border border-gray-200 text-gray-700"
                        >
                          {skill}
                        </span>
                      ))}
                      {sample.skills.length > 5 && (
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-gray-100 text-gray-500">
                          +{sample.skills.length - 5} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Bottom CTA */}
                <div className="pt-4 border-t border-gray-200/70 flex items-center justify-between">
                  <span className="text-xs text-gray-500 font-medium flex items-center gap-1">
                    <CheckCircle2 size={14} className="text-emerald-500" /> Pre-Formatted
                  </span>
                  <button
                    onClick={() => router.push(`/editor?preset=${sample.id === 'fresher' ? 'tech' : sample.id}`)}
                    className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-3.5 py-2 rounded-xl transition-all cursor-pointer"
                  >
                    <span>Use This Example</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
