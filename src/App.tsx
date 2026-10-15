import { useCallback, useEffect, useState, type CSSProperties } from "react";
import "@fontsource-variable/fraunces";
import "@fontsource-variable/instrument-sans";

import { FloatingActions, Footer, Header, Preloader, ScrollProgress, SmoothScroll } from "@/components/layout/chrome";
import { about, contactPage, locationsPage } from "@/data/pages";
import { getProject, projectsPage } from "@/data/projects";
import { matchRoute } from "@/lib/route-match";
import { SITE_URL } from "@/data/site";
import { AboutPage } from "@/pages/AboutPage";
import { ContactPage } from "@/pages/ContactPage";
import { HomePage } from "@/pages/HomePage";
import { LocationsPage } from "@/pages/LocationsPage";
import { PrivacyPolicyPage } from "@/pages/PrivacyPolicyPage";
import { ProjectPage } from "@/pages/ProjectPage";
import { ProjectsPage } from "@/pages/ProjectsPage";
import { TermsPage } from "@/pages/TermsPage";
import { GalleryPage } from "@/pages/GalleryPage";
import { SiteEnquiryPopup } from "@/components/SiteEnquiryPopup";
import "./styles.css";

const homeMeta = {
  title: "Royal Infra Realty | Plots & Managed Farmland in Karnataka",
  description:
    "Royal Infra Realty brings 70+ years of trust to premium residential plots, managed farmland & gated communities across Bengaluru, Mysuru, Gadag & Gundlupet.",
};

export default function App() {
  const [pathname, setPathname] = useState(() => window.location.pathname);
  const route = matchRoute(pathname);
  const [footerHeight, setFooterHeight] = useState(0);
  const onFooterHeight = useCallback((height: number) => setFooterHeight(height), []);

  // Intercept internal link clicks for seamless SPA page switching without page reload
  useEffect(() => {
    const handlePopState = () => {
      setPathname(window.location.pathname);
      window.scrollTo(0, 0);
    };
    window.addEventListener("popstate", handlePopState);

    const handleLinkClick = (e: MouseEvent) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;

      const anchor = (e.target as HTMLElement).closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      if (
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("http://") ||
        href.startsWith("https://") ||
        anchor.target === "_blank"
      ) {
        return;
      }

      e.preventDefault();
      if (window.location.pathname !== href) {
        window.history.pushState(null, "", href);
        setPathname(href);
        window.scrollTo(0, 0);
      }
    };

    document.addEventListener("click", handleLinkClick);
    return () => {
      window.removeEventListener("popstate", handlePopState);
      document.removeEventListener("click", handleLinkClick);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    const metadata = getPageMetadata(pathname);
    document.title = metadata.title;
    const setMeta = (attr: "name" | "property", key: string, value: string) => {
      let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", value);
    };
    const path = pathname.replace(/\/+$/, "") || "/";
    const url = `${SITE_URL}${path === "/" ? "/" : path}`;
    setMeta("name", "description", metadata.description);
    setMeta("property", "og:title", metadata.title);
    setMeta("property", "og:description", metadata.description);
    setMeta("property", "og:url", url);
    setMeta("name", "twitter:title", metadata.title);
    setMeta("name", "twitter:description", metadata.description);
    const noindex = route.page === "privacy" || route.page === "terms" || route.page === "not-found";
    setMeta("name", "robots", noindex ? "noindex, follow" : "index, follow");
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = url;
  }, [pathname, route.page]);

  let page;
  switch (route.page) {
    case "home":
      page = <HomePage />;
      break;
    case "about":
      page = <AboutPage />;
      break;
    case "contact":
      page = <ContactPage />;
      break;
    case "locations":
      page = <LocationsPage />;
      break;
    case "projects":
      page = <ProjectsPage />;
      break;
    case "project":
      page = <ProjectPage slug={route.slug} />;
      break;
    case "gallery":
      page = <GalleryPage />;
      break;
    case "privacy":
      page = <PrivacyPolicyPage />;
      break;
    case "terms":
      page = <TermsPage />;
      break;
    case "not-found":
      page = <NotFound />;
      break;
  }

  return (
    <>
      <SmoothScroll />
      <Preloader />
      <ScrollProgress />
      <Header />
      <main
        id="main"
        className="relative z-10 bg-limestone lg:mb-[var(--fh)]"
        style={{ "--fh": `${footerHeight}px` } as CSSProperties}
      >
        {page}
      </main>
      <Footer onHeight={onFooterHeight} />
      <FloatingActions />
      <SiteEnquiryPopup />
    </>
  );
}

function getPageMetadata(pathname: string) {
  const route = matchRoute(pathname);
  if (route.page === "project") return getProject(route.slug)?.meta ?? { title: "Project not found | Royal Infra Realty", description: homeMeta.description };

  switch (route.page) {
    case "home":
      return homeMeta;
    case "about":
      return about.meta;
    case "contact":
      return contactPage.meta;
    case "locations":
      return locationsPage.meta;
    case "projects":
      return projectsPage.meta;
    case "gallery":
      return {
        title: "Video Gallery | Royal Infra Realty",
        description: "Watch project walkthroughs, community highlights, and the Royal Infra Realty story through our curated video gallery.",
      };
    case "privacy":
      return {
        title: "Privacy Policy | Royal Infra Realty",
        description: "How Royal Infra Realty handles the information you share with us.",
      };
    case "terms":
      return {
        title: "Terms of Use | Royal Infra Realty",
        description: "Terms for using the Royal Infra Realty website.",
      };
    case "not-found":
      return { title: "Page not found | Royal Infra Realty", description: homeMeta.description };
  }
}

function NotFound() {
  return (
    <section className="flex min-h-screen items-center justify-center bg-charcoal px-4 text-limestone">
      <div className="max-w-lg text-center">
        <div className="arch mx-auto flex h-56 w-44 items-end justify-center bg-rosewood pb-6">
          <span className="font-display text-6xl text-terracotta">404</span>
        </div>
        <h1 className="mt-10 font-display text-4xl sm:text-5xl">This plot isn't on our map</h1>
        <p className="mt-4 text-limestone/70">The page you're looking for doesn't exist or has been moved.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm">
          <a href="/" className="underline underline-offset-4 hover:text-terracotta">Back to home</a>
          <a href="/projects" className="underline underline-offset-4 hover:text-terracotta">View projects</a>
          <a href="/contact-us" className="underline underline-offset-4 hover:text-terracotta">Contact us</a>
        </div>
      </div>
    </section>
  );
}
