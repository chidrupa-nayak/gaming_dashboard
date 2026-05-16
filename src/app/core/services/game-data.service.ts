import { Injectable, signal, computed } from '@angular/core';
import { Player, StatCard, SessionData, Match } from '../../shared/models/game.models';
import { PLAYERS, SESSIONS, STATS, MATCHES } from '../../shared/fixtures';

export type RefreshInterval = 'off' | '30s' | '60s' | '5m';

export const INTERVAL_MS: Record<RefreshInterval, number> = {
  off: 0,
  '30s': 30_000,
  '60s': 60_000,
  '5m':  300_000,
};

@Injectable({ providedIn: 'root' })
export class GameDataService {
  readonly players         = signal<Player[]>(PLAYERS);
  readonly stats           = signal<StatCard[]>(STATS);
  readonly sessions        = signal<SessionData[]>(SESSIONS);
  readonly matches         = signal<Match[]>(MATCHES);
  readonly lastUpdated     = signal<Date>(new Date());
  readonly refreshInterval = signal<RefreshInterval>('60s');

  readonly topPlayer     = computed(() => this.players()[0]);
  readonly totalSessions = computed(() =>
    this.sessions().reduce((sum, d) => sum + d.sessions, 0)
  );

  refreshData(): void {
    this.players.update(list =>
      list.map(p => ({ ...p, score: p.score + Math.floor(Math.random() * 100 - 50) }))
    );
    this.lastUpdated.set(new Date());
  }
}
