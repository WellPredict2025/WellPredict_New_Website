export const CONTACT_EMAIL = 'hello@wellpredict.co.uk';
export const CONTACT_PHONE = '+44 7867 054372';
export const CONTACT_PHONE_TEL = '+447867054372';

export const CONTACT_INTRO =
  "Whether you're exploring a pilot, scaling deployment, or have a specific technical requirement, we're ready to help.";

export const CONTACT_ROUTING_NOTE =
  'All enquiries currently route to our founder inbox so we can respond quickly.';

export const CONTACT_CATEGORIES = [
  {
    id: 'general',
    title: 'General',
    description: 'Enquiries, walkthroughs, and general contact',
    email: CONTACT_EMAIL,
    phone: CONTACT_PHONE,
  },
  {
    id: 'sales',
    title: 'Sales',
    description: 'New deployments, pilots, and pricing enquiries',
    email: CONTACT_EMAIL,
  },
  {
    id: 'support',
    title: 'Support',
    description: 'Platform support and technical queries',
    email: CONTACT_EMAIL,
  },
] as const;
