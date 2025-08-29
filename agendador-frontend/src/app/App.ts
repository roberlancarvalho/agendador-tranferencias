import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, MatToolbarModule, MatButtonModule],
  template: `
    <mat-toolbar color="primary">
      <span style="flex: 1; text-align: center;">Agendador</span>
      <a mat-button routerLink="/transferencias" routerLinkActive="mat-mdc-button-base">Lista</a>
      <a mat-button routerLink="/transferencias/nova" routerLinkActive="mat-mdc-button-base"
        >Nova</a
      >
    </mat-toolbar>
    <div style="padding:16px">
      <router-outlet />
    </div>
  `,
})
export class App {}
