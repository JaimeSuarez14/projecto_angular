import {
  Directive,
  ElementRef,
  OnDestroy,
  afterNextRender,
  inject,
  input,
} from '@angular/core';

/**
 * Revela el elemento con una transición suave cuando entra en el viewport
 * (usada para los efectos de aparición al hacer scroll de la landing).
 *
 * Uso:
 *   <div appRevelar>…</div>                    → aparece sin retardo
 *   <div [appRevelar]="120">…</div>            → retardo de 120 ms (efecto cascada)
 */
@Directive({
  selector: '[appRevelar]',
  standalone: true,
})
export class Revelar implements OnDestroy {
  /** Milisegundos de retardo escalonado para el efecto cascada. */
  readonly retardo = input(0, {
    alias: 'appRevelar',
    transform: (valor: string | boolean | number | null | undefined) => Number(valor) || 0,
  });

  private readonly nodo: HTMLElement = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private observador: IntersectionObserver | null = null;

  constructor() {
    // Estado inicial oculto y desplazado; las clases de Tailwind se
    // remueven al detectar el elemento en pantalla.
    this.nodo.classList.add('transition-all', 'duration-700', 'ease-out', 'opacity-0', 'translate-y-6');

    afterNextRender(() => {
      const observador = new IntersectionObserver(
        (entradas) => {
          for (const entrada of entradas) {
            if (entrada.isIntersecting) {
              this.nodo.style.transitionDelay = `${this.retardo()}ms`;
              this.nodo.classList.remove('opacity-0', 'translate-y-6');
              this.nodo.classList.add('opacity-100', 'translate-y-0');
              observador.disconnect();
            }
          }
        },
        { threshold: 0.12 },
      );
      observador.observe(this.nodo);
      this.observador = observador;
    });
  }

  ngOnDestroy(): void {
    this.observador?.disconnect();
  }
}
