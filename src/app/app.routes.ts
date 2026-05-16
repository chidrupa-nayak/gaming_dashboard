import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard').then(m => m.DashboardComponent)
  },
  {
    path: 'leaderboard',
    loadComponent: () => import('./leaderboard/leaderboard-page').then(m => m.LeaderboardPageComponent)
  },
  {
    path: 'matches',
    loadComponent: () => import('./matches/matches').then(m => m.MatchesComponent)
  },
  {
    path: 'players',
    loadComponent: () => import('./players/players').then(m => m.PlayersComponent)
  },
  {
    path: 'analytics',
    loadComponent: () => import('./analytics/analytics').then(m => m.AnalyticsComponent)
  },
  {
    path: 'settings',
    loadComponent: () => import('./settings/settings').then(m => m.SettingsComponent)
  },
  { path: '**', redirectTo: 'dashboard' }
];
