import { Categoria, DatosRestaurante } from '../interfaces/restaurant.interface';

/**
 * Construye la URL de una imagen alojada en Wikimedia Commons al ancho
 * solicitado (las fotografías de platos son CC BY / CC BY-SA).
 */
export function urlWikimedia(archivo: string, ancho: number): string {
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${archivo}?width=${ancho}`;
}

export const CATEGORIAS_MENU: readonly Categoria[] = [
  { id: 'ceviches', nombre: 'Ceviches' },
  { id: 'entremeses', nombre: 'Entremeses' },
  { id: 'calientes', nombre: 'Platos calientes' },
  { id: 'postres', nombre: 'Postres' },
  { id: 'bebidas', nombre: 'Bebidas' },
];

/**
 * Datos maestros de la marca. Cambiar el nombre o el teléfono aquí
 * se refleja en navbar, footer, hero, reservas y contacto.
 */
export const DATOS_RESTAURANTE: DatosRestaurante = {
  nombre: 'Cevichería Suárez',
  lema: 'La frescura del mar, servida con elegancia',
  descripcion:
    'Más de dos décadas siendo la casa del ceviche ecuatoriano: pescado fresco del día, limón sutil y recetas de familia que viajaron de Manta hacia toda la costa.',
  telefono: '+593 99 123 4567',
  whatsapp: 'https://wa.me/593991234567',
  correo: 'hola@cevicheriasuarez.com',
  aniosTradicion: 29,
  enlacesNav: [
    { etiqueta: 'Bienvenido', ruta: '/bienvenido' },
    { etiqueta: 'La Carta', ruta: '/carta' },
    { etiqueta: 'Nuestra Historia', ruta: '/historia' },
    { etiqueta: 'Locales', ruta: '/contacto' },
  ],
  redes: [
    { nombre: 'Facebook', url: 'https://facebook.com/cevicheriasuarez', icono: 'facebook' },
    { nombre: 'Instagram', url: 'https://instagram.com/cevicheriasuarez', icono: 'instagram' },
    { nombre: 'WhatsApp', url: 'https://wa.me/593991234567', icono: 'whatsapp' },
    { nombre: 'TikTok', url: 'https://tiktok.com/@cevicheriasuarez', icono: 'tiktok' },
  ],
  horarios: [
    { dias: 'Martes a Domingo', horas: '11:30 – 22:00' },
    { dias: 'Feriados', horas: '12:00 – 21:00' },
  ],
  locales: [
    {
      id: 'manta',
      ciudad: 'Manta · Matriz',
      direccion: 'Av. Malecón Escénico 14-02, Manta',
      telefono: '+593 5 262 2040',
      horario: '11:30 – 22:00',
      imagenUrl:
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=70',
    },
    {
      id: 'quito',
      ciudad: 'Quito',
      direccion: 'Av. Orellana N34-120 y Av. Amazonas, Quito',
      telefono: '+593 2 245 8800',
      horario: '11:30 – 22:00',
      imagenUrl:
        'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=70',
    },
    {
      id: 'guayaquil',
      ciudad: 'Guayaquil',
      direccion: 'Av. Las Américas km 3.5, Guayaquil',
      telefono: '+593 4 288 1110',
      horario: '11:30 – 22:00',
      imagenUrl:
        'https://images.unsplash.com/photo-1485921325833-c519f76c4927?auto=format&fit=crop&w=800&q=70',
    },
  ],
};
