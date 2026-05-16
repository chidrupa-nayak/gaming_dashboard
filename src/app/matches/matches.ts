import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { GameDataService } from '../core/services/game-data.service';
import { Match } from '../shared/models/game.models';

type ModeFilter = 'All' | 'Ranked' | 'Casual' | 'Tournament';

@Component({
  selector: 'app-matches',
  imports: [],
  templateUrl: './matches.html',
  styleUrl: './matches.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatchesComponent {
  private gameData = inject(GameDataService);

  activeFilter = signal<ModeFilter>('All');
  readonly filters: ModeFilter[] = ['All', 'Ranked', 'Casual', 'Tournament'];

  filtered = computed(() => {
    const f = this.activeFilter();
    const matches = this.gameData.matches();
    return f === 'All' ? matches : matches.filter(m => m.mode === f);
  });

  setFilter(f: ModeFilter): void {
    this.activeFilter.set(f);
  }

  modeClass(mode: Match['mode']): string {
    return mode === 'Ranked' ? 'ranked' : mode === 'Tournament' ? 'tournament' : 'casual';
  }
}
