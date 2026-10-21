import { Component, inject, input, output } from '@angular/core';
import { ProductoService } from '../servicios/producto-service';

@Component({
  imports: [],
  selector: 'app-productos',
  styleUrl: './productos.css',
  templateUrl: './productos.html',
})
export class Productos {
  title = input('');
  enviarPadre = output();
  productoService = inject(ProductoService)

  constructor(){  }

  detalle = 'Cada producto debe tener un detalle de los que engloba';
  mensaje = '';
  mostrarMensaje() {
    this.mensaje = 'Pronto veras el detalle de los productos';
    this.enviarPadre.emit();
  }
}
