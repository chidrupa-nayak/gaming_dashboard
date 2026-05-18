import { Injectable, signal, effect } from '@angular/core';

const STORAGE_KEY = 'gd-settings';

@Injectable({ providedIn: 'root' })
export class SettingsService {
  readonly showAvatars = signal(true);
  readonly showWinRate = signal(true);

  constructor() {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}');
      if (stored.showAvatars !== undefined) this.showAvatars.set(stored.showAvatars);
      if (stored.showWinRate !== undefined) this.showWinRate.set(stored.showWinRate);
    } catch {}

    // auto-persist whenever any setting changes
    effect(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        showAvatars:  this.showAvatars(),
        showWinRate:  this.showWinRate(),
      }));
    });
  }
}
