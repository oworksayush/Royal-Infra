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

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw9FqiWjY7hABPePVEhosMGzz3CA4kYRpwYOnxlGeokGgDxRP84yjohqXLQYnjbAzCv/exec';

export async function submitEnquiry(data: any) {
  try {
    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      // Use text/plain to avoid the CORS preflight check
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(data),
      redirect: 'follow',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    // If the script returned an error (like the sheet error), pass it up
    if (result.status === 'error') {
      console.error("Google Script Error:", result.message);
      return { ok: false, error: result.message };
    }

    return { ok: true };

  } catch (error) {
    console.error('Enquiry submission failed:', error);
    return { ok: false, error: 'network' };
  }
}