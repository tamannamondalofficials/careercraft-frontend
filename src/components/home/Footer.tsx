"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FileText, ShieldCheck, Mail, Heart, Lock, CheckCircle2, X } from "lucide-react";

export function Footer() {
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  return (
    <footer className="w-full bg-slate-950 text-slate-400 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5 text-white">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md">
                <FileText size={20} strokeWidth={2.5} />
              </div>
              <span className="font-extrabold text-xl tracking-tight">CareerCraft</span>
            </Link>
            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              The free, recruiter-approved ATS resume builder. Designed to help candidates create concise, 1-page resumes and land more interviews.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
              <ShieldCheck size={16} className="text-emerald-400 shrink-0" />
              <span>Privacy First • No third-party data tracking</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-bold text-white mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <a href="#templates" className="hover:text-white transition-colors">
                  Templates Gallery
                </a>
              </li>
              <li>
                <a href="#examples" className="hover:text-white transition-colors">
                  Sample Resumes
                </a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-white transition-colors">
                  Why CareerCraft
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Templates */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-bold text-white mb-4">
              Templates
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link href="/editor?template=executive" className="hover:text-white transition-colors">
                  Executive (Tech & Leadership)
                </Link>
              </li>
              <li>
                <Link href="/editor?template=modern" className="hover:text-white transition-colors">
                  Modern (2-Column Indigo)
                </Link>
              </li>
              <li>
                <Link href="/editor?template=minimal" className="hover:text-white transition-colors">
                  Minimal (Clean ATS)
                </Link>
              </li>
              <li>
                <Link href="/editor?template=compact" className="hover:text-white transition-colors">
                  Compact (High Density)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Trust & Support */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-bold text-white mb-4">
              Support & Contact
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <a
                  href="mailto:support@careercraft.app"
                  className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  <Mail size={15} />
                  <span>support@careercraft.app</span>
                </a>
              </li>
              <li>
                <button
                  onClick={() => setShowPrivacyModal(true)}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => setShowTermsModal(true)}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Terms of Service
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} CareerCraft. All rights reserved. 100% Free & Open ATS Builder.</p>
          <p className="flex items-center gap-1">
            Built for job seekers with <Heart size={13} className="text-rose-500 fill-rose-500" />
          </p>
        </div>
      </div>

      {/* Privacy Policy Modal */}
      {showPrivacyModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white text-slate-900 rounded-3xl max-w-lg w-full p-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div className="flex items-center gap-2 text-indigo-600 font-bold text-lg">
                <Lock size={20} />
                <span>Privacy Guarantee</span>
              </div>
              <button
                onClick={() => setShowPrivacyModal(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>
            <div className="py-4 text-xs sm:text-sm text-gray-600 space-y-3 leading-relaxed max-h-96 overflow-y-auto">
              <p>
                <strong>1. Data Ownership:</strong> You retain complete ownership of all data, contact details, work history, and educational background you enter.
              </p>
              <p>
                <strong>2. Local-First Drafts:</strong> Your resume draft is saved locally in your browser storage so you can build and edit offline.
              </p>
              <p>
                <strong>3. No Data Selling:</strong> We will never sell, rent, or monetize your resume text or personal details with third-party advertisers.
              </p>
              <p>
                <strong>4. PDF Generation:</strong> Document printing and PDF rendering occur securely in your browser client environment.
              </p>
            </div>
            <button
              onClick={() => setShowPrivacyModal(false)}
              className="w-full mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 rounded-xl cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Terms of Service Modal */}
      {showTermsModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white text-slate-900 rounded-3xl max-w-lg w-full p-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div className="flex items-center gap-2 text-indigo-600 font-bold text-lg">
                <FileText size={20} />
                <span>Terms of Service</span>
              </div>
              <button
                onClick={() => setShowTermsModal(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>
            <div className="py-4 text-xs sm:text-sm text-gray-600 space-y-3 leading-relaxed max-h-96 overflow-y-auto">
              <p>
                <strong>1. Free Usage:</strong> CareerCraft is free to use for personal resume creation and job applications.
              </p>
              <p>
                <strong>2. Accuracy:</strong> You are responsible for ensuring that all job history, credentials, and achievements you submit are accurate and truthful.
              </p>
              <p>
                <strong>3. Availability:</strong> The platform is provided as-is to help job seekers accelerate their career advancement.
              </p>
            </div>
            <button
              onClick={() => setShowTermsModal(false)}
              className="w-full mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 rounded-xl cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </footer>
  );
}
