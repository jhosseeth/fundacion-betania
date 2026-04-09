// ============================================================
// CONFIGURACIÓN GLOBAL DEL SITIO — Fundación Betania
// Editar aquí para actualizar datos de contacto, banco, etc.
// ============================================================

export const SITE = {
  name: 'Fundación Betania',
  tagline: 'Una casa donde la vida vuelve a comenzar',
  description:
    'Fundación Betania — Restauración integral para familias de la comunidad. Anunciando a Jesucristo como esperanza viva.',
  url: 'https://fundacionbetania.co',

  // Contacto
  whatsapp: {
    number: '573242062332',
    message: 'Hola, me gustaría conocer más sobre Fundación Betania',
    get link() {
      return `https://wa.me/${this.number}?text=${encodeURIComponent(this.message)}`;
    },
  },
  email: 'fundacionbetaniaintegral@gmail.com',
  phone: '+57 324 206 2332',

  // Ubicación
  address: {
    street: 'Medellín, Colombia',
    neighborhood: 'Comunidad',
    city: 'Medellín',
    mapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d253682.45932737327!2d-75.76566642871096!3d6.244202557801378!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e4428dfb80fad05%3A0x42137cfcc7b53b56!2sMedell%C3%ADn%2C%20Antioquia!5e0!3m2!1ses!2sco!4v1712000000000!5m2!1ses!2sco',
    mapsLink: 'https://maps.google.com/?q=Medellín,Antioquia,Colombia',
    hours: 'Lunes a Viernes: 8:00 AM – 5:00 PM',
  },

  // Datos bancarios para donaciones
  bank: {
    name: 'Bancolombia',
    holder: 'Fundación Betania Integral Colombia',
    account: '255-000096-74',
    type: 'Cuenta de Ahorros',
    nit: '902051724',
  },

  // Redes sociales
  social: {
    facebook: '',
    instagram: 'https://www.instagram.com/fundacionbetania',
    youtube: '',
  },

  // Impact Bar
  impact: {
    raciones: 700,   // ~80-100 raciones × 2 días/semana × ~4.5 semanas
    ninos: 40,
    personas: 200,   // entre 200 y 300 personas los sábados
  },
} as const;
