import { Injectable, computed, signal } from '@angular/core';
import { Categoria, DatosRestaurante, Producto } from './restaurant.interface';
import { CATEGORIAS_MENU, DATOS_RESTAURANTE, urlWikimedia } from './datos-restaurante';

/**
 * Catálogo precargado en memoria (mientras no exista base de datos).
 * Nombres y precios conservados de la versión original del servicio;
 * se añaden descripción, imagen, categoría y destacado para la UI.
 *
 * Fotografías con licencia abierta verificadas:
 * - Wikimedia Commons (CC BY / CC BY-SA)
 * - Flickr (CC BY / CC BY-SA / CC BY-NC-SA)
 * - Unsplash (licencia Unsplash)
 */
const PRODUCTOS_INICIALES: readonly Producto[] = [
  {
    id: 'ceviche',
    nombre: 'Ceviche',
    descripcion:
      'Pescado del día curtido en limón sutil, cebolla en pluma, tomate, cilantro y una pizca de ají. Con chifles de plátano y cancha.',
    precio: 12,
    categoria: 'ceviches',
    imagenUrl: urlWikimedia('Ceviche_ecuatoriano_de_cancha_y_pulpo.jpg', 800),
    destacado: true,
    etiqueta: 'El favorito',
  },
  {
    id: 'chocho',
    nombre: 'Chocho',
    descripcion:
      'Chocho fresco al limón con tomate, cebolla, culantro y aceite de achiote. Nuestro entrante ligero y 100% tradicional.',
    precio: 3,
    categoria: 'entremeses',
    imagenUrl:
      'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=800&q=70',
    destacado: false,
  },
  {
    id: 'combinado',
    nombre: 'Combinado',
    descripcion:
      'Elige dos antojos de la casa en un solo plato: la manera perfecta de probar más del mar sin apuros.',
    precio: 10,
    categoria: 'entremeses',
    imagenUrl: 'https://live.staticflickr.com/5336/8770488190_dc73a363e0_b.jpg',
    destacado: true,
    etiqueta: 'Para dos',
  },
  {
    id: 'cevichocho',
    nombre: 'Cevichocho',
    descripcion:
      'Ceviche fresco de chocho con cebolla en pluma, tomate, cilantro y ají. Tradición en cada cucharada.',
    precio: 10,
    categoria: 'ceviches',
    imagenUrl: urlWikimedia('Ceviche_de_camar%C3%B3n_ecuatoriano.jpg', 800),
    destacado: false,
  },
  {
    id: 'chicharron-pota',
    nombre: 'Chicharrón de Pota',
    descripcion:
      'Pota dorada y crocante por fuera, suave por dentro. Servida con patacones y curtido de cebolla morada.',
    precio: 15,
    categoria: 'calientes',
    imagenUrl: 'https://live.staticflickr.com/3064/2826214890_1c27e5d955_b.jpg',
    destacado: true,
    etiqueta: 'El más pedido',
  },
  {
    id: 'chicharron-pescado',
    nombre: 'Chicharrón de Pescado',
    descripcion:
      'Trozos de pescado fresco empanizado al momento, con patacones, curtido y ají criollo.',
    precio: 18,
    categoria: 'calientes',
    imagenUrl: 'https://live.staticflickr.com/3539/3398015185_1234170fbd_b.jpg',
    destacado: true,
  },
  {
    id: 'ceviche-chicharron',
    nombre: 'Ceviche con Chicharrón',
    descripcion:
      'Nuestro ceviche fresco coronado con chicharrón de pescado dorado. El mar y el fuego en un solo plato.',
    precio: 15,
    categoria: 'ceviches',
    imagenUrl: 'https://live.staticflickr.com/2681/4381204266_da3409cf27_b.jpg',
    destacado: true,
    etiqueta: 'De la casa',
  },
  {
    id: 'arroz-mariscos',
    nombre: 'Arroz con Mariscos',
    descripcion:
      'Arroz marinero cocinado en caldo de mariscos, con camarón, concha y calamar. Limón al gusto y perejil fresco.',
    precio: 18,
    categoria: 'calientes',
    imagenUrl: urlWikimedia('Arroz_con_mariscos.jpg', 800),
    destacado: true,
    etiqueta: 'Para compartir',
  },
  {
    id: 'cremolada',
    nombre: 'Cremolada',
    descripcion: 'Fruta de temporada chancada al momento y servida helada. El cierre dulce de la costa.',
    precio: 2,
    categoria: 'postres',
    imagenUrl: 'https://live.staticflickr.com/3659/3378212618_80f5d9857e_b.jpg',
    destacado: false,
  },
];

/**
 * Fuente única del catálogo de platos. Mientras no exista base de datos
 * los productos viven aquí en memoria y se exponen como Signals de solo
 * lectura. Cuando llegue el backend bastará con alimentar la señal
 * `_productos` con una petición HTTP: toda la API reactiva queda intacta.
 */
@Injectable({ providedIn: 'root' })
export class ProductoService {
  /** Señal privada y mutable: la única fuente de la verdad del menú. */
  private readonly _productos = signal<readonly Producto[]>(PRODUCTOS_INICIALES);

  /** Señal pública de solo lectura: consumida por las páginas con `computed`. */
  readonly productos = this._productos.asReadonly();

  /** Platos destacados para la sección de especialidades (calculado de forma reactiva). */
  readonly destacados = computed(() => this._productos().filter((p) => p.destacado));

  /** Datos maestros de la marca y las categorías del menú. */
  readonly datos: DatosRestaurante = DATOS_RESTAURANTE;
  readonly categorias: readonly Categoria[] = CATEGORIAS_MENU;
}
