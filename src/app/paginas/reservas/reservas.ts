import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductoService } from '../../servicios/producto-service';
import { ReservaMesa } from '../../interfaces/restaurant.interface';
import { Revelar } from '../../shared/directivas/revelar';

/**
 * Reservas: todo el formulário vive en Signals (`fecha`, `hora`,
 * `personas`, …) y un `computed` arma el resumen en vivo. Al confirmar
 * se simula el envío; cuando exista backend, esto cambia por una petición.
 */
@Component({
  selector: 'app-reservas',
  standalone: true,
  imports: [RouterLink, Revelar],
  templateUrl: './reservas.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Reservas {
  private readonly servicioProducto = inject(ProductoService);

  protected readonly datos = this.servicioProducto.datos;

  protected readonly horasDisponibles: readonly string[] = [
    '11:30', '12:15', '13:00', '13:45', '14:30',
    '18:00', '18:45', '19:30', '20:15', '21:00',
  ];

  protected readonly fechaMinima = new Date().toISOString().split('T')[0];

  /** Estado del formulario, `signal` por campo (arquitectura zoneless). */
  protected readonly idLocal = signal(this.datos.locales[0]?.id ?? '');
  protected readonly fecha = signal('');
  protected readonly hora = signal('13:00');
  protected readonly personas = signal(2);
  protected readonly enviando = signal(false);
  protected readonly reservaConfirmada = signal<ReservaMesa | null>(null);
  protected readonly mensajeError = signal<string | null>(null);

  /** Resumen en vivo calculado de forma reactiva. */
  protected readonly resumen = computed(() => {
    const local = this.datos.locales.find((item) => item.id === this.idLocal());
    return {
      local: local ? local.ciudad : 'Por elegir',
      fecha: this.fecha() ? new Date(`${this.fecha()}T12:00:00`).toLocaleDateString('es-EC', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
      }) : 'Por elegir',
      hora: this.hora(),
      personas: this.personas(),
    };
  });

  protected captoLocal(evento: Event): void {
    this.idLocal.set((evento.target as HTMLSelectElement).value);
  }

  protected captoFecha(evento: Event): void {
    this.fecha.set((evento.target as HTMLInputElement).value);
  }

  protected captoHora(hora: string): void {
    this.hora.set(hora);
  }

  protected cambiarPersonas(delta: -1 | 1): void {
    this.personas.update((actual) => Math.min(12, Math.max(1, actual + delta)));
  }

  protected confirmar(): void {
    if (!this.fecha()) {
      this.mensajeError.set('Elige la fecha de tu visita para continuar.');
      return;
    }
    this.mensajeError.set(null);
    this.enviando.set(true);

    // Simulación de envío al servidor (sin base de datos todavía).
    setTimeout(() => {
      this.reservaConfirmada.set({
        localId: this.idLocal(),
        fecha: this.fecha(),
        hora: this.hora(),
        personas: this.personas(),
      });
      this.enviando.set(false);
    }, 900);
  }

  protected nuevaReserva(): void {
    this.reservaConfirmada.set(null);
    this.fecha.set('');
    this.personas.set(2);
  }

  protected ciudadDeLocal(id: string): string {
    return this.datos.locales.find((local) => local.id === id)?.ciudad ?? id;
  }
}
