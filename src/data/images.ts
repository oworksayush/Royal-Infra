import heroArch from "@/assets/hero-arch-portrait.jpg";
import ctaVista from "@/assets/cta-wide-vista.jpg";
import svcPlots from "@/assets/service-plotted-development.jpg";
import svcApts from "@/assets/service-residential-apartments.jpg";
import svcCommercial from "@/assets/service-commercial-realty.jpg";
import svcPartners from "@/assets/service-channel-partners.jpg";
import aerial from "@/assets/aerial-layout-golden-hour.jpg";
import nilgiri from "@/assets/nilgiri-foothills-mist.jpg";
import locBlr from "@/assets/loc-bengaluru.jpg";
import locMys from "@/assets/loc-mysuru.jpg";
import locGadag from "@/assets/loc-gadag.jpg";
import pool from "@/assets/life-pool-dusk.jpg";
import sabil from "@/assets/director-sabil-umachagi.jpeg";
import vivek from "@/assets/director-vivekanand-maroor.jpeg";
import logoImg from "@/assets/Royal_Infra_Logo.png";
import royalInfraHero from "@/assets/Royal Infra Hero.png";
import royalInfraMain from "@/assets/Royal Infra Main.png";

// Real Palm Serenity photos
import psMain from "@/assets/Palm Serenity/Palm Serenity Main.png";
import psView from "@/assets/Palm Serenity/Palm Serenity View.png";
import psHouse from "@/assets/Palm Serenity/Palm Serenity House.png";
import ps1 from "@/assets/Palm Serenity/Palm Serenity 1.webp";
import ps2 from "@/assets/Palm Serenity/Palm Serenity 2.webp";
import ps3 from "@/assets/Palm Serenity/Palm Serenity 3.webp";
import ps4 from "@/assets/Palm Serenity/Palm Serenity 4.webp";
import ps5 from "@/assets/Palm Serenity/Palm Serenity 5.webp";
import ps6 from "@/assets/Palm Serenity/Palm Serenity 6.webp";

// Real Royal Park photos
import rpMainHero from "@/assets/Royal Park/royal-park-Main Hero.png";
import rpHero from "@/assets/Royal Park/royal-park-Hero.png";
import rpMain from "@/assets/Royal Park/royal-park-Main.png";
import rpView from "@/assets/Royal Park/royal-park-view.png";
import rpFamilyPark from "@/assets/Royal Park/royal-park-family-park.png";
import rp1 from "@/assets/Royal Park/royal-park1.png";
import rp2 from "@/assets/Royal Park/royal-park-2.png";
import rp3 from "@/assets/Royal Park/royal-park-3.png";
import rp5 from "@/assets/Royal Park/royal-park-5.png";
import rp6 from "@/assets/Royal Park/royal-park-6.png";

// Real Dollars Colony photos
import dcMainHero from "@/assets/Dollers Colony/dollars-colony-Main Hero.png";
import dcMain from "@/assets/Dollers Colony/dollars-colony-main.png";
import dcPlots from "@/assets/Dollers Colony/dollars-colony-Plots.png";
import dcAerial from "@/assets/Dollers Colony/Aerial-Gated-Community-Masterplan.webp";
import dcDrone from "@/assets/Dollers Colony/dollars-colony-drone-overview.png";
import dcMountain from "@/assets/Dollers Colony/dollars-colony-mountain-landscape.png";
import dcSignboard from "@/assets/Dollers Colony/dollars-colony-signboard.jpg";
import dcSitePlots1 from "@/assets/Dollers Colony/dollars-colony-site-plots-1.jpg";

export type ImageEntry = {
  id: string;
  src?: string; // undefined = original photo still to be uploaded (placeholder)
  alt: string;
  width: number;
  height: number;
  kind: "original" | "ai";
  caption?: string;
};

