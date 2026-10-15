import { useState, type FormEvent, type ReactNode } from "react";
import { AlertCircle } from "lucide-react";
import { contactPage as C } from "@/data/pages";
import { site } from "@/data/site";
import { enquirySchema, submitEnquiry } from "@/lib/enquiry";

type Fields = {
  name: string;
  phone: string;
  email: string;
  project: string;
  message: string;
  website: string;
};
const empty: Fields = { name: "", phone: "", email: "", project: "", message: "", website: "" };

export function EnquiryForm({
  compact = false,
  onSuccess,
}: {
  compact?: boolean;
  onSuccess?: () => void;
}) {
  const [v, setV] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [state, setState] = useState<"idle" | "sending" | "done" | "failed">("idle");
  const set = (k: keyof Fields) => (e: { target: { value: string } }) =>
    setV({ ...v, [k]: e.target.value });

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const parsed = enquirySchema.safeParse(v);
    if (!parsed.success) {
      const f: Partial<Record<keyof Fields, string>> = {};
      for (const i of parsed.error.issues) f[i.path[0] as keyof Fields] ??= i.message;
      setErrors(f);
      return;
    }
    setErrors({});
    setState("sending");
    const res = await submitEnquiry(parsed.data).catch(() => ({
      ok: false as const,
      error: "network",
    }));
    if (res.ok) {
      setState("done");
      onSuccess?.();
    } else {
      setState("failed");
    }
  }

  if (state === "done") {
    return (
      <div
        role="status"
        className={`bg-charcoal text-limestone ${compact ? "p-6 rounded-sm border border-terracotta/30" : "p-10"}`}
      >
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-terracotta text-limestone">
            ✓
          </span>
          <h2 className={compact ? "font-display text-2xl text-limestone" : "text-h2"}>
            Thank you, {v.name.split(" ")[0]}.
          </h2>
        </div>
        <p className="mt-4 max-w-md text-sm text-limestone/80 leading-relaxed">
          Your enquiry has been received by our senior property advisory team. We will be in touch shortly.
          If you require immediate assistance, please call{" "}
          <a href={site.phoneHref} className="text-terracotta underline underline-offset-4 hover:text-limestone">
            {site.phone}
          </a>.
        </p>
      </div>
    );
  }

  const inputClass = compact
    ? "peer w-full border-0 border-b border-charcoal/30 bg-transparent pb-1.5 pt-4 text-[0.95rem] outline-none transition-colors focus:border-terracotta focus:ring-0"
    : "peer w-full border-0 border-b border-charcoal/40 bg-transparent pb-2 pt-6 text-lg outline-none transition-colors focus:border-charcoal";

  return (
    <form onSubmit={onSubmit} noValidate aria-labelledby="form-h">
      {!compact && (
        <h2 id="form-h" className="text-h2">
          {C.formTitle}
        </h2>
      )}
      {compact && <h2 id="form-h" className="sr-only">{C.formTitle}</h2>}

      <div
        className={
          compact
            ? "grid grid-cols-1 gap-x-5 gap-y-3.5 sm:grid-cols-2"
            : "mt-10 space-y-8"
        }
      >
        <div className={compact ? "col-span-1" : undefined}>
          <Field id="name" label="Full Name" error={errors.name} compact={compact}>
            <input
              id="name"
              autoComplete="name"
              value={v.name}
              onChange={set("name")}
              {...aria("name", errors.name)}
              className={inputClass}
              placeholder=" "
            />
          </Field>
        </div>

        <div className={compact ? "col-span-1" : undefined}>
          <Field id="phone" label="Phone Number" error={errors.phone} compact={compact}>
            <input
              id="phone"
              type="tel"
              autoComplete="tel"
              value={v.phone}
              onChange={set("phone")}
              {...aria("phone", errors.phone)}
              className={inputClass}
              placeholder=" "
            />
          </Field>
        </div>

        <div className={compact ? "col-span-1" : undefined}>
          <Field id="email" label="Email Address" error={errors.email} compact={compact}>
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={v.email}
              onChange={set("email")}
              {...aria("email", errors.email)}
              className={inputClass}
              placeholder=" "
            />
          </Field>
        </div>

        <div className={compact ? "col-span-1" : undefined}>
          <Field id="project" label="Interested Project" error={errors.project} fixed compact={compact}>
            <select
              id="project"
              value={v.project}
              onChange={set("project")}
              {...aria("project", errors.project)}
              className={`${inputClass} cursor-pointer`}
            >
              <option value="" disabled>
                Select a project
              </option>
              {C.projectOptions.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </Field>
        </div>

        <div className={compact ? "col-span-1 sm:col-span-2" : undefined}>
          <Field id="message" label="Your Message (Optional)" error={errors.message} compact={compact}>
            <textarea
              id="message"
              rows={compact ? 2 : 4}
              value={v.message}
              onChange={set("message")}
              {...aria("message", errors.message)}
              className={inputClass}
              placeholder=" "
            />
          </Field>
        </div>

        <div aria-hidden className="absolute -left-[9999px]">
          <label htmlFor="website">Website</label>
          <input
            id="website"
            tabIndex={-1}
            autoComplete="off"
            value={v.website}
            onChange={set("website")}
          />
        </div>
      </div>

      {state === "failed" && (
        <p role="alert" className="mt-4 flex items-center gap-2 text-rosewood text-sm">
          <AlertCircle className="h-4 w-4 shrink-0" aria-hidden />
          We couldn't send your enquiry. Please try again, or call {site.phone}.
        </p>
      )}

      <div className={compact ? "mt-5 flex items-center justify-between gap-4" : "mt-10"}>
        <button
          type="submit"
          disabled={state === "sending"}
          className={`group relative inline-flex min-h-11 items-center justify-center overflow-hidden rounded-full bg-charcoal px-7 py-2.5 font-medium text-limestone transition-transform active:scale-[0.98] disabled:opacity-60 ${compact ? "w-full sm:w-auto" : ""}`}
        >
          <span
            aria-hidden
            className="absolute inset-0 translate-y-full rounded-full bg-rosewood transition-transform duration-500 group-hover:translate-y-0"
          />
          <span className="relative flex items-center gap-2 text-sm sm:text-base">
            <span>{state === "sending" ? "Sending Enquiry…" : "Submit Enquiry"}</span>
            <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
          </span>
        </button>
      </div>
    </form>
  );
}

const aria = (id: string, err?: string) => ({
  "aria-invalid": !!err,
  "aria-describedby": err ? `${id}-err` : undefined,
});

function Field({
  id,
  label,
  error,
  children,
  fixed,
  compact,
}: {
  id: string;
  label: string;
  error?: string | undefined;
  children: ReactNode;
  fixed?: boolean;
  compact?: boolean;
}) {
  return (
    <div className="relative">
      {children}
      <label
        htmlFor={id}
        className={
          fixed
            ? `absolute left-0 top-0 ${compact ? "text-xs" : "text-sm"} text-charcoal/75 font-medium`
            : `pointer-events-none absolute left-0 top-0 ${compact ? "text-xs" : "text-sm"} text-charcoal/75 font-medium transition-all ${compact
              ? "peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
              : "peer-placeholder-shown:top-6 peer-placeholder-shown:text-lg peer-focus:top-0 peer-focus:text-sm"
            }`
        }
      >
        {label}
      </label>
      {error && (
        <p id={`${id}-err`} className="mt-1.5 flex items-center gap-1.5 text-xs text-rosewood">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden />
          {error}
        </p>
      )}
    </div>
  );
}
