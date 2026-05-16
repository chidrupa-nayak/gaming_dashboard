import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StatsCardsComponent } from './components/stats-cards/stats-cards';
import { LeaderboardComponent } from './components/leaderboard/leaderboard';
import { SessionsChartComponent } from './components/sessions-chart/sessions-chart';

@Component({
  selector: 'app-dashboard',
  imports: [StatsCardsComponent, LeaderboardComponent, SessionsChartComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {}
