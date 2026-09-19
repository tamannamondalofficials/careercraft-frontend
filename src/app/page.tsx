import Link from "next/link";
import { FileText, LayoutTemplate, Zap, Download } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F7F8FA] flex flex-col items-center">
      {/* Navbar */}
      <header className="w-full max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2 text-indigo-600">
          <FileText size={28} strokeWidth={2.5} />
          <span className="font-extrabold text-2xl tracking-tight">CareerCraft</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/editor" className="text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors">
            Templates
          </Link>
          <Link href="/editor" className="text-sm font-semibold bg-indigo-600 text-white px-5 py-2.5 rounded-full hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg">
            Go to Editor
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="w-full max-w-6xl mx-auto px-6 pt-20 pb-24 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-sm font-medium mb-6">
          <Zap size={16} className="fill-indigo-600" />
          <span>The #1 AI Resume Builder</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6 max-w-4xl">
          Build a professional resume in <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">5 minutes</span>
        </h1>
        
        <p className="text-xl text-gray-500 max-w-2xl mb-10 leading-relaxed">
          Create an ATS-friendly, beautifully designed resume with our live split-screen editor. Export to PDF instantly.
        </p>
        
        <Link 
          href="/editor" 
          className="group flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white text-lg font-semibold px-8 py-4 rounded-full transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
        >
          Create My Resume
          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
        
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
    </div>
  );
}
