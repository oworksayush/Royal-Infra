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

export function EnquiryForm({ compact = false }: { compact?: boolean }) {
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
    setState(res.ok ? "done" : "failed");
  }

  if (state === "done") {
    return (
      <div role="status" className={`bg-charcoal text-limestone ${compact ? "p-6" : "p-10"}`}>
        <h2 className="text-h2">Thank you, {v.name.split(" ")[0]}.</h2>
        <p className="mt-6 max-w-md">
          Your enquiry has reached the Royal Infra team. Our advisory team will be in touch. If
          you'd like to speak sooner, call {site.phone}.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate aria-labelledby="form-h">
      <h2 id="form-h" className="text-h2">
        {C.formTitle}
      </h2>
      <div className={`${compact ? "mt-6 space-y-5" : "mt-10 space-y-8"}`}>
        <Field id="name" label="Full Name" error={errors.name}>
          <input
            id="name"
            autoComplete="name"
            value={v.name}
            onChange={set("name")}
            {...aria("name", errors.name)}
            className={input}
            placeholder=" "
          />
        </Field>
        <Field id="phone" label="Phone Number" error={errors.phone}>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            value={v.phone}
            onChange={set("phone")}
            {...aria("phone", errors.phone)}
            className={input}
            placeholder=" "
          />
        </Field>
        <Field id="email" label="Email Address" error={errors.email}>
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={v.email}
            onChange={set("email")}
            {...aria("email", errors.email)}
            className={input}
            placeholder=" "
          />
        </Field>
        <Field id="project" label="Interested Project" error={errors.project} fixed>
          <select
            id="project"
            value={v.project}
            onChange={set("project")}
            {...aria("project", errors.project)}
            className={input}
          >
            <option value="" disabled>
              Select a project
            </option>
            {C.projectOptions.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </Field>
        <Field id="message" label="Your Message" error={errors.message}>
          <textarea
            id="message"
            rows={compact ? 2 : 4}
            value={v.message}
            onChange={set("message")}
            {...aria("message", errors.message)}
            className={input}
            placeholder=" "
          />
        </Field>
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
        <p role="alert" className="mt-8 flex items-center gap-2 text-rosewood">
          <AlertCircle className="h-4 w-4" aria-hidden />
          We couldn't send your enquiry. Please try again, or call {site.phone}.
        </p>
      )}
      <button
        type="submit"
        disabled={state === "sending"}
        className={`group relative inline-flex min-h-11 items-center overflow-hidden rounded-full bg-charcoal px-8 py-3 font-medium text-limestone disabled:opacity-60 ${compact ? "mt-6" : "mt-10"}`}
      >
        <span
          aria-hidden
          className="absolute inset-0 translate-y-full rounded-full bg-rosewood transition-transform duration-500 group-hover:translate-y-0"
        />
        <span className="relative">{state === "sending" ? "Sending…" : "Submit Enquiry"}</span>
      </button>
    </form>
  );
}

const input =
  "peer w-full border-0 border-b border-charcoal/40 bg-transparent pb-2 pt-6 text-lg outline-none transition-colors focus:border-charcoal";
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
}: {
  id: string;
  label: string;
  error?: string | undefined;
  children: ReactNode;
  fixed?: boolean;
}) {
  return (
    <div className="relative">
      {children}
      <label
        htmlFor={id}
        className={
          fixed
            ? "absolute left-0 top-0 text-sm text-charcoal/75"
            : "pointer-events-none absolute left-0 top-0 text-sm text-charcoal/75 transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-lg peer-focus:top-0 peer-focus:text-sm"
        }
      >
        {label}
      </label>
      {error && (
        <p id={`${id}-err`} className="mt-2 flex items-center gap-2 text-sm text-rosewood">
          <AlertCircle className="h-4 w-4" aria-hidden />
          {error}
        </p>
      )}
    </div>
  );
}
