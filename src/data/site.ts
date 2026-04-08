// ============================================================
// CONFIGURACIÓN GLOBAL DEL SITIO — Fundación Betania
// Editar aquí para actualizar datos de contacto, banco, etc.
// ============================================================

export const SITE = {
  name: 'Fundación Betania',
  tagline: 'Una casa donde la vida vuelve a comenzar',
  description:
    'Fundación Betania — Restauración integral para familias de la comunidad. Anunciando a Jesucristo como esperanza viva.',
  url: 'https://jhosseeth.github.io/fundacion-betania',

  // Contacto
  whatsapp: {
    number: '57XXXXXXXXXX', // reemplazar con número real
    message: 'Hola, me gustaría conocer más sobre Fundación Betania',
    get link() {
      return `https://wa.me/${this.number}?text=${encodeURIComponent(this.message)}`;
    },
  },
  email: 'contacto@fundacionbetania.org', // reemplazar
  phone: '+57 XXX XXX XXXX',              // reemplazar

  // Ubicación
  address: {
    street: 'Dirección por confirmar',
    neighborhood: 'Barrio por confirmar',
    city: 'Ciudad por confirmar',
    mapsEmbed: '', // URL del embed de Google Maps
    mapsLink: '',  // Link directo a Google Maps
    hours: 'Lunes a Viernes: 8:00 AM – 5:00 PM',
  },

  // Datos bancarios para donaciones
  bank: {
    name: 'Banco por confirmar',
    holder: 'Fundación Betania',
    account: 'XXXX XXXX XXXX XXXX',
    type: 'Ahorros',
    nit: 'NIT por confirmar',
  },

  // Redes sociales
  social: {
    facebook: '',   // URL completa
    instagram: '',  // URL completa
    youtube: '',    // URL completa
  },
} as const;
