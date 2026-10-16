import { images } from "./images";

export const about = {
  meta: {
    title: "About Royal Infra | 70+ Years of Real Estate Legacy",
    description: "Learn about Royal Infra's 70-year legacy under Sabil Umachagi and Vivekanand Maroor. Discover our heritage, vision, core values and client stories.",
  },
  crumb: "About Us",
  title: "Building Legacies Since Seven Decades",
  intro: "With 70+ years of entrepreneurial legacy, Royal Infra Realty stands as a beacon of trust, delivering premium residential plots and communities across Karnataka.",
  marquee: ["Trust", "Legacy", "Quality", "Innovation", "Growth"],
  storyEyebrow: "Our Story & Heritage",
  storyTitle: "From Trading Routes to Dream Routes",
  storyImage: { ...images.heritage, alt: "Building your own legacy with Royal Infra" },
  p1: "In 1950, when Karnataka was still Mysore State, the Umachagi family began their entrepreneurial odyssey with a simple belief: trust is the foundation of every great venture. Seven decades later, that belief has grown into a ₹200+ crore empire spanning transport, retail, banking, and dairy touching lives across Hubli, Dharwad, Belgaum, Gadag, and Bengaluru.",
  p2: "Royal Infra represents the culmination of this legacy where traditional values meet modern vision. We've transformed over 300 acres into thriving communities, delivered keys to 5,000+ families, and partnered with industry giants like Reliance, Aditya Birla, and Malabar Gold across 5.5 lakh square feet of premium commercial space.",
  figures: [
    { value: "₹200+ crore", label: "empire spanning transport, retail, banking, and dairy" },
    { value: "300+ acres", label: "transformed into thriving communities" },
    { value: "5,000+", label: "families handed their keys" },
    { value: "5.5 lakh sq. ft.", label: "of premium commercial space" },
  ],
  partners: "Reliance, Aditya Birla, and Malabar Gold",
  purposeEyebrow: "Purpose",
  purposeTitle: "Vision & Mission",
  vision: "To be Karnataka's most trusted real estate brand, recognized for delivering innovative, sustainable, and premium quality developments that exceed expectations and elevate lifestyles.",
  mission: "To deliver premium, approved properties that create lasting value for our clients, ensuring transparency, ethical practices, and customer satisfaction in every transaction.",
  valuesEyebrow: "Core Values",
  valuesTitle: "What Drives Us",
  values: [
    { title: "Trust & Transparency", text: "We believe in complete transparency in our operations, building lasting trust with every customer we serve." },
    { title: "Quality Infrastructure", text: "Our developments feature premium infrastructure, ensuring longevity and a high standard of living." },
    { title: "Customer-First", text: "Your happiness is our metric. We prioritize your needs and aspirations in every project we undertake." },
    { title: "Sustainable Living", text: "We are committed to eco-friendly practices that harmonize with nature and provide sustainable living spaces." },
  ],
  leadersEyebrow: "Leadership & Vision",
  leadersTitle: "Meet Our Leadership",
  leadersSub: "Guided by decades of industry leadership, entrepreneurial excellence, and an uncompromising dedication to trust and value creation.",
  leaders: [
    { name: "Mr. Sabil Umachagi", role: "Managing Director", image: images.directorSabil, bio: "With over two decades of expertise across acquisitions, logistics, leasing, finance, development, and legal, Mr. Sabil Umachagi has led the delivery of 300+ acres of real estate development. He has also spearheaded retail distribution of consumer goods and leased over 5,50,000 sq. ft. of retail space across family assets. His strategic vision continues to drive growth and innovation for the company." },
    { name: "Mr. Vivekanand Maroor", role: "Director, Operations", image: images.directorVivek, bio: "A seasoned leader with 40+ years of experience, Mr. Vivekanand Maroor brings unmatched expertise across industries such as real estate, steel, aluminum, power, pipelines, IT parks, hospitality, residential, nuclear, petrochemicals, and infrastructure. His proven leadership ensures project excellence, operational efficiency, and sustainable growth for the company." },
  ],
  testimonialsIntro: { eyebrow: "Testimonials", title: "What Our Clients Say", sub: "Discover how Royal Infra has helped homeowners and investors build their dreams on trust." },
  servicesIntro: { eyebrow: "What We Do", title: "What We Do" },
  services: [
    { title: "Plotted Developments", text: "Premium, strategically located plots with comprehensive amenities, clear titles, and government approvals.", image: images.svcPlots },
    { title: "Residential Apartments", text: "Modern living spaces designed for comfort, luxury, and community living in prime locations.", image: images.svcApts },
    { title: "Commercial Realty", text: "High-value commercial spaces that foster business growth and provide excellent investment returns.", image: images.svcCommercial },
    { title: "Channel Partner Investments", text: "Lucrative opportunities for partners to grow with us through strategic real estate investments.", image: images.svcPartners },
  ],
  cta: { title: "Ready to Invest in Your Future?", body: "Discover premium properties that align with your dreams and aspirations." },
};

