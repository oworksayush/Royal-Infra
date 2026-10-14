import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { EnquiryForm } from "@/components/pages/EnquiryForm";

const POPUP_SEEN_KEY = "royal-infra-home-enquiry-seen";

export function HomeEnquiryPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      if (window.localStorage.getItem(POPUP_SEEN_KEY) === "true") return;
    } catch (error) {
      console.warn("Unable to check whether the enquiry popup was previously shown.", error);
    }

    const timeout = window.setTimeout(() => {
      try {
        window.localStorage.setItem(POPUP_SEEN_KEY, "true");
      } catch (error) {
        console.warn("Unable to save that the enquiry popup was shown.", error);
      }
      setOpen(true);
    }, 2200);
    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[90] bg-charcoal/65 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-[90] max-h-[calc(100dvh-2rem)] w-[min(92vw,34rem)] -translate-x-1/2 -translate-y-1/2 overflow-y-auto border border-charcoal/10 bg-limestone p-6 text-charcoal shadow-2xl shadow-charcoal/30 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:p-9">
          <div className="mb-7 flex items-start justify-between gap-6 border-b border-charcoal/15 pb-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-olive">
                A thoughtful place to begin
              </p>
              <Dialog.Title className="mt-2 font-display text-3xl leading-tight">
                Let’s find your place.
              </Dialog.Title>
              <Dialog.Description className="mt-2 max-w-sm text-sm text-charcoal/70">
                Tell us what you’re looking for and our team will help you explore the right
                property.
              </Dialog.Description>
            </div>
            <Dialog.Close
              aria-label="Close enquiry form"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-charcoal/20 transition-colors hover:bg-charcoal hover:text-limestone"
            >
              <X className="h-5 w-5" aria-hidden />
            </Dialog.Close>
          </div>
          <EnquiryForm compact />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
