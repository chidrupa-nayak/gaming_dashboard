import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { GameDataService, RefreshInterval } from '../core/services/game-data.service';

@Component({
  selector: 'app-settings',
  imports: [],
  templateUrl: './settings.html',
  styleUrl: './settings.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent {
  private gameData = inject(GameDataService);

  refreshInterval = this.gameData.refreshInterval;
  compactMode     = signal(false);
  showAvatars     = signal(true);
  showWinRate     = signal(true);
  saved           = signal(false);

  readonly intervals: { value: RefreshInterval; label: string }[] = [
    { value: 'off', label: 'Off'    },
    { value: '30s', label: '30 sec' },
    { value: '60s', label: '1 min'  },
    { value: '5m',  label: '5 min'  },
  ];

  setInterval(v: RefreshInterval): void {
    this.gameData.refreshInterval.set(v);
  }

  toggle(s: ReturnType<typeof signal<boolean>>): void {
    s.update(v => !v);
  }

  save(): void {
    this.saved.set(true);
    setTimeout(() => this.saved.set(false), 2200);
  }
}
