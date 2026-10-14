import { LegalPage } from "@/components/pages/LegalPage";

export function TermsPage() {
  return (
    <LegalPage
      title="Terms of Use"
      sections={[
        { h: "About this website", p: "This website shares information about Royal Infra Realty and its projects. Content is provided for general information and may change without notice." },
        { h: "Images", p: "Images are representative; actual development may vary. Images marked \"Artist's impression\" are illustrations." },
        { h: "Contact", p: "For any question about these terms, write to Contact@royalinfra.com." },
      ]}
    />
  );
}
