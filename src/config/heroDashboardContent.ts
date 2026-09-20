export type DashboardSectorKey =
  | 'healthcare'
  | 'food'
  | 'financial'
  | 'education'
  | 'legal'
  | 'corporate';

export type DashboardTeamRow = {
  name: string;
  state: string;
  color: string;
};

export type HeroDashboardContent = {
  organisation: string;
  sector: string;
  subtitle: string;
  privacyGate: { title: string; primary: string; secondary: string };
  evidencePacks: { title: string; primary: string; secondary: string };
  monitored: { title: string; primary: string; secondary: string };
  liveTeamsTitle: string;
  teams: DashboardTeamRow[];
};

const STATE_COLORS = {
  Normal: '#10B981',
  Watch: '#F59E0B',
  Elevated: '#EF4444',
} as const;

function team(name: string, state: keyof typeof STATE_COLORS): DashboardTeamRow {
  return { name, state, color: STATE_COLORS[state] };
}

export const HERO_DASHBOARD_BY_SECTOR: Record<DashboardSectorKey, HeroDashboardContent> = {
  healthcare: {
    organisation: 'Healthcare Organisation',
    sector: 'Healthcare',
    subtitle: 'Aggregated team signals, no individual tracking',
    privacyGate: { title: 'Privacy gate', primary: 'PASS', secondary: 'Team size 14' },
    evidencePacks: { title: 'Evidence packs', primary: '7 READY', secondary: '2 in review' },
    monitored: { title: 'Teams monitored', primary: '24', secondary: 'Across 4 units' },
    liveTeamsTitle: 'Live teams',
    teams: [
      team('Ward Alpha', 'Normal'),
      team('Ward Beta', 'Watch'),
      team('Night Shift Team', 'Elevated'),
    ],
  },
  food: {
    organisation: 'WellPredict Human HACCP - Food Manufacturing',
    sector: 'Food Manufacturing',
    subtitle: 'Aggregated production team signals, no individual tracking',
    privacyGate: { title: 'Privacy gate', primary: 'PASS', secondary: 'Shift team size 14' },
    evidencePacks: { title: 'Evidence packs', primary: '7 READY', secondary: '2 in review' },
    monitored: { title: 'Lines monitored', primary: '24', secondary: 'Across 4 production areas' },
    liveTeamsTitle: 'Live production teams',
    teams: [
      team('Line One', 'Normal'),
      team('Packing Team', 'Watch'),
      team('Quality Team', 'Elevated'),
    ],
  },
  financial: {
    organisation: 'Financial Services Organisation',
    sector: 'Financial Services',
    subtitle: 'Aggregated desk signals, no individual tracking',
    privacyGate: { title: 'Privacy gate', primary: 'PASS', secondary: 'Desk size 12' },
    evidencePacks: { title: 'Evidence packs', primary: '7 READY', secondary: '2 in review' },
    monitored: { title: 'Desks monitored', primary: '18', secondary: 'Across 3 regions' },
    liveTeamsTitle: 'Live teams',
    teams: [
      team('Operations Risk', 'Normal'),
      team('Controls Team', 'Watch'),
      team('Compliance Team', 'Elevated'),
    ],
  },
  education: {
    organisation: 'Education Organisation',
    sector: 'Education',
    subtitle: 'Aggregated team signals, no individual tracking',
    privacyGate: { title: 'Privacy gate', primary: 'PASS', secondary: 'Team size 14' },
    evidencePacks: { title: 'Evidence packs', primary: '7 READY', secondary: '2 in review' },
    monitored: { title: 'Teams monitored', primary: '24', secondary: 'Across 4 departments' },
    liveTeamsTitle: 'Live teams',
    teams: [
      team('Year Seven Team', 'Normal'),
      team('Learning Support Team', 'Watch'),
      team('Safeguarding Team', 'Elevated'),
    ],
  },
  legal: {
    organisation: 'Legal Services Organisation',
    sector: 'Legal Services',
    subtitle: 'Aggregated team signals, no individual tracking',
    privacyGate: { title: 'Privacy gate', primary: 'PASS', secondary: 'Team size 14' },
    evidencePacks: { title: 'Evidence packs', primary: '7 READY', secondary: '2 in review' },
    monitored: { title: 'Teams monitored', primary: '24', secondary: 'Across 4 practice groups' },
    liveTeamsTitle: 'Live teams',
    teams: [
      team('Casework Team', 'Normal'),
      team('Fee-earner Team', 'Watch'),
      team('Compliance Team', 'Elevated'),
    ],
  },
  corporate: {
    organisation: 'Corporate Governance Team',
    sector: 'Corporate Governance',
    subtitle: 'Aggregated team signals, no individual tracking',
    privacyGate: { title: 'Privacy gate', primary: 'PASS', secondary: 'Team size 14' },
    evidencePacks: { title: 'Evidence packs', primary: '6 READY', secondary: '2 in review' },
    monitored: { title: 'Teams monitored', primary: '14', secondary: 'Across 4 functions' },
    liveTeamsTitle: 'Live teams',
    teams: [
      team('Operations', 'Normal'),
      team('People Operations', 'Watch'),
      team('Finance Team', 'Elevated'),
    ],
  },
};

export function sectorToDashboardKey(sector: string): DashboardSectorKey {
  const key = sector.toLowerCase();
  if (key.includes('food')) return 'food';
  if (key.includes('education')) return 'education';
  if (key.includes('corporate')) return 'corporate';
  if (key.includes('financial')) return 'financial';
  if (key.includes('legal')) return 'legal';
  return 'healthcare';
}

export function getHeroDashboardContent(sector: string | DashboardSectorKey): HeroDashboardContent {
  if (sector in HERO_DASHBOARD_BY_SECTOR) {
    return HERO_DASHBOARD_BY_SECTOR[sector as DashboardSectorKey];
  }
  return HERO_DASHBOARD_BY_SECTOR[sectorToDashboardKey(sector)];
}
