import { inject, Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, EMPTY, Observable } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { Player, StatCard, SessionData, Match, AnalyticsData } from '../../shared/models/game.models';
import { environment } from '../../../environments/environment';

export type RefreshInterval = 'off' | '30s' | '60s' | '5m';

export const INTERVAL_MS: Record<RefreshInterval, number> = {
  off:   0,
  '30s': 30_000,
  '60s': 60_000,
  '5m':  300_000,
};

@Injectable({ providedIn: 'root' })
export class GameDataService {
  private http = inject(HttpClient);
  private readonly api = environment.apiUrl;

  readonly players       = signal<Player[]>([]);
  readonly stats         = signal<StatCard[]>([]);
  readonly sessions      = signal<SessionData[]>([]);
  readonly matches       = signal<Match[]>([]);
  readonly analyticsData = signal<AnalyticsData | null>(null);
  readonly lastUpdated   = signal<Date>(new Date());
  readonly refreshInterval = signal<RefreshInterval>('60s');
  readonly loading       = signal(false);
  readonly error         = signal<string | null>(null);

  readonly topPlayer     = computed(() => this.players()[0] ?? null);
  readonly totalSessions = computed(() =>
    this.sessions().reduce((sum, d) => sum + d.sessions, 0)
  );

  constructor() {
    this.loadAll();
  }

  private loadAll(): void {
    this.loading.set(true);
    this.error.set(null);

    forkJoin({
      players:   this.http.get<Player[]>(`${this.api}/players`),
      stats:     this.http.get<StatCard[]>(`${this.api}/stats`),
      sessions:  this.http.get<SessionData[]>(`${this.api}/sessions`),
      matches:   this.http.get<Match[]>(`${this.api}/matches`),
      analytics: this.http.get<AnalyticsData>(`${this.api}/analytics`),
    }).pipe(
      catchError(() => {
        this.error.set('Failed to load data. Check your connection and try again.');
        return EMPTY;
      }),
      finalize(() => this.loading.set(false))
    ).subscribe(data => {
      this.players.set(data.players);
      this.stats.set(data.stats);
      this.sessions.set(data.sessions);
      this.matches.set(data.matches);
      this.analyticsData.set(data.analytics);
    });
  }

  refreshData(): void {
    this.loadAll();
    this.lastUpdated.set(new Date());
  }

  addMatch(payload: Omit<Match, 'id' | 'date'>): Observable<Match> {
    return this.http.post<Match>(`${this.api}/matches`, payload).pipe(
      tap(() => this.loadAll())
    );
  }

  addPlayer(name: string): Observable<Player> {
    return this.http.post<Player>(`${this.api}/players`, { name }).pipe(
      tap(() => this.loadAll())
    );
  }
}
