export type SectorKey = 'healthcare' | 'food' | 'financial' | 'legal' | 'education' | 'corporate';

export type DashboardView =
  | 'condition'
  | 'packs'
  | 'interventions'
  | 'audit-trail'
  | 'privacy-log'
  | 'policy-settings';

export type GovernanceState = 'Normal' | 'Watch' | 'Elevated';

export type PackStatus = 'Draft' | 'Ready' | 'Compiled' | 'Reviewed';

export type InterventionStatus = 'Active' | 'Resolved' | 'Reviewed';

export type PrivacyBadge = 'Passed' | 'Suppressed' | 'Purged';

export type TeamRecord = {
  id: string;
  name: string;
  state: GovernanceState;
  participation: number;
  privacyGate: 'Passed' | 'Suppressed';
  latestAction: string;
  packReadiness: string;
};

export type PackRecord = {
  id: string;
  title: string;
  team: string;
  sector: string;
  dateRange: string;
  readiness: PackStatus;
};

export type InterventionRecord = {
  id: string;
  title: string;
  team: string;
  trigger: string;
  action: string;
  owner: string;
  status: InterventionStatus;
  outcome: string;
  followUpDate?: string;
  linkedPack?: string;
};

export type AuditEvent = {
  id: string;
  type: string;
  timestamp: string;
  actor: string;
  detail: string;
};

export type PrivacyLogEntry = {
  id: string;
  team: string;
  check: string;
  teamSize: number;
  threshold: number;
  badge: PrivacyBadge;
  period: string;
  message: string;
};

export type PolicySettings = {
  minTeamThreshold: number;
  reviewPeriodWeeks: number;
  evidenceRetentionMonths: number;
  watchThreshold: number;
  elevatedThreshold: number;
  sectorLabel: string;
  complianceLabel: string;
};

export type SectorMetrics = {
  teams: number;
  packsReady: number;
  elevated: number;
  privacyGate: string;
};

export type SectorData = {
  organisation: string;
  sectorLabel: string;
  teamTerm: string;
  metrics: SectorMetrics;
  trendPath: string;
  teams: TeamRecord[];
  packs: PackRecord[];
  interventions: InterventionRecord[];
  auditEvents: AuditEvent[];
  privacyLog: PrivacyLogEntry[];
  policy: PolicySettings;
};

export type DrawerKind = 'team' | 'pack' | 'intervention' | 'audit';

export type DrawerState =
  | { kind: 'team'; item: TeamRecord }
  | { kind: 'pack'; item: PackRecord }
  | { kind: 'intervention'; item: InterventionRecord }
  | { kind: 'audit'; item: AuditEvent }
  | null;

export const STATE_COLORS: Record<GovernanceState, string> = {
  Normal: '#0D9E72',
  Watch: '#C87A20',
  Elevated: '#B83228',
};

export const VIEW_LABELS: Record<DashboardView, string> = {
  condition: 'Condition Overview',
  packs: 'Evidence Packs',
  interventions: 'Interventions',
  'audit-trail': 'Audit Trail',
  'privacy-log': 'Privacy Log',
  'policy-settings': 'Policy Settings',
};

export const SIDEBAR_ITEMS: { group: string; view: DashboardView; label: string }[] = [
  { group: 'Evidence', view: 'condition', label: 'Condition' },
  { group: 'Evidence', view: 'packs', label: 'Packs' },
  { group: 'Evidence', view: 'interventions', label: 'Interventions' },
  { group: 'Audit', view: 'audit-trail', label: 'Audit Trail' },
  { group: 'Audit', view: 'privacy-log', label: 'Privacy Log' },
  { group: 'Config', view: 'policy-settings', label: 'Policy Settings' },
];

export const SECTOR_TABS: { key: SectorKey; label: string }[] = [
  { key: 'healthcare', label: 'Healthcare' },
  { key: 'food', label: 'Food' },
  { key: 'financial', label: 'Financial' },
  { key: 'legal', label: 'Legal' },
  { key: 'education', label: 'Education' },
  { key: 'corporate', label: 'Corporate' },
];
