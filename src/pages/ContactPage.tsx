import type { ReactNode } from "react";
import { contactPage as C } from "@/data/pages";
import { site } from "@/data/site";
import { Breadcrumbs, SectionHead } from "@/components/pages/shared";
import { RiseText } from "@/components/motion/primitives";
import { Cta } from "@/components/home/sections";
import { ButtonLink } from "@/components/ui-brand";
import { EnquiryForm } from "@/components/pages/EnquiryForm";
import { SocialLinks } from "@/components/SocialLinks";

export function ContactPage() {
  return (
    <>
      <section className="bg-limestone pt-36">
        <div className="container-x grid gap-16 pb-24 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: C.crumb }]} />
              <h1 className="text-display-l mt-10">
                <RiseText>{C.title}</RiseText>
              </h1>
              <p className="measure mt-8 text-lg">{C.intro}</p>
              <div className="mt-14">
                <SectionHead eyebrow={C.eyebrow} title={C.h2}>
                  <p className="measure mt-6">{C.body}</p>
                </SectionHead>
              </div>
              <dl className="mt-12 space-y-8">
                <Info label="Office Address">
                  <address className="not-italic">{site.address}</address>
                </Info>
                <Info label="Phone">
                  <a href={site.phoneHref}>{site.phone}</a>
                </Info>
                <Info label="Email">
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </Info>
                <Info label="WhatsApp">
                  <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer">
                    {site.whatsapp}
                  </a>
                </Info>
                <Info label="Follow Us">
                  <SocialLinks variant="contact" />
                </Info>
              </dl>
            </div>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <EnquiryForm />
            <div className="arch mt-20 aspect-[4/5] overflow-hidden bg-charcoal/10">
              <iframe
                title="Royal Infra Realty office on Infantry Road, Bengaluru"
                src={C.mapUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full border-0"
              />
            </div>
          </div>
        </div>
      </section>
      <Cta title={C.cta.title} body={C.cta.body}>
        <ButtonLink href="/projects" tone="light">
          View Projects
        </ButtonLink>
      </Cta>
    </>
  );
}

function Info({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <dt className="text-sm text-charcoal/75">{label}</dt>
      <dd className="mt-1 font-display text-[clamp(1.25rem,2vw,1.75rem)] leading-snug">
        {children}
      </dd>
    </div>
  );
}
