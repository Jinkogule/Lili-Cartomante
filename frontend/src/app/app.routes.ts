import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home').then(m => m.Home) },
  { path: 'sobre-mim', loadComponent: () => import('./pages/sobre-mim/sobre-mim').then(m => m.SobreMim) },
  { path: 'contato', loadComponent: () => import('./pages/contato/contato').then(m => m.Contato) },
  { path: 'agendamento', loadComponent: () => import('./pages/agendamento/agendamento').then(m => m.Agendamento) },
  { path: 'blog', loadComponent: () => import('./pages/blog/blog').then(m => m.Blog) },
  { path: 'blog/:id', loadComponent: () => import('./pages/post/post').then(m => m.Post) }
];
