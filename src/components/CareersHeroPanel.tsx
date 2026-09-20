import { ArrowDown } from 'lucide-react';

const CHIPS = ['No open roles listed', 'Interest welcome', 'Mission-led team'] as const;

export default function CareersHeroPanel() {
  return (
    <div className="careers-hero-panel" aria-hidden="true">
      <div className="careers-hero-panel__header">
        <span className="careers-hero-panel__eyebrow">Careers</span>
        <p className="careers-hero-panel__title">Register interest</p>
      </div>

      <p className="careers-hero-panel__lead">
        We are building carefully and not advertising specific roles right now.
      </p>

      <p className="careers-hero-panel__support">
        If WellPredict&apos;s mission resonates with you, send us a short note about your background and the kind of work you would like to contribute to.
      </p>

      <div className="careers-hero-panel__chips">
        {CHIPS.map((chip) => (
          <span key={chip} className="careers-hero-panel__chip">
            {chip}
          </span>
        ))}
      </div>

      <a href="#careers-register" className="careers-hero-panel__cta">
        <ArrowDown strokeWidth={1.75} aria-hidden="true" />
        Register interest
      </a>
    </div>
  );
}
