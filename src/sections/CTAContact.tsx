import { useState, type FormEvent } from 'react';
import { CONTACT_FORM_ERROR, submitContactForm } from '../lib/contactApi';
import {
  CalendarClock,
  Clock3,
  FileCheck2,
  ShieldCheck,
} from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { fadeLeft, fadeRight, fadeUp, motionTransition, staggerContainer } from '../lib/motion';
import SectorSelect from '../components/SectorSelect';

const OUTCOMES = [
  {
    icon: FileCheck2,
    label: 'Finalised Evidence Pack',
    chip: 'Finalised',
    sub: 'Versioned, locked, ready to share.',
    accent: 'teal',
  },
  {
    icon: ShieldCheck,
    label: 'Privacy Validation Proof',
    chip: 'Threshold met',
    sub: 'Confirms the threshold was met.',
    accent: 'sky',
  },
  {
    icon: Clock3,
    label: 'Full Audit Timeline',
    chip: 'Logged',
    sub: 'Every action, every timestamp.',
    accent: 'blue',
  },
  {
    icon: CalendarClock,
    label: '60-Minute Review Session',
    chip: 'Included',
    sub: 'We walk through the pack with you.',
    accent: 'gold',
  },
] as const;

const PILOT_WEEKS = [
  { week: 'Week 1', label: 'Team setup' },
  { week: 'Week 2', label: 'Signal collection' },
  { week: 'Week 3', label: 'Action and review' },
  { week: 'Week 4', label: 'Evidence pack ready' },
] as const;

const OUTCOME_VARIANTS = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0 },
};

const FIELD_VARIANTS = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

const FIELD_CONTAINER = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.12 },
  },
};

