import {
  AboutIntro,
  Cta,
  Faq,
  FestiveOffers,
  Hero,
  PathToOwnership,
  ProjectsGallery,
  Services,
  Testimonials,
  Ticker,
  WhereWeBuild,
  WhyChoose,
} from "@/components/home/sections";

export function HomePage() {
  return (
    <>
      <Hero />
      <Ticker />
      <AboutIntro />
      <FestiveOffers />
      <ProjectsGallery />
      <WhyChoose />
      <Services />
      <WhereWeBuild />
      <PathToOwnership />
      <Testimonials />
      <Faq />
      <Cta />
    </>
  );
}
