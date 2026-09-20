import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';

const TRUST_CARDS = [
  {
    title: 'Pilot access open',
    body: 'We are inviting selected healthcare, food manufacturing, education, legal, and financial services teams to review pilot fit.',
  },
  {
    title: 'Designed for review conversations',
    body: 'The product is structured around the questions managers are commonly asked: what happened, what was done, and what changed.',
  },
  {
    title: 'Privacy-gated by design',
    body: 'Evidence is created at team level, with threshold checks before records are shown.',
  },
] as const;

export default function TrustProof() {
  return (
    <section className="trust-proof section-padding" aria-labelledby="trust-proof-heading">
      <div className="trust-proof__inner">
        <ScrollReveal direction="up" className="trust-proof__header">
          <h2 id="trust-proof-heading" className="trust-proof__title">
            Built for regulated teams preparing for review.
          </h2>
          <p className="trust-proof__support">
            WellPredict is being shaped for organisations that need clearer evidence around operating conditions, management action, and outcome review.
          </p>
        </ScrollReveal>

        <ul className="trust-proof__grid">
          {TRUST_CARDS.map((card, index) => (
            <li key={card.title}>
              <ScrollReveal direction="up" delay={70 + index * 50}>
                <article className="trust-proof__card">
                  <h3>{card.title}</h3>
                  <p>{card.body}</p>
                </article>
              </ScrollReveal>
            </li>
          ))}
        </ul>

        <ScrollReveal direction="up" delay={220} className="trust-proof__actions">
          <Link to="/pilot" className="btn-primary" style={{ textDecoration: 'none' }}>
            Request Pilot
          </Link>
          <Link to="/contact" className="btn-secondary" style={{ textDecoration: 'none' }}>
            Contact
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
