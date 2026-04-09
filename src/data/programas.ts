// ============================================================
// PROGRAMAS DE FUNDACIÓN BETANIA
// Basado en las 3 líneas de acción del documento institucional
// ============================================================

export interface Programa {
  id: string;
  titulo: string;
  descripcion: string;
  icon: string; // emoji o nombre de ícono SVG
  foto: string; // nombre de archivo en src/assets/photos/
  tag: string;
  proximamente?: boolean;
}

export const PROGRAMAS: Programa[] = [
  {
    id: 'comedor',
    titulo: 'Comedor Comunitario',
    descripcion:
      'Brindamos alimentación nutritiva a niños y adultos mayores de nuestra comunidad, dos veces por semana. Más de 800 raciones al mes que son también un abrazo y un momento de dignidad.',
    icon: '🍽️',
    foto: 'nina-almuerzo-sonrisa.jpg',
    tag: 'Amor práctico',
  },
  {
    id: 'refuerzo-escolar',
    titulo: 'Refuerzo Escolar',
    descripcion:
      'Acompañamos a niños y niñas en su proceso académico con talleres de refuerzo escolar semanales. 40 niños formados con propósito, excelencia y valores.',
    icon: '📚',
    foto: 'nino-manualidades.jpg',
    tag: 'Formación',
  },
  {
    id: 'jovenes',
    titulo: 'Jóvenes con Propósito',
    descripcion:
      'Programas para jóvenes enfocados en identidad, propósito y liderazgo. Los equipamos para transformar su barrio desde una fe activa y un carácter formado.',
    icon: '✨',
    foto: 'equipo-mision.jpg',
    tag: 'Identidad',
  },
  {
    id: 'familias',
    titulo: 'Restauración Familiar',
    descripcion:
      'Talleres para padres, consejería y acompañamiento familiar. Creemos que cuando una familia es restaurada, todo el barrio cambia. Más de 200 familias los sábados.',
    icon: '🏠',
    foto: 'mesa-familiar.jpg',
    tag: 'Familias',
  },
  {
    id: 'espiritual',
    titulo: 'Restauración Espiritual',
    descripcion:
      'Evangelismo relacional, discipulado familiar y consejería. Anunciamos a Jesucristo como esperanza viva porque creemos que el Evangelio transforma el corazón y restaura vidas.',
    icon: '🕊️',
    foto: 'mujeres-oracion.jpg',
    tag: 'Evangelio Integral',
  },
  {
    id: 'educacion',
    titulo: 'Sueño a Futuro',
    descripcion:
      'Soñamos con un centro educativo cristiano que forme generaciones con principios bíblicos, excelencia académica y cultura de propósito y llamado.',
    icon: '🌱',
    foto: 'ninas-leyendo.jpg',
    tag: 'Próximamente',
    proximamente: true,
  },
];
