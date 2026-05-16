import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GameDataService } from '../../../core/services/game-data.service';

@Component({
  selector: 'app-stats-cards',
  imports: [],
  templateUrl: './stats-cards.html',
  styleUrl: './stats-cards.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatsCardsComponent {
  private gameData = inject(GameDataService);
  stats = this.gameData.stats;
}
