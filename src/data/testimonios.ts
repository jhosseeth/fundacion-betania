// ============================================================
// TESTIMONIOS — Voces de la comunidad
// ============================================================

export interface Testimonio {
  id: string;
  nombre: string;
  rol: string;
  texto: string;
  foto?: string;
}

export const TESTIMONIOS: Testimonio[] = [
  {
    id: 'testimonio-1',
    nombre: 'Anónimo',
    rol: 'Visitante de la comunidad',
    texto:
      'Ver lo que hacen acá me dejó sin palabras. No es solo comida ni talleres — es una familia que recibe a todo el que llega. Hay algo diferente en este lugar, se siente desde que entras.',
  },
];
