import { ChangeDetectionStrategy, Component, effect, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { GameDataService, INTERVAL_MS } from '../../core/services/game-data.service';

@Component({
  selector: 'app-header',
  imports: [DatePipe],
  templateUrl: './header.html',
  styleUrl: './header.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, OnDestroy {
  private gameData = inject(GameDataService);

  currentTime  = signal(new Date());
  lastUpdated  = this.gameData.lastUpdated;

  private clockTimer?:   ReturnType<typeof setInterval>;
  private refreshTimer?: ReturnType<typeof setInterval>;

  constructor() {
    effect(() => {
      const ms = INTERVAL_MS[this.gameData.refreshInterval()];
      clearInterval(this.refreshTimer);
      if (ms > 0) {
        this.refreshTimer = setInterval(() => this.gameData.refreshData(), ms);
      }
    });
  }

  ngOnInit(): void {
    this.clockTimer = setInterval(() => this.currentTime.set(new Date()), 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.clockTimer);
    clearInterval(this.refreshTimer);
  }

  refresh(): void {
    this.gameData.refreshData();
  }
}
