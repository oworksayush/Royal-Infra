import { z } from "zod";

export const enquirySchema = z.object({
  name: z.string().trim().min(1, "Please enter your full name").max(100, "Name must be under 100 characters"),
  phone: z
    .string()
    .trim()
    .regex(/^(\+91[\s-]?)?[6-9]\d{4}[\s-]?\d{5}$/, "Please enter a valid Indian mobile number"),
  email: z.string().trim().email("Please enter a valid email address").max(255),
  project: z.string().min(1, "Please choose a project"),
  message: z.string().trim().max(1000, "Message must be under 1000 characters").optional().or(z.literal("")),
  website: z.string().max(0).optional(), // honeypot
});
export type Enquiry = z.infer<typeof enquirySchema>;

/**
 * STUB: enquiries are not stored or sent anywhere yet.
 * Wire this to a backend (database + owner email) before launch.
 */
export async function submitEnquiry(data: Enquiry): Promise<{ ok: true } | { ok: false; error: string }> {
  if (data.website) return { ok: true }; // bot: silently accept
  await new Promise((r) => setTimeout(r, 600));
  return { ok: true };
}
