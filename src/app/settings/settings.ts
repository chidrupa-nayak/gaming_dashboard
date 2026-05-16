import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

type Interval = 'off' | '30s' | '60s' | '5m';

@Component({
  selector: 'app-settings',
  imports: [],
  templateUrl: './settings.html',
  styleUrl: './settings.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent {
  refreshInterval = signal<Interval>('60s');
  compactMode     = signal(false);
  showAvatars     = signal(true);
  showWinRate     = signal(true);
  saved           = signal(false);

  readonly intervals: { value: Interval; label: string }[] = [
    { value: 'off', label: 'Off'    },
    { value: '30s', label: '30 sec' },
    { value: '60s', label: '1 min'  },
    { value: '5m',  label: '5 min'  },
  ];

  setInterval(v: Interval): void {
    this.refreshInterval.set(v);
  }

  toggle(s: ReturnType<typeof signal<boolean>>): void {
    s.update(v => !v);
  }

  save(): void {
    this.saved.set(true);
    setTimeout(() => this.saved.set(false), 2200);
  }
}
