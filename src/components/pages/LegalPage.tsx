import { Breadcrumbs } from "./shared";

export function LegalPage({ title, sections }: { title: string; sections: { h: string; p: string }[] }) {
  return (
    <section className="bg-limestone pb-32 pt-40">
      <div className="container-x max-w-3xl">
        <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: title }]} />
        <h1 className="text-display-l mt-10">{title}</h1>
        <p className="mt-6 inline-block border border-rosewood px-3 py-1 text-sm text-rosewood">Draft: pending legal review</p>
        <div className="mt-14 space-y-10">
          {sections.map((s) => (
            <div key={s.h}>
              <h2 className="text-h3">{s.h}</h2>
              <p className="measure mt-3">{s.p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
