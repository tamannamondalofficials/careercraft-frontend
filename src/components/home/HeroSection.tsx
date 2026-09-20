"use client";

import { useRouter } from "next/navigation";
import { Zap } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function HeroSection() {
  const router = useRouter();

  return (
    <main className="w-full max-w-6xl mx-auto px-6 pt-28 pb-32 flex flex-col items-center text-center">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-sm font-medium mb-8">
        <Zap size={16} className="fill-indigo-600" />
        <span>The #1 AI Resume Builder</span>
      </div>
      
      <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6 max-w-4xl">
        Build a professional resume in <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">5 minutes</span>
      </h1>
      
      <p className="text-xl text-gray-500 max-w-2xl mb-10 leading-relaxed">
        Create an ATS-friendly, beautifully designed resume with our live split-screen editor. Export to PDF instantly.
      </p>
      
      <Button 
        onClick={() => router.push("/editor")} 
        className="group flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white text-lg font-semibold px-16 py-5 mt-6 mb-10 rounded-full transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
      >
        Create My Resume
        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </Button>
      
      {/* Visual Preview */}
      <div className="mt-20 relative w-full max-w-5xl">
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-[2rem] blur opacity-20"></div>
        <div className="relative bg-white border border-gray-200 rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row h-[500px] md:h-[600px] w-full">
           <img 
             src="/mockup.jpg" 
             alt="Split-screen Editor Preview" 
             className="w-full h-full object-cover object-center"
           />
        </div>
      </div>
    </main>
  );
}
