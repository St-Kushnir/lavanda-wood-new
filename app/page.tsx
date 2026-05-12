import { AboutSection } from "@/components/landing/about-section";
import { CanadianTechSection } from "@/components/landing/canadian-tech-section";
import { CtaSection } from "@/components/landing/cta-section";
import { HeroSection } from "@/components/landing/hero-section";
import { InternationalSection } from "@/components/landing/international-section";
import { ProcessSection } from "@/components/landing/process-section";
import { ProjectsSection } from "@/components/landing/projects-section";
import { SiteFooter } from "@/components/landing/site-footer";
import { SiteHeader } from "@/components/landing/site-header";
import { WhyWildLogSection } from "@/components/landing/why-wild-log-section";
import { RevealOnScroll } from "@/components/reveal-on-scroll";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <RevealOnScroll>
          <HeroSection />
        </RevealOnScroll>
        <RevealOnScroll>
          <AboutSection />
        </RevealOnScroll>
        <RevealOnScroll>
          <WhyWildLogSection />
        </RevealOnScroll>
        <RevealOnScroll>
          <CanadianTechSection />
        </RevealOnScroll>
        <RevealOnScroll>
          <ProjectsSection />
        </RevealOnScroll>
        <RevealOnScroll>
          <ProcessSection />
        </RevealOnScroll>
        <RevealOnScroll>
          <InternationalSection />
        </RevealOnScroll>
        <RevealOnScroll>
          <CtaSection />
        </RevealOnScroll>
      </main>
      <RevealOnScroll>
        <SiteFooter />
      </RevealOnScroll>
    </>
  );
}
