import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { GameDataService } from '../core/services/game-data.service';
import { SettingsService } from '../core/services/settings.service';

@Component({
  selector: 'app-leaderboard-page',
  imports: [DecimalPipe],
  templateUrl: './leaderboard-page.html',
  styleUrl: './leaderboard-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeaderboardPageComponent {
  private gameData   = inject(GameDataService);
  protected settings = inject(SettingsService);

  searchTerm = signal('');

  filtered = computed(() => {
    const term = this.searchTerm().toLowerCase();
    return this.gameData.players()
      .filter(p => p.name.toLowerCase().includes(term))
      .sort((a, b) => a.rank - b.rank);
  });

  onSearch(e: Event): void {
    this.searchTerm.set((e.target as HTMLInputElement).value);
  }

  rankMedal(rank: number): string {
    return rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : `#${rank}`;
  }

  rankClass(rank: number): string {
    return rank === 1 ? 'gold' : rank === 2 ? 'silver' : rank === 3 ? 'bronze' : '';
  }
}
