import { images } from "./images";
import { site } from "./site";

export const hero = {
  kicker:
    "Premium plots, managed farmland and gated communities in Bengaluru, Mysuru, Gadag and Gundlupet",
  title: "Where 70 Years of Trust Meets Tomorrow's Dreams.",
  body: "Discover premium residential plots, managed farmlands, and gated communities across Karnataka's most promising locations.",
};

export const stats = [
  { value: 70, suffix: "+", label: "Years of Legacy" },
  { value: 3, suffix: "", label: "Premium Projects" },
  { value: 4, suffix: "", label: "Key Markets" },
];

export const ticker = [
  "Bengaluru", "Mysuru", "Gadag", "Gundlupet",
  "Premium Plots", "Managed Farmland", "Gated Communities", "RERA Approved",
];

export const aboutIntro = {
  eyebrow: "About Royal Infra",
  title: "Your Dream. Our Foundation. Infinite Possibilities.",
  p1: "For over 70 years, Royal Infra has built an entrepreneurial legacy grounded in trust, quality, and commitment. We don't just develop properties; we cultivate communities and nurture lifestyles.",
  p2: "Our operations span across the most promising locations in Karnataka—from the bustling heart of Bengaluru to the serene landscapes of Mysuru, Gadag, and Gundlupet. At Royal Infra, we measure our success not just by the square footage developed, but by the happiness and prosperity of our customers.",
  link: "Learn More About Us",
};

export const projectsIntro = { eyebrow: "Our Projects", title: "Premium Real Estate Across Karnataka" };

export const homeProjects = [
  { slug: "palm-serenity", name: "Palm Serenity", tag: "Pre-Launch", location: "Mysuru, Karnataka", text: "8-acre boutique sanctuary with premium managed farm plots starting from 6,024 sq. ft.", image: images.palmSerenity, bg: "var(--rosewood)" },
  { slug: "royal-park", name: "Royal Park", tag: "RERA Approved", location: "Gadag, Karnataka", text: "Luxurious gated community offering modern living spaces with premium amenities.", image: images.royalPark, bg: "var(--olive)" },
  { slug: "dollars-colony", name: "Dollars Colony", tag: "Now Open", location: "Gundlupet, Karnataka", text: "Premium residential plots strategically located for exceptional growth and living.", image: images.dollarsColony, bg: "var(--charcoal)" },
] as const;

export const whyIntro = { eyebrow: "Why Choose Us", title: "Built on Trust, Designed for Growth" };
export const pillars = [
  { title: "70+ Year Legacy", text: "A rich history of entrepreneurial success and steadfast commitment to delivering unparalleled quality.", bg: "bg-charcoal", icon: "arch" },
  { title: "RERA Approved", text: "Ensuring complete transparency, security, and peace of mind with all statutory compliances met.", bg: "bg-rosewood", icon: "shield" },
  { title: "Premium Locations", text: "Strategic project acquisitions in high-growth corridors maximizing your long-term investment returns.", bg: "bg-olive", icon: "pin" },
  { title: "End-to-End Support", text: "Comprehensive assistance from initial consultation to legal registration and documentation handover.", bg: "bg-charcoal", icon: "hands" },
] as const;

export const servicesIntro = { eyebrow: "What We Do", title: "Comprehensive Real Estate Solutions" };
export const services = [
  { title: "Plotted Developments", text: "Premium residential plots designed with infrastructure and modern amenities to build your dream home.", image: images.svcPlots },
  { title: "Residential Apartments", text: "Luxurious living spaces in prime locations crafted for contemporary lifestyles and comfort.", image: images.svcApts },
  { title: "Commercial Realty", text: "Strategic commercial spaces and retail hubs optimized for business growth and high footfalls.", image: images.svcCommercial },
  { title: "Channel Partner Investments", text: "Lucrative partnership opportunities with high ROI in our premium real estate ventures.", image: images.svcPartners },
];

export const whereWeBuild = {
  eyebrow: "Where we build",
  title: "Four markets, one standard of trust",
  items: [
    { city: "Mysuru", text: "Home to Palm Serenity — an 8-acre premium managed farmland resort community offering tranquility near the heritage city.", link: "Plots and managed farmland in Mysuru: Palm Serenity", to: "/projects/palm-serenity" },
    { city: "Gadag", text: "Showcasing Royal Park, a RERA-approved Gated Community in Malasamudra offering prestigious plotted developments with world-class amenities.", link: "RERA-approved gated plotted community in Gadag: Royal Park", to: "/projects/royal-park" },
    { city: "Gundlupet", text: "Experience Dollars Colony, premium residential plots positioned at the gateway to the Nilgiris, blending natural beauty with investment security.", link: "Residential plots in Gundlupet: Dollars Colony", to: "/projects/dollars-colony" },
    { city: "Bengaluru", text: "Our corporate headquarters and center of operations. Leading strategic channel partner investments and commercial realty across the capital city.", link: "Royal Infra headquarters in Bengaluru: contact the team", to: "/contact-us" },
  ],
} as const;