export default function CTAContact() {
  const shouldReduceMotion = useReducedMotion();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [sector, setSector] = useState('');
  const [visualActive, setVisualActive] = useState(Boolean(shouldReduceMotion));
  const transition = motionTransition(shouldReduceMotion, 0.55);
  const inView = { once: true, amount: 0.16 };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError(null);

    const formData = new FormData(event.currentTarget);
    if (formData.get('company_website')) {
      setSubmitted(true);
      return;
    }

    setSubmitting(true);
    try {
      await submitContactForm({
        name: String(formData.get('name') ?? '').trim(),
        organisation: String(formData.get('organisation') ?? '').trim(),
        email: String(formData.get('email') ?? '').trim(),
        message: String(formData.get('message') ?? '').trim(),
        sector: String(formData.get('sector') ?? sector).trim() || undefined,
        enquiryType: 'pilot',
        sourcePage: '/#cta-contact',
        company_website: String(formData.get('company_website') ?? ''),
      });
      setSubmitted(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : CONTACT_FORM_ERROR);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="cta-contact"
      className="pilot-section section-padding"
      aria-labelledby="pilot-heading"
    >
      <div className="pilot-video-fallback" aria-hidden="true" />
      <div className="pilot-video-overlay" aria-hidden="true" />
      <div className="pilot-bg-grid" aria-hidden="true" />
      <div className="pilot-bg-glow" aria-hidden="true" />

      <div className="pilot-container">
        <div className="pilot-grid">
          <motion.header
            className="pilot-header"
            initial="hidden"
            whileInView="visible"
            viewport={inView}
            variants={fadeLeft}
            transition={transition}
            onViewportEnter={() => setVisualActive(true)}
          >
            <span className="eyebrow pilot-eyebrow">START YOUR PILOT</span>
            <h2 id="pilot-heading" className="pilot-title">
              <motion.span
                className="pilot-title__line"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={inView}
                transition={{ ...transition, delay: shouldReduceMotion ? 0 : 0.06 }}
              >
                Four weeks from now,{' '}
              </motion.span>
              <motion.span
                className="pilot-title__accent"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={inView}
                transition={{ ...transition, delay: shouldReduceMotion ? 0 : 0.14 }}
              >
                you could hand a regulator this document.
              </motion.span>
            </h2>
            <motion.p
              className="pilot-subline"
              initial="hidden"
              whileInView="visible"
              viewport={inView}
              variants={fadeUp}
              transition={{ ...transition, delay: shouldReduceMotion ? 0 : 0.2 }}
            >
              Start with one team and receive a review-ready evidence pack after one focused cycle.
            </motion.p>
          </motion.header>

          <motion.div
            className="pilot-form-panel-wrap"
            initial="hidden"
            whileInView="visible"
            viewport={inView}
            variants={fadeRight}
            transition={transition}
          >
            <div className="pilot-form-glow" aria-hidden="true" />
            <form
              className="pilot-form-panel"
              onSubmit={handleSubmit}
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
              <div className="pilot-form-panel__head">
                <h3 className="pilot-form-panel__title">Apply for a pilot</h3>
                <p className="pilot-form-panel__intro">
                  Tell us about your situation. We usually respond within 48 hours.
                </p>
              </div>

              <motion.div
                className="pilot-form-panel__fields"
                variants={FIELD_CONTAINER}
                initial="hidden"
                whileInView="visible"
                viewport={inView}
              >
                <div className="pilot-form__row">
                  <motion.div className="pilot-form__field" variants={FIELD_VARIANTS}>
                    <label className="pilot-form__label" htmlFor="pilot-name">
                      Your name
                    </label>
                    <input
                      id="pilot-name"
                      name="name"
                      className="pilot-form__input"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="Jane Smith"
                    />
                  </motion.div>
                  <motion.div className="pilot-form__field" variants={FIELD_VARIANTS}>
                    <label className="pilot-form__label" htmlFor="pilot-org">
                      Organisation
                    </label>
                    <input
                      id="pilot-org"
                      name="organisation"
                      className="pilot-form__input"
                      type="text"
                      required
                      autoComplete="organization"
                      placeholder="Organisation"
                    />
                  </motion.div>
                </div>

                <motion.div className="pilot-form__field" variants={FIELD_VARIANTS}>
                  <label className="pilot-form__label" htmlFor="pilot-sector">
                    Your sector
                  </label>
                  <SectorSelect
                    id="pilot-sector"
                    name="sector"
                    value={sector}
                    onChange={setSector}
                    required
                    placeholder="Select your sector"
                  />
                </motion.div>

                <motion.div className="pilot-form__field" variants={FIELD_VARIANTS}>
                  <label className="pilot-form__label" htmlFor="pilot-email">
                    Work email
                  </label>
                    <input
                      id="pilot-email"
                      name="email"
                      className="pilot-form__input"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="jane@organisation.co.uk"
                    />
                </motion.div>

                <motion.div className="pilot-form__field" variants={FIELD_VARIANTS}>
                  <label className="pilot-form__label" htmlFor="pilot-message">
                    What is driving this for you? (optional)
                  </label>
                  <textarea
                    id="pilot-message"
                    name="message"
                    className="pilot-form__input pilot-form__textarea"
                    rows={4}
                    placeholder="Tell us about an upcoming review, governance pressure, or evidence gap."
                  />
                </motion.div>
              </motion.div>

              {submitError ? (
                <p role="alert" className="pilot-form__fineprint" style={{ color: '#FCA5A5', marginBottom: 0 }}>
                  {submitError}
                </p>
              ) : null}

              <button type="submit" className="pilot-form__submit" disabled={submitted || submitting}>
                {submitted
                  ? 'Application received. We will be in touch within 48 hours.'
                  : submitting
                    ? 'Sending...'
                    : 'Apply for a Pilot'}
              </button>

              <p className="pilot-form__fineprint">
                No commitment required. All enquiries are confidential.
              </p>
            </form>
          </motion.div>

          <motion.div
            className="pilot-timeline"
            initial="hidden"
            whileInView="visible"
            viewport={inView}
            variants={fadeUp}
            transition={{ ...transition, delay: shouldReduceMotion ? 0 : 0.22 }}
          >
            <p className="pilot-timeline__label">Pilot outcome timeline</p>
            <div className="pilot-timeline__rail" aria-hidden="true">
              <motion.span
                className="pilot-timeline__progress"
                initial={{ scaleX: 0 }}
                animate={visualActive ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: shouldReduceMotion ? 0 : 1.1, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
            <ol className="pilot-timeline__track">
              {PILOT_WEEKS.map((step, index) => (
                <motion.li
                  key={step.week}
                  className="pilot-timeline__step"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={inView}
                  transition={{
                    ...transition,
                    delay: shouldReduceMotion ? 0 : 0.28 + index * 0.08,
                  }}
                >
                  <span className="pilot-timeline__dot" aria-hidden="true" />
                  <span className="pilot-timeline__week">{step.week}</span>
                  <span className="pilot-timeline__text">{step.label}</span>
                </motion.li>
              ))}
            </ol>
          </motion.div>

          <motion.div
            className="pilot-outcomes"
            initial="hidden"
            whileInView="visible"
            viewport={inView}
            variants={staggerContainer}
            transition={{ ...transition, staggerChildren: shouldReduceMotion ? 0 : 0.08 }}
          >
            {OUTCOMES.map(({ icon: Icon, label, chip, sub, accent }) => (
              <motion.article
                key={label}
                className={`pilot-outcome pilot-outcome--${accent}`}
                variants={OUTCOME_VARIANTS}
                transition={transition}
              >
                <div className="pilot-outcome__top">
                  <span className="pilot-outcome__icon">
                    <Icon aria-hidden="true" strokeWidth={1.75} />
                  </span>
                  <span className="pilot-outcome__chip">{chip}</span>
                </div>
                <h3 className="pilot-outcome__title">{label}</h3>
                <p className="pilot-outcome__sub">{sub}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
