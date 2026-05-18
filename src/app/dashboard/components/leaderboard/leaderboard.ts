import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { GameDataService } from '../../../core/services/game-data.service';
import { SettingsService } from '../../../core/services/settings.service';

@Component({
  selector: 'app-leaderboard',
  imports: [DecimalPipe],
  templateUrl: './leaderboard.html',
  styleUrl: './leaderboard.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeaderboardComponent {
  private gameData = inject(GameDataService);
  protected settings = inject(SettingsService);
  players = this.gameData.players;

  rankMedal(rank: number): string {
    return rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : `#${rank}`;
  }

  rankClass(rank: number): string {
    return rank === 1 ? 'gold' : rank === 2 ? 'silver' : rank === 3 ? 'bronze' : '';
  }
}
