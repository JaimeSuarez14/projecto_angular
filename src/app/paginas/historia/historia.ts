import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Revelar } from '../../shared/revelar';
import { ProductoService } from '../../catalogo/producto-service';

/** Hitos del restaurante para la línea de tiempo. */
interface HitoHistoria {
  readonly anio: string;
  readonly titulo: string;
  readonly texto: string;
}

/** Página "Nuestra Historia": línea de tiempo, valores y llamado a reservar. */
@Component({
  selector: 'app-historia',
  standalone: true,
  imports: [RouterLink, Revelar, NgOptimizedImage],
  templateUrl: './historia.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Historia {
  protected readonly datos = inject(ProductoService).datos;

  protected readonly urlCabecera =
    'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1600&q=70';
  protected readonly urlCocina =
    'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=700&q=70';

  protected readonly hitos: readonly HitoHistoria[] = [
    {
      anio: '1995',
      titulo: 'Nace el primer local',
      texto: 'Una cocina pequeña frente al muelle de Manta donde las recetas de familia empezaron a conquistar paladares.',
    },
    {
      anio: '2003',
      titulo: 'Llegamos a las ciudades principales',
      texto: 'La carta viajó a Quito y Guayaquil manteniendo la misma premisa: solo pescado fresco del día.',
    },
    {
      anio: '2012',
      titulo: 'La tradición se certifica',
      texto: 'Nuestros ceviches reciben el reconocimiento a la mejor cocina marina tradicional de la costa ecuatoriana.',
    },
    {
      anio: '2026',
      titulo: 'El mar entra en línea',
      texto: 'Reservas, carta y estados reactivos con Signals: la experiencia del restaurante ahora vive en tu navegador.',
    },
  ];
}
