import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductoService } from '../../catalogo/producto-service';
import { CategoriaId, FiltroCategoria } from '../../catalogo/restaurant.interface';
import { Revelar } from '../../shared/revelar';
import { urlWikimedia } from '../../catalogo/datos-restaurante';

/**
 * La carta completa con filtros por categoría. El estado del filtro y la
 * lista visible se modelan con `signal` + `computed` (sin RxJS ni zone.js).
 */
@Component({
  selector: 'app-carta',
  standalone: true,
  imports: [RouterLink, CurrencyPipe, Revelar, NgOptimizedImage],
  templateUrl: './carta.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Carta {
  private readonly servicioProducto = inject(ProductoService);

  protected readonly categorias = this.servicioProducto.categorias;
  protected readonly urlCabecera = urlWikimedia('Ceviche_ecuatoriano_de_camar%C3%B3n.jpg', 1200);

  /** Filtro activo: 'todos' muestra el catálogo completo. */
  protected readonly filtro = signal<FiltroCategoria>('todos');

  /** Lista reactiva: se recalcula sola cuando cambia el filtro o el menú. */
  protected readonly platos = computed(() => {
    const filtroActual = this.filtro();
    const catalogo = this.servicioProducto.productos();
    return filtroActual === 'todos' ? catalogo : catalogo.filter((p) => p.categoria === filtroActual);
  });

  /** Cuántos platos hay por categoría (para las pastillas de filtro). */
  protected readonly conteo = computed(() => {
    const conteo = new Map<FiltroCategoria, number>([
      ['todos', this.servicioProducto.productos().length],
    ]);
    for (const plato of this.servicioProducto.productos()) {
      conteo.set(plato.categoria, (conteo.get(plato.categoria) ?? 0) + 1);
    }
    return conteo;
  });

  protected filtrar(categoria: FiltroCategoria): void {
    this.filtro.set(categoria);
  }

  protected clasesChip(categoria: FiltroCategoria): string {
    const activa = this.filtro() === categoria;
    return [
      'inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-300',
      activa
        ? 'bg-marino-900 text-oro-400 shadow-lg shadow-marino-900/25'
        : 'bg-white text-marino-800 ring-1 ring-marino-900/10 hover:bg-marino-900 hover:text-oro-400',
    ].join(' ');
  }

  protected nombreCategoria(id: CategoriaId): string {
    return this.categorias.find((categoria) => categoria.id === id)?.nombre ?? id;
  }
}
