import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Hero } from './hero/hero';
import { PlatosDestacados } from './platos-destacados/platos-destacados';
import { Experiencia } from './experiencia/experiencia';
import { Revelar } from '../../shared/directivas/revelar';
import { ProductoService } from '../../servicios/producto-service';

/**
 * Página de bienvenida (landing) inspirada en Punto Azul: compone el hero,
 * las especialidades, la experiencia y la banda final de reservas.
 */
@Component({
  selector: 'app-bienvenido',
  standalone: true,
  imports: [RouterLink, Hero, PlatosDestacados, Experiencia, Revelar],
  templateUrl: './bienvenido.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Bienvenido {
  private readonly servicioProducto = inject(ProductoService);

  protected readonly datos = this.servicioProducto.datos;
  protected readonly telefonoLimpio = computed(() => this.datos.telefono.replace(/\s+/g, ''));

  protected readonly urlBanda =
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=60';
}
