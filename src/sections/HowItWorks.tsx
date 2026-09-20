import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';

const STEPS = [
  {
    num: '01',
    title: 'Collect',
    body: 'Team-level signals are captured through short, privacy-gated submissions.',
  },
  {
    num: '02',
    title: 'Detect',
    body: 'Operating conditions are classified as Normal, Watch, or Elevated.',
  },
  {
    num: '03',
    title: 'Act',
    body: 'Managers record the action taken, the reason, and the team affected.',
  },
  {
    num: '04',
    title: 'Compile',
    body: 'The signal, action, outcome, and audit trail become one evidence pack.',
  },
] as const;

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="how-section">
      <ScrollReveal direction="up" className="how-header">
        <span className="eyebrow">HOW IT WORKS</span>
        <h2 className="how-header-title">Four steps. No admin.</h2>
        <p className="how-header-support">
          WellPredict turns team-level signals into a connected evidence record without creating extra admin for managers.
        </p>
      </ScrollReveal>

      <div className="how-steps-flow">
        {STEPS.map((step, index) => (
          <ScrollReveal key={step.num} direction="up" delay={80 + index * 60}>
            <article className="how-steps-flow__card">
              {index < STEPS.length - 1 ? (
                <span className="how-steps-flow__connector" aria-hidden="true" />
              ) : null}
              <span className="how-steps-flow__num">{step.num}</span>
              <h3 className="how-steps-flow__title">{step.title}</h3>
              <p className="how-steps-flow__body">{step.body}</p>
            </article>
          </ScrollReveal>
        ))}
      </div>

      <div className="how-steps-flow__cta-wrap">
        <Link to="/how-it-works" className="how-steps-flow__cta">
          Explore the full workflow
        </Link>
      </div>
    </section>
  );
}
