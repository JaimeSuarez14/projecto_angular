import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductoService } from '../../servicios/producto-service';

/** Footer completo: marca, enlaces, horarios, locales y redes sociales. */
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {
  protected readonly datos = inject(ProductoService).datos;
  protected readonly anio = new Date().getFullYear();
  protected readonly telefonoLimpio = computed(() => this.datos.telefono.replace(/\s+/g, ''));
}
