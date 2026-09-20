import { Navbar } from "@/components/home/Navbar";
import { HeroSection } from "@/components/home/HeroSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F7F8FA] flex flex-col items-center">
      <Navbar />
      <HeroSection />
    </div>
  );
}
