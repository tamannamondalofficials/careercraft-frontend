import { 
  Navbar, 
  HeroSection, 
  SocialProofSection, 
  TemplateGallerySection, 
  SampleRolesSection, 
  WhyUsSection, 
  WritingTipsSection, 
  FaqSection, 
  BottomCtaSection, 
  Footer 
} from "@/components/home";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* 1. Header & Navigation */}
      <Navbar />

      {/* 2. Hero Section with Live Split-Screen Interactive Product Demo */}
      <HeroSection />

      {/* 3. Social Proof, Stats, and Verified Testimonials */}
      <SocialProofSection />

      {/* 4. Recruiter-Approved 1-Page Templates Gallery */}
      <TemplateGallerySection />

      {/* 5. Pre-Filled Multi-Profession Sample Resumes */}
      <SampleRolesSection />

      {/* 6. Why Us / Comparison Table vs Paid Builders & MS Word */}
      <WhyUsSection />

      {/* 7. Actionable Resume Writing Formulas & Best Practices */}
      <WritingTipsSection />

      {/* 8. Trust & Common Questions (FAQ Accordion) */}
      <FaqSection />

      {/* 9. High-Impact Bottom CTA */}
      <BottomCtaSection />

      {/* 10. Footer with Legal, Contact & Security */}
      <Footer />
    </div>
  );
}