export const locationsPage = {
  meta: {
    title: "Strategic Project Locations in Karnataka | Royal Infra Realty",
    description: "Explore Royal Infra's strategic real estate investment locations across Karnataka: Bengaluru, Mysuru, Gadag, and Gundlupet.",
  },
  crumb: "Locations",
  title: "Our Premium Locations Across Karnataka",
  intro: "Discover our curated real estate developments in the most promising cities and towns of Karnataka.",
  marquee: ["Bengaluru", "Mysuru", "Gadag", "Gundlupet"],
  footprintEyebrow: "Our Footprint",
  footprint: "We carefully select locations that offer a perfect blend of high investment potential, connectivity, and quality of life.",
  places: [
    { city: "Bengaluru", text: "Our corporate headquarters and center of operations. Leading strategic channel partner investments and commercial realty across the capital city.", image: images.locBengaluru },
    { city: "Mysuru", text: "Home to Palm Serenity — an 8-acre premium managed farmland resort community offering tranquility near the heritage city.", image: images.locMysuru, link: "View Palm Serenity", slug: "palm-serenity" as const },
    { city: "Gadag", text: "Showcasing Royal Park, a RERA-approved Gated Community in Malasamudra offering prestigious plotted developments with world-class amenities.", image: images.locGadag, link: "View Royal Park", slug: "royal-park" as const },
    { city: "Gundlupet", text: "Experience Dollars Colony, premium residential plots positioned at the gateway to the Nilgiris, blending natural beauty with investment security.", image: images.locGundlupet, link: "View Dollars Colony", slug: "dollars-colony" as const },
  ],
  whyEyebrow: "Why Karnataka",
  whyTitle: "The Real Estate Epicenter",
  why: "Karnataka provides one of the most stable and fast-growing real estate markets in India. Driven by IT infrastructure, educational institutions, tourism, and robust state planning, locations from Bengaluru to tier-2 cities present unmatched capital appreciation and rental yield prospects.",
  cta: { title: "Ready to Explore?", body: "Let us help you find the perfect property across our premium locations.", button: "Contact Our Experts" },
};

export const contactPage = {
  meta: {
    title: "Contact Royal Infra Realty | Bengaluru Office & Site Visits",
    description: "Get in touch with Royal Infra Realty. Book a guided site visit for Palm Serenity, Royal Park or Dollars Colony. Call +91 9187712547 or visit our Bengaluru office.",
  },
  crumb: "Contact",
  title: "Get in Touch With Royal Infra",
  intro: "We are here to help you measure happiness. Reach out for site visits, project details, or investment inquiries.",
  eyebrow: "Communication",
  h2: "Reach Out to Us",
  body: "Have questions about our plotted developments or wish to schedule a guided site visit? Our advisory team is available 6 days a week.",
  formTitle: "Send an Enquiry",
  projectOptions: ["Palm Serenity (Mysuru)", "Royal Park (Gadag)", "Dollars Colony (Gundlupet)", "Commercial Projects (Bellary)", "General Inquiry"],
  mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.892095361208!2d77.5960458!3d12.9787498!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae16719b0d24e1%3A0xc3b8398e4f52627e!2sInfantry%20Rd%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1690000000000!5m2!1sen!2sin",
  cta: { title: "Explore Our Properties", body: "Discover plots and residential communities across Karnataka." },
};
