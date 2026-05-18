export interface Player {
  rank: number;
  name: string;
  score: number;
  wins: number;
  losses: number;
  winRate: number;
  avatar: string;
}

export interface StatCard {
  label: string;
  value: string | number;
  icon: string;
  color: 'purple' | 'green' | 'blue' | 'orange';
}

export interface SessionData {
  date: string;
  sessions: number;
}

export interface Match {
  id: string;
  player1: string;
  player2: string;
  winner: string;
  mode: 'Ranked' | 'Casual' | 'Tournament';
  duration: string;
  score: string;
  date: string;
}

export interface AnalyticsData {
  matchesByMode: { Ranked: number; Casual: number; Tournament: number };
  totalMatches: number;
  mostActiveDay: string;
  topWinRate:  { name: string; rate: number  } | null;
  topRanked:   { name: string; score: number } | null;
}
