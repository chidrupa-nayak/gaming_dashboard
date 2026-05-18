import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { GameDataService } from '../core/services/game-data.service';
import { TimeAgoPipe } from '../shared/pipes/time-ago.pipe';
import { Match } from '../shared/models/game.models';

type ModeFilter = 'All' | 'Ranked' | 'Casual' | 'Tournament';

@Component({
  selector: 'app-matches',
  imports: [TimeAgoPipe],
  templateUrl: './matches.html',
  styleUrl: './matches.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatchesComponent {
  private gameData = inject(GameDataService);

  activeFilter = signal<ModeFilter>('All');
  readonly filters: ModeFilter[] = ['All', 'Ranked', 'Casual', 'Tournament'];
  readonly modes: Match['mode'][] = ['Ranked', 'Casual', 'Tournament'];

  players = this.gameData.players;

  filtered = computed(() => {
    const f = this.activeFilter();
    const matches = this.gameData.matches();
    return f === 'All' ? matches : matches.filter(m => m.mode === f);
  });

  showForm   = signal(false);
  fPlayer1   = signal('');
  fPlayer2   = signal('');
  fWinner    = signal('');
  fMode      = signal<Match['mode']>('Ranked');
  fScore     = signal('');
  fDuration  = signal('');
  submitting = signal(false);

  setFilter(f: ModeFilter): void { this.activeFilter.set(f); }

  modeClass(mode: Match['mode']): string {
    return mode === 'Ranked' ? 'ranked' : mode === 'Tournament' ? 'tournament' : 'casual';
  }

  toggleForm(): void { this.showForm.update(v => !v); }

  setPlayer1(e: Event): void { this.fPlayer1.set((e.target as HTMLSelectElement).value); this.fWinner.set(''); }
  setPlayer2(e: Event): void { this.fPlayer2.set((e.target as HTMLSelectElement).value); this.fWinner.set(''); }
  setWinner(e: Event):  void { this.fWinner.set((e.target as HTMLSelectElement).value); }
  setMode(e: Event):    void { this.fMode.set((e.target as HTMLSelectElement).value as Match['mode']); }
  setScore(e: Event):   void { this.fScore.set((e.target as HTMLInputElement).value); }
  setDuration(e: Event): void { this.fDuration.set((e.target as HTMLInputElement).value); }

  submit(): void {
    const p1 = this.fPlayer1();
    const p2 = this.fPlayer2();
    const w  = this.fWinner();
    if (!p1 || !p2 || !w || p1 === p2) return;

    this.submitting.set(true);
    this.gameData.addMatch({
      player1:  p1,
      player2:  p2,
      winner:   w,
      mode:     this.fMode(),
      score:    this.fScore()    || '—',
      duration: this.fDuration() || '—',
    }).subscribe({
      next: () => {
        this.fPlayer1.set(''); this.fPlayer2.set('');
        this.fWinner.set('');  this.fScore.set('');
        this.fDuration.set('');
        this.showForm.set(false);
        this.submitting.set(false);
      },
      error: () => this.submitting.set(false),
    });
  }
}
