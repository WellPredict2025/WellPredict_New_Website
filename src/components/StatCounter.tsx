interface StatCounterProps {
  value: number;
  suffix?: string;
  label: string;
  color?: string;
}

export default function StatCounter({ value, suffix = '', label, color = '#14B8A6' }: StatCounterProps) {
  return (
    <div className="flex flex-col items-center" style={{ gap: 6, textAlign: 'center' }}>
      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 'clamp(36px, 5vw, 56px)',
          fontWeight: 500,
          color,
          lineHeight: 1,
        }}
      >
        {value}
        {suffix}
      </span>
      <span style={{ fontSize: 13, color: '#64748B', fontWeight: 500 }}>{label}</span>
    </div>
  );
}
