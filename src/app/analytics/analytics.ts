import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData } from 'chart.js';
import { GameDataService } from '../core/services/game-data.service';

@Component({
  selector: 'app-analytics',
  imports: [BaseChartDirective],
  templateUrl: './analytics.html',
  styleUrl: './analytics.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnalyticsComponent {
  private gameData = inject(GameDataService);

  readonly metrics = computed(() => {
    const d = this.gameData.analyticsData();
    return [
      {
        label: 'Champion',
        value: d?.topRanked ? d.topRanked.name : '—',
        sub:   d?.topRanked ? `${d.topRanked.score.toLocaleString()} pts` : '',
        icon: '🥇',
      },
      {
        label: 'Most Active Day',
        value: d ? d.mostActiveDay : '—',
        sub:   '',
        icon: '📅',
      },
      {
        label: 'Top Win Rate',
        value: d?.topWinRate ? `${d.topWinRate.rate}%` : '—',
        sub:   d?.topWinRate ? d.topWinRate.name : '',
        icon: '🏅',
      },
      {
        label: 'Total Matches',
        value: d ? d.totalMatches.toLocaleString() : '—',
        sub:   '',
        icon: '🎮',
      },
    ];
  });

  sessionsData = computed<ChartData<'line'>>(() => {
    const sessions = this.gameData.sessions();
    return {
      labels: sessions.map(s => s.date),
      datasets: [{
        label: 'Active Sessions',
        data: sessions.map(s => s.sessions),
        borderColor: '#7de2d1',
        backgroundColor: 'rgba(51, 153, 137, 0.15)',
        pointBackgroundColor: '#7de2d1',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 5,
        fill: true,
        tension: 0.4,
      }]
    };
  });

  matchesByModeData = computed<ChartData<'bar'>>(() => {
    const d = this.gameData.analyticsData();
    return {
      labels: ['Ranked', 'Casual', 'Tournament'],
      datasets: [{
        label: 'Matches Played',
        data: d
          ? [d.matchesByMode.Ranked, d.matchesByMode.Casual, d.matchesByMode.Tournament]
          : [0, 0, 0],
        backgroundColor: [
          'rgba(51, 153, 137, 0.75)',
          'rgba(125, 226, 209, 0.45)',
          'rgba(51, 153, 137, 0.45)',
        ],
        borderColor: ['#339989', '#7de2d1', '#339989'],
        borderWidth: 1,
        borderRadius: 5,
      }]
    };
  });

  private readonly chartScales: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#2b2c28',
        titleColor: '#7de2d1',
        bodyColor: '#fffafb',
        borderColor: 'rgba(125, 226, 209, 0.2)',
        borderWidth: 1,
      }
    },
    scales: {
      x: {
        grid: { color: 'rgba(17, 24, 39, 0.07)' },
        ticks: { color: 'rgba(17, 24, 39, 0.45)' },
        border: { color: 'rgba(17, 24, 39, 0.1)' }
      },
      y: {
        grid: { color: 'rgba(17, 24, 39, 0.07)' },
        ticks: { color: 'rgba(17, 24, 39, 0.45)' },
        border: { color: 'rgba(17, 24, 39, 0.1)' }
      }
    }
  };

  lineOptions: ChartConfiguration<'line'>['options'] = this.chartScales as ChartConfiguration<'line'>['options'];
  barOptions:  ChartConfiguration<'bar'>['options']  = this.chartScales as ChartConfiguration<'bar'>['options'];
}
