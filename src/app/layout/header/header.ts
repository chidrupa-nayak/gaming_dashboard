import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { GameDataService } from '../../core/services/game-data.service';

@Component({
  selector: 'app-header',
  imports: [DatePipe],
  templateUrl: './header.html',
  styleUrl: './header.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, OnDestroy {
  private gameData = inject(GameDataService);

  currentTime = signal(new Date());
  private timer?: ReturnType<typeof setInterval>;

  get lastUpdated() {
    return this.gameData.lastUpdated;
  }

  ngOnInit(): void {
    this.timer = setInterval(() => this.currentTime.set(new Date()), 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }

  refresh(): void {
    this.gameData.refreshData();
  }
}
