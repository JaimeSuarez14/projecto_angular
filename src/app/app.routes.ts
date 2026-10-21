import { Routes } from '@angular/router';
import { LayoutPublico } from './layout/layout-publico';

/**
 * Enrutado de la aplicación. El layout (navbar + footer) es el marco común
 * y cada página se carga con `loadComponent` (lazy loading standalone).
 */
export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'bienvenido' },
  {
    path: '',
    component: LayoutPublico,
    children: [
      {
        path: 'bienvenido',
        loadComponent: () => import('./paginas/bienvenido/bienvenido').then((m) => m.Bienvenido),
        title: 'Cevichería Suárez | Bienvenido, la frescura del mar',
      },
      {
        path: 'carta',
        loadComponent: () => import('./paginas/carta/carta').then((m) => m.Carta),
        title: 'La Carta | Cevichería Suárez',
      },
      {
        path: 'reservas',
        loadComponent: () => import('./paginas/reservas/reservas').then((m) => m.Reservas),
        title: 'Reservas | Cevichería Suárez',
      },
      {
        path: 'historia',
        loadComponent: () => import('./paginas/historia/historia').then((m) => m.Historia),
        title: 'Nuestra Historia | Cevichería Suárez',
      },
      {
        path: 'contacto',
        loadComponent: () => import('./paginas/contacto/contacto').then((m) => m.Contacto),
        title: 'Locales y Contacto | Cevichería Suárez',
      },
    ],
  },
  { path: '**', redirectTo: 'bienvenido' },
];
