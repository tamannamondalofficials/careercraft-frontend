"use client";

import { FileText } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  const router = useRouter();
  return (
    <header className="w-full max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
      <div className="flex items-center gap-2 text-indigo-600">
        <FileText size={28} strokeWidth={2.5} />
        <span className="font-extrabold text-2xl tracking-tight">CareerCraft</span>
      </div>
      <div className="flex items-center gap-4">
        <Button onClick={() => router.push("/editor")} variant="secondary" className="text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors bg-transparent border-none shadow-none">
          Templates
        </Button>
        <Button onClick={() => router.push("/editor")} className="text-sm font-semibold bg-indigo-600 text-white px-5 py-2.5 rounded-full hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg">
          Go to Editor
        </Button>
      </div>
    </header>
  );
}
