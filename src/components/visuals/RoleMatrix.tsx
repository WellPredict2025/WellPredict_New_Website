const ROLES = ['Admin', 'Manager', 'Auditor', 'Viewer'] as const;
const PERMISSIONS = ['View team metrics', 'Log actions', 'Compile packs', 'Export records', 'Manage users'] as const;

const MATRIX: Record<(typeof ROLES)[number], boolean[]> = {
  Admin: [true, true, true, true, true],
  Manager: [true, true, true, false, false],
  Auditor: [true, false, false, true, false],
  Viewer: [true, false, false, false, false],
};

const AUDIT_EVENTS = [
  { time: '09:14', event: 'Sign in', user: 'Governance lead' },
  { time: '09:22', event: 'Privacy gate passed', user: 'Ward Alpha' },
  { time: '10:05', event: 'Action recorded', user: 'Manager' },
  { time: '14:30', event: 'Pack compiled', user: 'Evidence owner' },
];

const LAYERS = [
  { num: 1, title: 'User access', desc: 'Authenticated sessions with role assignment' },
  { num: 2, title: 'Role permissions', desc: 'Granular access to metrics, actions, and packs' },
  { num: 3, title: 'Evidence activity', desc: 'Logged governance events with timestamps' },
  { num: 4, title: 'Audit trail', desc: 'Append-only record integrity' },
];

export default function RoleMatrix() {
  return (
    <div className="role-matrix">
      <div className="role-matrix__layers" aria-label="Security architecture layers">
        {LAYERS.map((layer) => (
          <div key={layer.num} className="role-matrix__layer">
            <span className="role-matrix__layer-num">{layer.num}</span>
            <div>
              <strong>{layer.title}</strong>
              <p>{layer.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="role-matrix__grid-wrap">
        <span className="role-matrix__label">Role-based access matrix</span>
        <div className="role-matrix__table-wrap">
          <table className="role-matrix__table">
            <thead>
              <tr>
                <th scope="col">Role</th>
                {PERMISSIONS.map((p) => (
                  <th key={p} scope="col">{p.replace(' ', '\u00a0')}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROLES.map((role) => (
                <tr key={role}>
                  <th scope="row">{role}</th>
                  {MATRIX[role].map((allowed, i) => (
                    <td key={PERMISSIONS[i]}>
                      <span className={`role-matrix__cell${allowed ? ' role-matrix__cell--yes' : ' role-matrix__cell--no'}`} aria-label={allowed ? 'Allowed' : 'Not allowed'}>
                        {allowed ? '✓' : '—'}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="role-matrix__audit">
        <span className="role-matrix__label">Audit event stream</span>
        <ul className="role-matrix__events">
          {AUDIT_EVENTS.map((e) => (
            <li key={e.time + e.event}>
              <span className="role-matrix__event-time">{e.time}</span>
              <span className="role-matrix__event-name">{e.event}</span>
              <span className="role-matrix__event-user">{e.user}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
