import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <nav style="display:flex; gap:12px; margin-bottom:12px">
      <a routerLink="/transferencias" routerLinkActive="active">Lista</a>
      <a routerLink="/transferencias/nova" routerLinkActive="active">Nova</a>
    </nav>
    <router-outlet />
  `,
})
export class App {}
