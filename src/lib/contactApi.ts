export const contactEndpoint =
  import.meta.env.VITE_CONTACT_API_URL || '/send-contact.php';

export type ContactEnquiryType = 'contact' | 'pilot' | 'careers' | 'newsletter';

export type ContactFormData = {
  name: string;
  organisation: string;
  email: string;
  message?: string;
  phone?: string;
  sector?: string;
  date?: string;
  type?: ContactEnquiryType;
  enquiryType?: ContactEnquiryType;
  sourcePage?: string;
  company_website?: string;
  role?: string;
  teamSize?: string;
  interest?: string;
};

export const CONTACT_FORM_ERROR =
  'Something went wrong. Please email hello@wellpredict.co.uk directly.';

type ContactResponse = {
  ok?: boolean;
  success?: boolean;
  message?: string;
  error?: string;
};

/** POST JSON to the IONOS PHP contact endpoint. Never uses GET or URL query params. */
export async function submitContactForm(data: ContactFormData): Promise<ContactResponse> {
  if (data.company_website) {
    return { ok: true, success: true };
  }

  const type = data.type ?? data.enquiryType ?? 'contact';

  const response = await fetch(contactEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...data,
      type,
      enquiryType: type,
      sourcePage: data.sourcePage ?? (typeof window !== 'undefined' ? window.location.pathname : undefined),
    }),
  });

  let result: ContactResponse = {};
  try {
    result = (await response.json()) as ContactResponse;
  } catch {
    result = {};
  }

  if (!response.ok) {
    throw new Error(result.error || result.message || CONTACT_FORM_ERROR);
  }

  return result;
}
