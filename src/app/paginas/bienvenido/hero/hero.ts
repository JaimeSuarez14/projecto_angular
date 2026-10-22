import { ChangeDetectionStrategy, Component, DOCUMENT, computed, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductoService } from '../../../catalogo/producto-service';
import { Revelar } from '../../../shared/revelar';
import { urlWikimedia } from '../../../catalogo/datos-restaurante';

/**
 * Banner principal de la página de bienvenida: ceviche ecuatoriano real
 * (foto CC BY-SA de Wikimedia Commons), mensaje bienvenida y doble CTA.
 */
@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RouterLink, Revelar, NgOptimizedImage],
  templateUrl: './hero.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Hero {
  private readonly servicioProducto = inject(ProductoService);
  private readonly documento = inject(DOCUMENT);

  protected readonly datos = this.servicioProducto.datos;
  protected readonly totalPlatos = computed(() => this.servicioProducto.productos().length);
  protected readonly totalLocales = this.datos.locales.length;
  protected readonly urlHero = urlWikimedia('CEVICHE_DE_CAMAR%C3%93N_ECUATORIANO.jpg', 1600);

  protected bajar(): void {
    this.documento.getElementById('especialidades')?.scrollIntoView({ behavior: 'smooth' });
  }
}
