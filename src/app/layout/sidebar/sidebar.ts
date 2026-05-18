import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LayoutService } from '../../core/services/layout.service';

interface NavItem {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent {
  private layout = inject(LayoutService);
  collapsed = signal(false);
  mobileMenuOpen = this.layout.mobileMenuOpen;

  readonly navItems: NavItem[] = [
    { label: 'Dashboard', icon: '📊', route: '/dashboard' },
    { label: 'Leaderboard', icon: '🏆', route: '/leaderboard' },
    { label: 'Matches', icon: '⚔️', route: '/matches' },
    { label: 'Players', icon: '👥', route: '/players' },
    { label: 'Analytics', icon: '📈', route: '/analytics' },
    { label: 'Settings', icon: '⚙️', route: '/settings' },
  ];

  toggle(): void {
    this.collapsed.update(v => !v);
  }

  closeMenu(): void {
    this.layout.closeMobileMenu();
  }
}
