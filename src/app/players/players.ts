import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { GameDataService } from '../core/services/game-data.service';

@Component({
  selector: 'app-players',
  imports: [DecimalPipe],
  templateUrl: './players.html',
  styleUrl: './players.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayersComponent {
  private gameData = inject(GameDataService);

  searchTerm = signal('');

  filtered = computed(() => {
    const term = this.searchTerm().toLowerCase();
    return this.gameData.players().filter(p =>
      p.name.toLowerCase().includes(term)
    );
  });

  onSearch(e: Event): void {
    this.searchTerm.set((e.target as HTMLInputElement).value);
  }

  rankMedal(rank: number): string {
    return rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : `#${rank}`;
  }
}
