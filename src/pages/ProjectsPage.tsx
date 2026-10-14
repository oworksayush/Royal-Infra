import { projects, projectsPage } from "@/data/projects";
import { PageHeader } from "@/components/pages/shared";
import { CurtainImage } from "@/components/motion/primitives";
import { Cta } from "@/components/home/sections";
import { ButtonLink } from "@/components/ui-brand";
import { cn } from "@/lib/utils";

const bgs = ["bg-rosewood", "bg-olive", "bg-charcoal"];

export function ProjectsPage() {
  return (
    <>
      <PageHeader crumbs={[{ label: "Home", to: "/" }, { label: projectsPage.crumb }]} title={projectsPage.title} intro={projectsPage.intro} marquee={projectsPage.marquee} />
      <div>
        {projects.map((p, i) => (
          <section key={p.slug} aria-labelledby={`p-${p.slug}`} className={cn("sticky top-0 flex min-h-screen items-center text-limestone", bgs[i])} style={{ zIndex: i + 1 }}>
            <div className="container-x grid items-center gap-12 py-24 lg:grid-cols-12">
              <CurtainImage image={p.hero} className="arch aspect-[4/5] w-full max-w-md lg:col-span-5" curtain={bgs[i] ?? "bg-charcoal"} />
              <div className="lg:col-span-6 lg:col-start-7">
                <span className="tag">{p.listTag}</span>
                <p className="mt-6 text-limestone/80">{p.listMeta}</p>
                <h2 id={`p-${p.slug}`} className="text-display-l mt-2">{p.name}</h2>
                <p className="mt-6 max-w-lg font-display text-[1.45rem] leading-snug">{p.listText}</p>
                <ul className="mt-8 flex flex-wrap gap-2">
                  {p.chips.map((c) => <li key={c} className="tag">{c}</li>)}
                </ul>
                <a href={`/projects/${p.slug}`} className="mt-10 inline-flex border-b border-limestone/40 pb-1 font-medium hover:border-limestone">
                  Explore Project<span className="sr-only">: {p.name}, {p.listMeta}</span>
                </a>
              </div>
            </div>
          </section>
        ))}
      </div>
      <div className="relative z-10">
        <Cta title={projectsPage.cta.title} body={projectsPage.cta.body}>
          <ButtonLink href="/contact-us" tone="light">Contact Us</ButtonLink>
        </Cta>
      </div>
    </>
  );
}
