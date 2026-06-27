"use client";

import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import ZodiacStrip from "@/components/ZodiacStrip";
import WhyChooseAndHoroscope from "@/components/WhyChooseAndHoroscope";
import TestimonialsSection from "@/components/TestimonialsSection";
import BlogSection from "@/components/BlogSection";
import NewsletterBanner from "@/components/NewsletterBanner";
import Footer from "@/components/Footer";
import { HeroFormData } from "@/components/HeroSearchForm";

export default function Home() {
  function handleHeroSubmit(data: HeroFormData) {
    // Week 1-2 scope: capture the quick-search input here.
    // Full calculation + AI interpretation connect once the
    // Swiss Ephemeris engine and Claude API are wired in.
    console.log("Hero search submitted:", data);
  }

  return (
    <div className="min-h-screen">
      <NavBar />
      <HeroSection onFormSubmit={handleHeroSubmit} />
      <ServicesSection />
      <ZodiacStrip />
      <WhyChooseAndHoroscope />
      <TestimonialsSection />
      <BlogSection />
      <NewsletterBanner />
      <Footer />
    </div>
  );
}
