import { BenefitSection } from "@/components/component/benefit-section";
import { CallToAction } from "@/components/component/call-to-action";
import { FAQ } from "@/components/component/faq";
import { FeatureSection } from "@/components/component/feature-section";
import { HeroSection } from "@/components/component/hero-section";
import { HowItWorkSection } from "@/components/component/how-it-work-section";
import { TestimonialSection } from "@/components/component/testimonial-section";
import React from "react";

const Homepage = async () => {
  return (
    <div>
      <HeroSection />
      <FeatureSection />
      <HowItWorkSection />
      <BenefitSection />
      <TestimonialSection />
      <CallToAction />
      <FAQ />
    </div>
  );
};

export default Homepage;
