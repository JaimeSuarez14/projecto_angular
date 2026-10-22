import {
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ProductoService } from '../../catalogo/producto-service';

/**
 * Navbar fijo de la marca. El menú móvil y el estado de scroll se manejan
 * con Signals puros (arquitectura zoneless: sin RxJS ni zone.js).
 */
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(window:scroll)': 'alDesplazar()',
    '(document:keydown.escape)': 'cerrarMenu()',
  },
})
export class Navbar {
  private readonly servicioProducto = inject(ProductoService);
  private readonly documento = inject(DOCUMENT);
  protected readonly datos = this.servicioProducto.datos;
  protected readonly telefonoLimpio = computed(() => this.datos.telefono.replace(/\s+/g, ''));

  /** Estado local 100% reactivo con Signals. */
  private readonly desplazado = signal(false);
  protected readonly menuAbierto = signal(false);

  /** Efecto: bloquea el scroll del body mientras el menú móvil está abierto. */
  constructor() {
    effect((onCleanup) => {
      this.documento.body.style.overflow = this.menuAbierto() ? 'hidden' : '';
      onCleanup(() => {
        this.documento.body.style.overflow = '';
      });
    });
  }

  /** Clases de la barra: transparente sobre el hero, sólida al hacer scroll. */
  protected readonly clasesBarra = computed(() =>
    [
      'fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-in-out',
      this.desplazado()
        ? 'bg-marino-950/95 shadow-lg shadow-marino-950/40 backdrop-blur-md'
        : 'bg-gradient-to-b from-marino-950/85 via-marino-950/45 to-transparent',
    ].join(' '),
  );

  protected alDesplazar(): void {
    this.desplazado.set((this.documento.defaultView?.scrollY ?? 0) > 40);
  }

  protected alternarMenu(): void {
    this.menuAbierto.update((abierto) => !abierto);
  }

  protected cerrarMenu(): void {
    this.menuAbierto.set(false);
  }
}
