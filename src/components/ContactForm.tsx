import { useId, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SectorSelect from './SectorSelect';
import { CONTACT_FORM_ERROR, submitContactForm, type ContactEnquiryType } from '../lib/contactApi';

const inputStyle: React.CSSProperties = {
  width: '100%',
  minHeight: 44,
  padding: '12px 14px',
  borderRadius: 8,
  border: '1px solid #DCE8EF',
  background: '#fff',
  color: '#0F172A',
  fontSize: 16,
  outline: 'none',
  boxSizing: 'border-box',
};

const labelStyle: React.CSSProperties = {
  fontSize: 10,
  fontWeight: 700,
  color: '#64748B',
  display: 'block',
  marginBottom: 6,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
};

interface FieldProps {
  id: string;
  label: string;
  required?: boolean;
  children: React.ReactNode;
  dark?: boolean;
}

function Field({ id, label, required, children, dark }: FieldProps) {
  const lblStyle = dark ? { ...labelStyle, color: 'rgba(255,255,255,0.55)' } : labelStyle;
  return (
    <div>
      <label htmlFor={id} style={lblStyle}>
        {label}
        {required ? <span aria-hidden="true"> *</span> : null}
      </label>
      {children}
    </div>
  );
}

interface ContactFormProps {
  variant?: 'contact' | 'pilot' | 'careers';
  dark?: boolean;
  enquiryRoute?: string;
  sourcePage?: string;
}

export default function ContactForm({
  variant = 'contact',
  dark = false,
  enquiryRoute,
  sourcePage,
}: ContactFormProps) {
  const location = useLocation();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sector, setSector] = useState('');
  const formId = useId().replace(/:/g, '');

  const bg = dark ? 'rgba(255,255,255,0.06)' : '#fff';
  const border = dark ? 'rgba(255,255,255,0.12)' : '#DCE8EF';
  const fieldStyle = dark ? { ...inputStyle, background: bg, border, color: '#fff' } : inputStyle;

  const statusId = `${formId}-status`;
  const errorId = `${formId}-error`;

  const enquiryType: ContactEnquiryType =
    variant === 'pilot' ? 'pilot' : variant === 'careers' ? 'careers' : 'contact';

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);
    if (formData.get('company_website')) {
      setSubmitted(true);
      return;
    }

    const name = String(formData.get('name') ?? '').trim();
    const organisation = String(formData.get('organisation') ?? '').trim();
    const email = String(formData.get('email') ?? '').trim();
    const message = String(formData.get('message') ?? '').trim();
    const role = String(formData.get('role') ?? '').trim();
    const teamSize = String(formData.get('teamSize') ?? '').trim();
    const interest = String(formData.get('interest') ?? '').trim();
    const phone = String(formData.get('phone') ?? '').trim();
    const formSector = String(formData.get('sector') ?? sector).trim();

    const routePrefix = enquiryRoute ? `Enquiry route: ${enquiryRoute}\n\n` : '';
    const composedMessage =
      variant === 'pilot'
        ? interest || message
        : `${routePrefix}${message}`.trim();

    setSubmitting(true);
    try {
      await submitContactForm({
        name,
        organisation: organisation || 'Not provided',
        email,
        message: composedMessage,
        phone: phone || undefined,
        sector: formSector || undefined,
        role: role || undefined,
        teamSize: teamSize || undefined,
        interest: interest || undefined,
        enquiryType,
        sourcePage: sourcePage ?? `${location.pathname}${location.hash}`,
        company_website: String(formData.get('company_website') ?? ''),
      });
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : CONTACT_FORM_ERROR);
    } finally {
      setSubmitting(false);
    }
  };

  const submitLabel =
    variant === 'pilot' ? 'Apply for Pilot' : variant === 'careers' ? 'Register interest' : 'Send message';

  return (
    <form
      onSubmit={handleSubmit}
      className="card flex flex-col contact-form"
      style={{ gap: 14, padding: '28px 24px', background: dark ? 'rgba(255,255,255,0.04)' : undefined, borderColor: dark ? 'rgba(255,255,255,0.08)' : undefined }}
      aria-describedby={submitted ? statusId : error ? errorId : undefined}
      noValidate
    >
      <input
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        className="sr-only"
        aria-hidden="true"
      />

      {variant === 'contact' ? (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }} className="form-grid-2">
            <Field id={`${formId}-name`} label="Full name" required dark={dark}>
              <input id={`${formId}-name`} name="name" type="text" required aria-required="true" autoComplete="name" placeholder="Jane Smith" style={fieldStyle} />
            </Field>
            <Field id={`${formId}-org`} label="Organisation" required dark={dark}>
              <input id={`${formId}-org`} name="organisation" type="text" required aria-required="true" autoComplete="organization" placeholder="Organisation" style={fieldStyle} />
            </Field>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }} className="form-grid-2">
            <Field id={`${formId}-role`} label="Role" required dark={dark}>
              <input id={`${formId}-role`} name="role" type="text" required aria-required="true" autoComplete="organization-title" placeholder="Governance Director" style={fieldStyle} />
            </Field>
            <Field id={`${formId}-email`} label="Email" required dark={dark}>
              <input id={`${formId}-email`} name="email" type="email" required aria-required="true" autoComplete="email" placeholder="jane@organisation.co.uk" style={fieldStyle} />
            </Field>
          </div>
          <Field id={`${formId}-sector`} label="Sector" required dark={dark}>
            <SectorSelect
              id={`${formId}-sector`}
              name="sector"
              value={sector}
              onChange={setSector}
              required
              dark={dark}
              placeholder="Select sector"
            />
          </Field>
          <Field id={`${formId}-message`} label="Message" dark={dark}>
            <textarea id={`${formId}-message`} name="message" rows={4} autoComplete="off" placeholder="How can we help?" style={{ ...fieldStyle, resize: 'vertical', minHeight: 120 }} />
          </Field>
        </>
      ) : variant === 'careers' ? (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }} className="form-grid-2">
            <Field id={`${formId}-name`} label="Full name" required dark={dark}>
              <input id={`${formId}-name`} name="name" type="text" required aria-required="true" autoComplete="name" placeholder="Jane Smith" style={fieldStyle} />
            </Field>
            <Field id={`${formId}-email`} label="Email" required dark={dark}>
              <input id={`${formId}-email`} name="email" type="email" required aria-required="true" autoComplete="email" placeholder="jane@organisation.co.uk" style={fieldStyle} />
            </Field>
          </div>
          <Field id={`${formId}-org`} label="Current organisation" dark={dark}>
            <input id={`${formId}-org`} name="organisation" type="text" autoComplete="organization" placeholder="Optional" style={fieldStyle} />
          </Field>
          <Field id={`${formId}-message`} label="Your background and interest" required dark={dark}>
            <textarea
              id={`${formId}-message`}
              name="message"
              rows={5}
              required
              aria-required="true"
              autoComplete="off"
              placeholder="Tell us about your background, what you are interested in, and how you could contribute."
              style={{ ...fieldStyle, resize: 'vertical', minHeight: 140 }}
            />
          </Field>
        </>
      ) : (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }} className="form-grid-2">
            <Field id={`${formId}-org`} label="Organisation" required dark={dark}>
              <input id={`${formId}-org`} name="organisation" type="text" required aria-required="true" autoComplete="organization" style={fieldStyle} />
            </Field>
            <Field id={`${formId}-sector`} label="Sector" required dark={dark}>
              <SectorSelect
                id={`${formId}-sector`}
                name="sector"
                value={sector}
                onChange={setSector}
                required
                dark={dark}
                placeholder="Select sector"
              />
            </Field>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }} className="form-grid-2">
            <Field id={`${formId}-name`} label="Full name" required dark={dark}>
              <input id={`${formId}-name`} name="name" type="text" required aria-required="true" autoComplete="name" style={fieldStyle} />
            </Field>
            <Field id={`${formId}-role`} label="Role" required dark={dark}>
              <input id={`${formId}-role`} name="role" type="text" required aria-required="true" autoComplete="organization-title" style={fieldStyle} />
            </Field>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }} className="form-grid-2">
            <Field id={`${formId}-email`} label="Email" required dark={dark}>
              <input id={`${formId}-email`} name="email" type="email" required aria-required="true" autoComplete="email" style={fieldStyle} />
            </Field>
            <Field id={`${formId}-team-size`} label="Approximate team size" required dark={dark}>
              <input
                id={`${formId}-team-size`}
                name="teamSize"
                type="number"
                min={1}
                max={10000}
                inputMode="numeric"
                required
                aria-required="true"
                placeholder="14"
                style={fieldStyle}
              />
            </Field>
          </div>
          <Field id={`${formId}-interest`} label="What is driving your interest?" dark={dark}>
            <textarea id={`${formId}-interest`} name="interest" rows={3} autoComplete="off" style={{ ...fieldStyle, resize: 'vertical', minHeight: 100 }} />
          </Field>
        </>
      )}

      {error ? (
        <p id={errorId} role="alert" style={{ fontSize: 13, color: '#B83228', margin: 0 }}>
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={submitted || submitting}
        className="btn-primary contact-form-submit"
        style={{ marginTop: 4, opacity: submitted || submitting ? 0.85 : 1 }}
        aria-live="polite"
      >
        {submitted
          ? 'Received. We will respond within 48 hours.'
          : submitting
            ? 'Sending...'
            : submitLabel}
      </button>
      {submitted && (
        <p id={statusId} className="sr-only" role="status">
          Form submitted successfully. We will respond within 48 hours.
        </p>
      )}
    </form>
  );
}
