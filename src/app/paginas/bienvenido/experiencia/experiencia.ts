import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductoService } from '../../../servicios/producto-service';
import { Revelar } from '../../../shared/directivas/revelar';

/**
 * Bloque dividido (imagen + texto) sobre la frescura del mar y la
 * tradición de la casa, con collage fotográfico y datos destacados.
 */
@Component({
  selector: 'app-experiencia',
  standalone: true,
  imports: [RouterLink, Revelar],
  templateUrl: './experiencia.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Experiencia {
  private readonly servicioProducto = inject(ProductoService);

  protected readonly datos = this.servicioProducto.datos;
  protected readonly totalPlatos = computed(() => this.servicioProducto.productos().length);

  protected readonly urlMar =
    'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=1000&q=70';
  protected readonly urlCocina =
    'https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=700&q=70';

  /** Compromisos listados junto al texto principal. */
  protected readonly compromisos: readonly string[] = [
    'Pescado y marisco fresco del día, directo de la flotilla local',
    'Limón, ají de la sierra y recetas de familia sin atajos',
    'Patacones, curtido y chifles preparados en la hora',
  ];
}
