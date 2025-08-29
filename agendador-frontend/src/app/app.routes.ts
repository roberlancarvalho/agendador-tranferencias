import { Routes } from '@angular/router';
import { FormComponent } from './features/transferencias/form/form.component';
import { ListaComponent } from './features/transferencias/lista/lista.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'transferencias' },
  { path: 'transferencias', component: ListaComponent },
  { path: 'transferencias/nova', component: FormComponent },

  { path: '**', redirectTo: 'transferencias' },
];