export const pathIntro = { eyebrow: "Your path to ownership", title: "From first conversation to handover" };
export const steps = [
  { title: "Consultation", text: "Speak with our property experts about your goals, whether a weekend home, managed farmland or a long-term investment, and we will match you to the right project and plot." },
  { title: "Guided site visit", text: "Walk the land with our team at Palm Serenity, Royal Park or Dollars Colony. Call, message on WhatsApp or send an enquiry and we will arrange your visit." },
  { title: "Documentation and updates", text: "We share clear documentation and keep you informed with timely updates at every step, so the process stays transparent from start to finish." },
  { title: "Registration support", text: "Our team assists with legal registration and the paperwork that comes with it, offering comprehensive support through to completion." },
  { title: "Handover and ongoing care", text: "We complete the documentation handover and, for our managed farmland projects, continue with ongoing property management long after you take ownership." },
];

export const testimonialsIntro = {
  eyebrow: "Testimonials",
  title: "What Our Clients Say About Us",
  sub: "Discover why hundreds of families and investors trust Royal Infra with their property investments.",
};
export const testimonials = [
  { quote: "As an investor, I look for clarity, credibility, and growth potential—Royal Infra delivers all three. Their projects are in high-growth zones, legally sound, and managed by a team that truly understands real estate. My investment has already appreciated, and I'm planning my next with them.", name: "Mr. Vinay K.", meta: "Bengaluru • Investor", initials: "VK" },
  { quote: "Buying property can be stressful, but with Royal Infra, everything felt effortless and honest. From clear documentation to timely updates, their team ensured complete transparency at every step. We felt like we were working with family, not just a developer. Our Royal Park plot isn't just an investment, it's the foundation of our dream home.", name: "Ramesh & Kavitha B.", meta: "Bengaluru • Royal Park Resident", initials: "RK" },
  { quote: "Living abroad, I was initially hesitant about buying property back home. Royal Infra made the entire process seamless, from virtual tours to documentation and handover. Their integrity and professionalism are rare in today's market. I trust them completely and would recommend Royal Infra to anyone looking for peace of mind.", name: "Priya S.", meta: "Dubai, UAE • NRI Investor", initials: "PS" },
  { quote: "What drew us to Royal Infra was their attention to detail. The layout, open spaces, and thoughtful planning made us instantly fall in love. It's not just about plots or buildings—they've created communities. We can't wait to build our first home here and start the next chapter of our lives.", name: "Rahul & Sneha D.", meta: "Mysuru • Homeowner", initials: "RS" },
];

export const faqIntro = { eyebrow: "Frequently Asked Questions", title: "Everything You Need to Know" };
export const faqs: { q: string; a: string; needsReview?: boolean }[] = [
  { q: "What types of properties does Royal Infra offer?", a: "We offer a diverse portfolio including plotted developments, premium managed farmland, residential apartments, and commercial realty spaces." },
  { q: "Where are your projects located?", a: "Our projects are strategically situated in high-growth corridors across Karnataka, including Mysuru, Gadag, and Gundlupet, with our headquarters in Bengaluru." },
  { q: "Are your projects RERA approved?", a: "Yes, our projects comply with regulatory standards. For example, Royal Park is fully RERA approved (registration number PRM/KA/RERA/1251/446/AG/230412/003572)." },
  { q: "What are the plot sizes and pricing for Palm Serenity?", a: "Managed farm plots at Palm Serenity start from 6,024 sq. ft., with pricing and payment plans available on request with a minimum plot size of 6,024 sq. ft." },
  { q: "How can I schedule a site visit?", a: `You can easily schedule a visit by calling us at ${site.phone}, messaging on WhatsApp at ${site.whatsapp}, or by filling out the form on our Contact Us page.` },
  { q: "Do you provide post-purchase support?", a: "Yes, we provide extensive post-purchase support, including documentation assistance, registration support, and ongoing property management for our managed farmland projects." },
  { q: "What is managed farmland?", a: "Managed farmland is land you own while our team handles professional upkeep of sandalwood and fruit tree plantations, inside a gated, guarded enclave, as at Palm Serenity in Mysuru.", needsReview: true },
  { q: "Which Royal Infra project is RERA approved?", a: "Royal Park in Gadag is RERA approved under registration number PRM/KA/RERA/1251/446/AG/230412/003572. Ask our team about the approval and title status of any other project.", needsReview: true },
  { q: "Is Palm Serenity open for booking?", a: "Palm Serenity is currently pre-launch. Contact our team for exclusive pre-launch pricing and site visits.", needsReview: true },
  { q: "Where is Royal Infra's office?", a: `Our office is at ${site.address}. Our advisory team is available 6 days a week.`, needsReview: true },
  { q: "Do you work with NRI investors?", a: "Yes. NRI clients have completed the process remotely, from virtual tours through documentation and handover. Contact our team to discuss your situation.", needsReview: true },
];

export const cta = {
  title: "Start Your Investment Journey Today",
  body: "Connect with our property experts to find the perfect plot for your future.",
};
