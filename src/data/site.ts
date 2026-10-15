export const SITE_URL = "https://royalinfrarealty.com";

export const site = {
  name: "Royal Infra Realty",
  tagline: "Measure Happiness",
  address: "310, 3rd Floor Arcade, #92 Infantry Road, Bengaluru - 560 001",
  phone: "+91 98806 40007",
  phoneHref: "tel:+919880640007",
  email: "Contact@royalinfra.com",
  whatsapp: "+91 98220 91295",
  whatsappHref: "https://wa.me/919822091295",
  footerText:
    "70+ years of entrepreneurial legacy dedicated to building premium real estate across Karnataka.",
  copyright: "© 2026 Royal Infra Realty. All rights reserved. Made with ❤ by peoplecom",
  social: [
    { label: "Facebook", href: "https://www.facebook.com/RoyalInfraRealty" },
    { label: "Instagram", href: "https://www.instagram.com/royalinfrarealty/" },
    { label: "X", href: "https://x.com/royal14330" },
    { label: "Threads", href: "https://www.threads.com/@royalinfrarealty" },
    { label: "YouTube", href: "https://www.youtube.com/@RoyalInfraRealty" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/royal-infra-realty/" },
  ],
  googleBusinessProfileUrl: "",
};

export const nav = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about-us" },
  { label: "Projects", to: "/projects" },
  { label: "Locations", to: "/locations" },
  { label: "Gallery", to: "/gallery" },
  { label: "Contact", to: "/contact-us" },
] as const;

export const quickLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about-us" },
  { label: "Projects", to: "/projects" },
  { label: "Locations", to: "/locations" },
  { label: "Gallery", to: "/gallery" },
  { label: "Contact", to: "/contact-us" },
] as const;
