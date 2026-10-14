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
  hero: {
    id: "hero-arch-portrait",
    src: heroArch,
    alt: "Luxury real estate development by Royal Infra",
    width: 1152,
    height: 1440,
    kind: "ai",
  },
  cta: { id: "cta-wide-vista", src: ctaVista, alt: "", width: 1920, height: 832, kind: "ai" },
  heritage: {
    id: "trading-routes-to-dream-routes",
    alt: "70+ Years of Royal Infra Legacy - From Trading Routes to Dream Routes",
    width: 1200,
    height: 1500,
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
    id: "ps-stand-in",
    src: svcPlots,
    alt: "Artist's impression of managed farm plots near Mysuru",
    width: 1024,
    height: 1280,
    kind: "ai",
    caption: "Artist's impression",
  },
  royalPark: {
    id: "rp-stand-in",
    src: aerial,
    alt: "Artist's impression of a green plotted layout with wide avenues in Gadag",
    width: 1024,
    height: 1280,
    kind: "ai",
    caption: "Artist's impression",
  },
  dollarsColony: {
    id: "dc-stand-in",
    src: nilgiri,
    alt: "Misty Nilgiri foothills near Gundlupet",
    width: 1024,
    height: 1280,
    kind: "ai",
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
