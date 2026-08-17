export default function GovernanceStateBadge({ state, size = 'sm' }: { state: 'Normal' | 'Watch' | 'Elevated'; size?: 'sm' | 'md' }) {
  const colors = { Normal: '#10B981', Watch: '#F59E0B', Elevated: '#EF4444' };
  const color = colors[state];
  return (
    <span
      style={{
        fontSize: size === 'sm' ? 9 : 11,
        fontWeight: 600,
        color,
        background: `${color}18`,
        padding: size === 'sm' ? '2px 8px' : '4px 12px',
        borderRadius: 999,
        letterSpacing: '0.02em',
      }}
    >
      {state}
    </span>
  );
}
