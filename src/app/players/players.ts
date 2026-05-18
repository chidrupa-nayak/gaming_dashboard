import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { GameDataService } from '../core/services/game-data.service';
import { SettingsService } from '../core/services/settings.service';

@Component({
  selector: 'app-players',
  imports: [DecimalPipe],
  templateUrl: './players.html',
  styleUrl: './players.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayersComponent {
  protected gameData = inject(GameDataService);
  protected settings = inject(SettingsService);

  searchTerm = signal('');
  showForm   = signal(false);
  fName      = signal('');
  submitting = signal(false);

  filtered = computed(() => {
    const term = this.searchTerm().toLowerCase();
    return this.gameData.players()
      .filter(p => p.name.toLowerCase().includes(term))
      .sort((a, b) => a.rank - b.rank);
  });

  onSearch(e: Event): void { this.searchTerm.set((e.target as HTMLInputElement).value); }
  setName(e: Event): void { this.fName.set((e.target as HTMLInputElement).value); }
  toggleForm(): void { this.showForm.update(v => !v); }

  rankMedal(rank: number): string {
    return rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : `#${rank}`;
  }

  submit(): void {
    const name = this.fName().trim();
    if (!name) return;
    this.submitting.set(true);
    this.gameData.addPlayer(name).subscribe({
      next: () => {
        this.fName.set('');
        this.showForm.set(false);
        this.submitting.set(false);
      },
      error: () => this.submitting.set(false),
    });
  }
}
