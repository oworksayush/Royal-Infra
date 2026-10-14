import { LegalPage } from "@/components/pages/LegalPage";

export function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      sections={[
        { h: "Information you share", p: "When you send an enquiry, call or message us, we receive the details you choose to provide, such as your name, phone number, email address and the project you are interested in." },
        { h: "How we use it", p: "We use these details only to respond to your enquiry, arrange site visits and keep you informed about the projects you asked about." },
        { h: "Contact", p: "For any question about your information, write to Contact@royalinfra.com." },
      ]}
    />
  );
}
