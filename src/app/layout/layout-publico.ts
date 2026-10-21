import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './navbar/navbar';
import { Footer } from './footer/footer';

/**
 * Layout de las páginas públicas: navbar fijo arriba, contenido enrutado
 * abajo (lazy loading) y footer al cierre. La landing (Bienvenido) y el resto
 * de secciones se renderizan dentro de este marco.
 */
@Component({
  selector: 'app-layout-publico',
  standalone: true,
  imports: [RouterOutlet, Navbar, Footer],
  templateUrl: './layout-publico.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutPublico {}