export const images = {
  logo: {
    id: "royal-infra-logo",
    src: logoImg,
    alt: "Royal Infra Realty",
    width: 600,
    height: 300,
    kind: "original" as const,
  },
  hero: {
    id: "royal-infra-hero",
    src: royalInfraHero,
    alt: "Luxury real estate development by Royal Infra",
    width: 1672,
    height: 941,
    kind: "original",
  },
  cta: { id: "cta-wide-vista", src: ctaVista, alt: "", width: 1920, height: 832, kind: "ai" },
  heritage: {
    id: "royal-infra-main",
    src: royalInfraMain,
    alt: "70+ Years of Royal Infra Legacy - From Trading Routes to Dream Routes",
    width: 1024,
    height: 1536,
    kind: "original",
  },
  royalInfraMain: {
    id: "royal-infra-main",
    src: royalInfraMain,
    alt: "70+ Years of Royal Infra Legacy - From Trading Routes to Dream Routes",
    width: 1024,
    height: 1536,
    kind: "original",
  },
  svcPlots: {
    id: "service-plotted-development",
    src: svcPlots,
    alt: "Demarcated residential plots with stone boundary markers",
    width: 1024,
    height: 1280,
    kind: "ai",
  },
  svcApts: {
    id: "service-residential-apartments",
    src: svcApts,
    alt: "Modern low-rise residential facade at dusk",
    width: 1024,
    height: 1280,
    kind: "ai",
  },
  svcCommercial: {
    id: "service-commercial-realty",
    src: svcCommercial,
    alt: "Contemporary retail arcade with shaded walkways",
    width: 1024,
    height: 1280,
    kind: "ai",
  },
  svcPartners: {
    id: "service-channel-partners",
    src: svcPartners,
    alt: "Hands over an architectural site-plan model",
    width: 1024,
    height: 1280,
    kind: "ai",
  },
  palmSerenity: {
    id: "palm-serenity-main",
    src: psMain,
    alt: "Palm Serenity - 8-Acre Boutique Farm Resort & Managed Farmland Community in Mysuru",
    width: 1448,
    height: 687,
    kind: "original",
  },
  palmSerenityView: {
    id: "palm-serenity-view",
    src: psView,
    alt: "Palm Serenity - Scenic Farmland View & Coconut Groves",
    width: 846,
    height: 386,
    kind: "original",
  },
  palmSerenityHouse: {
    id: "palm-serenity-house",
    src: psHouse,
    alt: "Palm Serenity - Weekend Farmhouse & Estate Living",
    width: 598,
    height: 389,
    kind: "original",
  },
  palmSerenity1: {
    id: "palm-serenity-1",
    src: ps1,
    alt: "Palm Serenity - Lush Green Estate Avenues",
    width: 343,
    height: 269,
    kind: "original",
  },
  palmSerenity2: {
    id: "palm-serenity-2",
    src: ps2,
    alt: "Palm Serenity - Boutique Farm Plots & Landscaped Enclave",
    width: 221,
    height: 263,
    kind: "original",
  },
  palmSerenity3: {
    id: "palm-serenity-3",
    src: ps3,
    alt: "Palm Serenity - Organic Plantation & Sandalwood Groves",
    width: 221,
    height: 261,
    kind: "original",
  },
  palmSerenity4: {
    id: "palm-serenity-4",
    src: ps4,
    alt: "Palm Serenity - Panoramic Natural Vistas",
    width: 465,
    height: 204,
    kind: "original",
  },
  palmSerenity5: {
    id: "palm-serenity-5",
    src: ps5,
    alt: "Palm Serenity - Resort Lifestyle & Recreation Grounds",
    width: 768,
    height: 576,
    kind: "original",
  },
  palmSerenity6: {
    id: "palm-serenity-6",
    src: ps6,
    alt: "Palm Serenity - Gated Community & Serene Countryside",
    width: 710,
    height: 437,
    kind: "original",
  },
  royalPark: {
    id: "royal-park-main-hero",
    src: rpMainHero,
    alt: "Royal Park - Prestigious Gated Plotted Community in Malasamudra, Gadag",
    width: 1672,
    height: 941,
    kind: "original",
  },
  royalParkView: {
    id: "royal-park-view",
    src: rpView,
    alt: "Royal Park - Elevated Township Overview & Open Greenery",
    width: 1448,
    height: 1086,
    kind: "original",
  },
  royalParkFamilyPark: {
    id: "royal-park-family-park",
    src: rpFamilyPark,
    alt: "Royal Park - Central Family Park & Landscaped Lawns",
    width: 1448,
    height: 1086,
    kind: "original",
  },
  royalParkHero: {
    id: "royal-park-hero",
    src: rpHero,
    alt: "Royal Park - Grand Entrance Arch & Gated Township Avenue",
    width: 1672,
    height: 941,
    kind: "original",
  },
  royalParkMain: {
    id: "royal-park-main",
    src: rpMain,
    alt: "Royal Park - Master Township Layout & Infrastructure",
    width: 1672,
    height: 941,
    kind: "original",
  },
  royalPark1: {
    id: "royal-park-1",
    src: rp1,
    alt: "Royal Park - Wide 9m Asphalt Avenues & Tree Lines",
    width: 464,
    height: 205,
    kind: "original",
  },
  royalPark2: {
    id: "royal-park-2",
    src: rp2,
    alt: "Royal Park - Planned Residential Plots & Demarcated Layout",
    width: 462,
    height: 216,
    kind: "original",
  },
  royalPark3: {
    id: "royal-park-3",
    src: rp3,
    alt: "Royal Park - Premium Plotted Development Enclave",
    width: 363,
    height: 273,
    kind: "original",
  },
  royalPark5: {
    id: "royal-park-5",
    src: rp5,
    alt: "Royal Park - Children's Play Area & Recreation Zones",
    width: 221,
    height: 261,
    kind: "original",
  },
  royalPark6: {
    id: "royal-park-6",
    src: rp6,
    alt: "Royal Park - Serene Countryside Vistas & Township Perimeter",
    width: 710,
    height: 437,
    kind: "original",
  },
  dollarsColony: {
    id: "dollars-colony-main-hero",
    src: dcMainHero,
    alt: "Dollars Colony - Premium Plotted Development at the Gateway to Nilgiris, Gundlupet",
    width: 1672,
    height: 941,
    kind: "original",
  },
  dollarsColonyMain: {
    id: "dollars-colony-main",
    src: dcMain,
    alt: "Dollars Colony - Master Township Layout & Infrastructure",
    width: 1672,
    height: 941,
    kind: "original",
  },
  dollarsColonyPlots: {
    id: "dollars-colony-plots",
    src: dcPlots,
    alt: "Dollars Colony - Demarcated Residential Plots with Mountain Views",
    width: 1672,
    height: 941,
    kind: "original",
  },
  dollarsColonyAerial: {
    id: "dollars-colony-aerial",
    src: dcAerial,
    alt: "Dollars Colony - Aerial Gated Community Masterplan",
    width: 1536,
    height: 1024,
    kind: "original",
  },
  dollarsColonyDroneOverview: {
    id: "dollars-colony-drone-overview",
    src: dcDrone,
    alt: "Dollars Colony - Drone Aerial Overview & Green Corridors",
    width: 1672,
    height: 941,
    kind: "original",
  },
  dollarsColonyMountain: {
    id: "dollars-colony-mountain-landscape",
    src: dcMountain,
    alt: "Dollars Colony - Scenic Nilgiri Foothills Landscape View",
    width: 1448,
    height: 1086,
    kind: "original",
  },
  dollarsColonySignboard: {
    id: "dollars-colony-signboard",
    src: dcSignboard,
    alt: "Dollars Colony - Clear Title DTCP Approved On-Site Signboard",
    width: 1024,
    height: 681,
    kind: "original",
  },
  dollarsColonySitePlots1: {
    id: "dollars-colony-site-plots-1",
    src: dcSitePlots1,
    alt: "Dollars Colony - On-Site Plot Boundary Markers and Internal Layout",
    width: 1024,
    height: 681,
    kind: "original",
  },
  locBengaluru: {
    id: "loc-bengaluru",
    src: locBlr,
    alt: "Tree-lined avenue with modern offices in Bengaluru",
    width: 960,
    height: 1280,
    kind: "ai",
  },
  locMysuru: {
    id: "loc-mysuru",
    src: locMys,
    alt: "Palms and green farmland on the outskirts of Mysuru",
    width: 960,
    height: 1280,
    kind: "ai",
  },
  locGadag: {
    id: "loc-gadag",
    src: locGadag,
    alt: "Granite boulders and a planned township road near Gadag",
    width: 960,
    height: 1280,
    kind: "ai",
  },
  locGundlupet: {
    id: "loc-gundlupet",
    src: nilgiri,
    alt: "Sunflower fields and Nilgiri foothills near Gundlupet",
    width: 1024,
    height: 1280,
    kind: "ai",
  },
  pool: {
    id: "life-pool-dusk",
    src: pool,
    alt: "Artist's impression of a resort-style pool among palms at dusk",
    width: 1536,
    height: 1024,
    kind: "ai",
    caption: "Artist's impression",
  },
  aerial: {
    id: "aerial-layout-golden-hour",
    src: aerial,
    alt: "Artist's impression of a green plotted layout with open parkland",
    width: 1024,
    height: 1280,
    kind: "ai",
    caption: "Artist's impression",
  },
  directorSabil: {
    id: "director-sabil-umachagi",
    src: sabil,
    alt: "Mr. Sabil Umachagi - Managing Director, Royal Infra",
    width: 800,
    height: 1000,
    kind: "original",
  },
  directorVivek: {
    id: "director-vivekanand-maroor",
    src: vivek,
    alt: "Mr. Vivekanand Maroor - Director, Operations, Royal Infra",
    width: 800,
    height: 1000,
    kind: "original",
  },
} satisfies Record<string, ImageEntry>;

/** Original photo still to be uploaded by the client. */
export const original = (id: string, alt: string): ImageEntry => ({
  id,
  alt,
  width: 1200,
  height: 900,
  kind: "original",
});
