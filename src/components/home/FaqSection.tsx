"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "Is CareerCraft really free? Are there hidden fees or watermarks?",
      a: "Yes, CareerCraft is 100% free. You can create unlimited resumes, use all 5 professional templates, and download print-ready high-resolution PDFs with zero watermarks and no hidden subscriptions."
    },
    {
      q: "Is my personal information safe and private?",
      a: "Absolutely. Your resume draft is automatically stored securely in your browser's local storage and synced only to your private database. We never sell your personal contact info, resume data, or employment history."
    },
    {
      q: "What makes these templates ATS-friendly?",
      a: "Applicant Tracking Systems (like Workday, Taleo, and Greenhouse) parse text sequentially. Our templates use single-column hierarchies, standard system-readable fonts, clean headers, and no nested graphics or floating tables that cause ATS parsing errors."
    },
    {
      q: "Can I edit my resume after closing the browser?",
      a: "Yes. CareerCraft autosaves your progress in real-time. Whenever you revisit the editor on the same device or submit to your database, your form fields and chosen template will be instantly restored."
    },
    {
      q: "Will my resume fit neatly onto a single A4 page?",
      a: "Yes. Our templates feature auto-calibrated margins, compact typography, and concise summary guidelines designed specifically to maximize content density on 1 page unless you choose to add 4+ extensive job histories."
    },
    {
      q: "Can I use CareerCraft for non-tech industries?",
      a: "Yes! CareerCraft supports 12+ industry categories including Software, Product Management, Marketing, Finance, Sales, Human Resources, Healthcare, Education, and Design."
    }
  ];

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="w-full py-20 bg-[#F8FAFC]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold mb-4">
            <HelpCircle size={14} className="text-indigo-600" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-base sm:text-lg text-gray-600">
            Clear, honest answers to help you build your resume with confidence.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden transition-all shadow-xs"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full py-5 px-6 text-left flex items-center justify-between gap-4 font-bold text-gray-900 hover:text-indigo-600 transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg">{faq.q}</span>
                  <ChevronDown
                    size={20}
                    className={`text-gray-400 transition-transform duration-200 shrink-0 ${
                      isOpen ? "rotate-180 text-indigo-600" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-gray-600 leading-relaxed border-t border-gray-100">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
