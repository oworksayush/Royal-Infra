import {
  AboutIntro,
  Cta,
  Faq,
  Hero,
  PathToOwnership,
  ProjectsGallery,
  Services,
  Testimonials,
  Ticker,
  WhereWeBuild,
  WhyChoose,
} from "@/components/home/sections";
import { HomeEnquiryPopup } from "@/components/home/HomeEnquiryPopup";

export function HomePage() {
  return (
    <>
      <Hero />
      <Ticker />
      <AboutIntro />
      <ProjectsGallery />
      <WhyChoose />
      <Services />
      <WhereWeBuild />
      <PathToOwnership />
      <Testimonials />
      <Faq />
      <Cta />
      <HomeEnquiryPopup />
    </>
  );
}
