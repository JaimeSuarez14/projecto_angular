import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ProductoService } from '../../servicios/producto-service';
import { LocalRestaurante } from '../../interfaces/restaurant.interface';
import { Revelar } from '../../shared/directivas/revelar';

/**
 * Locales y contacto: tarjetas por ciudad con enlaces a mapa/teléfono y un
 * formulario de mensajes manejado con Signals (estado y validación simple).
 */
@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [Revelar],
  templateUrl: './contacto.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Contacto {
  protected readonly datos = inject(ProductoService).datos;

  /** Formulario "Escríbenos" con Signals. */
  protected readonly nombre = signal('');
  protected readonly correo = signal('');
  protected readonly mensaje = signal('');
  protected readonly enviado = signal(false);
  protected readonly mensajeError = signal<string | null>(null);

  protected captoNombre(evento: Event): void {
    this.nombre.set((evento.target as HTMLInputElement).value);
  }

  protected captoCorreo(evento: Event): void {
    this.correo.set((evento.target as HTMLInputElement).value);
  }

  protected captoMensaje(evento: Event): void {
    this.mensaje.set((evento.target as HTMLTextAreaElement).value);
  }

  protected enviar(): void {
    if (!this.nombre().trim() || !this.mensaje().trim()) {
      this.mensajeError.set('Completa al menos tu nombre y tu mensaje.');
      return;
    }
    this.mensajeError.set(null);
    this.enviado.set(true);
    this.nombre.set('');
    this.correo.set('');
    this.mensaje.set('');
  }

  /** Enlace a Google Maps con la dirección del local. */
  protected urlMapa(local: LocalRestaurante): string {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(local.direccion)}`;
  }

  protected telefonoSinEspacios(telefono: string): string {
    return telefono.replace(/\s+/g, '');
  }
}
