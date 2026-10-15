export type AppRoute =
  | { page: "home" }
  | { page: "about" }
  | { page: "contact" }
  | { page: "locations" }
  | { page: "projects" }
  | { page: "project"; slug: string }
  | { page: "gallery" }
  | { page: "privacy" }
  | { page: "terms" }
  | { page: "not-found" };

export function matchRoute(pathname: string): AppRoute {
  const path = pathname.replace(/\/+$/, "") || "/";

  switch (path) {
    case "/":
      return { page: "home" };
    case "/about-us":
      return { page: "about" };
    case "/contact-us":
      return { page: "contact" };
    case "/locations":
      return { page: "locations" };
    case "/projects":
      return { page: "projects" };
    case "/gallery":
      return { page: "gallery" };
    case "/privacy-policy":
      return { page: "privacy" };
    case "/terms-of-use":
      return { page: "terms" };
  }

  const projectMatch = /^\/projects\/([^/]+)$/.exec(path);
  if (projectMatch?.[1]) return { page: "project", slug: projectMatch[1] };

  return { page: "not-found" };
}
