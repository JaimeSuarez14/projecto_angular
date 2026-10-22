/**
 * Modelo de datos del restaurante. Todo el dominio vive aquí para que
 * componentes, servicios y páginas compartan un único lenguaje de tipos.
 */

/** Categorías del menú de la cevichería. */
export type CategoriaId = 'ceviches' | 'entremeses' | 'calientes' | 'postres' | 'bebidas';

/** Filtro de categoría para las pantallas ('todos' incluye el catálogo entero). */
export type FiltroCategoria = CategoriaId | 'todos';

/** Íconos de redes sociales disponibles en el footer. */
export type IconoSocial = 'facebook' | 'instagram' | 'whatsapp' | 'tiktok';

/** Una categoría del menú (usada para filtrar y etiquetar platos). */
export interface Categoria {
  readonly id: CategoriaId;
  readonly nombre: string;
}

/** Plato del menú. Proviene del ProductoService mientras no exista base de datos. */
export interface Producto {
  readonly id: string;
  readonly nombre: string;
  readonly descripcion: string;
  readonly precio: number;
  readonly categoria: CategoriaId;
  readonly imagenUrl: string;
  /** Aparece en la sección "Especialidades" de la página de bienvenida. */
  readonly destacado: boolean;
  /** Texto corto opcional encima de la imagen (p. ej. "El favorito"). */
  readonly etiqueta?: string;
}

/** Local físico del restaurante. */
export interface LocalRestaurante {
  readonly id: string;
  readonly ciudad: string;
  readonly direccion: string;
  readonly telefono: string;
  readonly horario: string;
  readonly imagenUrl: string;
}

/** Rango de horario de atención. */
export interface HorarioAtencion {
  readonly dias: string;
  readonly horas: string;
}

/** Red social del restaurante. */
export interface RedSocial {
  readonly nombre: string;
  readonly url: string;
  readonly icono: IconoSocial;
}

/** Enlace rápido del navbar y del footer. */
export interface EnlaceNavegacion {
  readonly etiqueta: string;
  readonly ruta: string;
}

/** Reserva solicitada desde la página de reservas. */
export interface ReservaMesa {
  readonly localId: string;
  readonly fecha: string;
  readonly hora: string;
  readonly personas: number;
}

/** Datos maestros de la marca (configuración centralizada en un solo archivo). */
export interface DatosRestaurante {
  readonly nombre: string;
  readonly lema: string;
  readonly descripcion: string;
  readonly telefono: string;
  readonly whatsapp: string;
  readonly correo: string;
  readonly aniosTradicion: number;
  readonly enlacesNav: readonly EnlaceNavegacion[];
  readonly redes: readonly RedSocial[];
  readonly horarios: readonly HorarioAtencion[];
  readonly locales: readonly LocalRestaurante[];
}
