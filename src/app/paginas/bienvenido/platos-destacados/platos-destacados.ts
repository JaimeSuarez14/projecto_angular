import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductoService } from '../../../servicios/producto-service';
import { CategoriaId, Producto } from '../../../interfaces/restaurant.interface';
import { Revelar } from '../../../shared/directivas/revelar';

/**
 * Especialidades de la casa: el grid reacciona de forma automática a los
 * cambios del catálogo porque lee la señal `destacados` del ProductoService.
 */
@Component({
  selector: 'app-platos-destacados',
  standalone: true,
  imports: [RouterLink, CurrencyPipe, Revelar],
  templateUrl: './platos-destacados.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlatosDestacados {
  private readonly servicioProducto = inject(ProductoService);

  /** Signal<Producto[]> de solo lectura (computed en el servicio). */
  protected readonly platos = this.servicioProducto.destacados;

  /** Nombre legible de una categoría para la etiqueta inferior de la tarjeta. */
  protected nombreCategoria(id: CategoriaId): string {
    return this.servicioProducto.categorias.find((categoria) => categoria.id === id)?.nombre ?? id;
  }
}
