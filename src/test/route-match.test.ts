import { describe, expect, it } from "vitest";
import { matchRoute } from "@/lib/route-match";

describe("matchRoute", () => {
  it("matches known static pages and normalizes trailing slashes", () => {
    expect(matchRoute("/")).toEqual({ page: "home" });
    expect(matchRoute("/about-us/")).toEqual({ page: "about" });
    expect(matchRoute("/projects/")).toEqual({ page: "projects" });
  });

  it("matches a project slug and returns not-found for unknown paths", () => {
    expect(matchRoute("/projects/commercial-project-bellary")).toEqual({
      page: "project",
      slug: "commercial-project-bellary",
    });
    expect(matchRoute("/projects/palm-serenity")).toEqual({
      page: "project",
      slug: "palm-serenity",
    });
    expect(matchRoute("/missing")).toEqual({ page: "not-found" });
  });
});
