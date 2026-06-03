// ============================================
// CONSTANTES GLOBALES - TEXTO Y CONFIGURACIÓN
// ============================================
// Aquí puedes personalizar todo el contenido de la web

export const BRAND = {
  name: 'Código Rojo',
  tagline: 'Acceso exclusivo. Conocimiento restringido.',
  description: 'Una plataforma digital de élite para profesionales que entienden el valor del conocimiento privilegiado.',
  email: 'contacto@codigorojo.io',
  phone: '+34 911 234 567',
}

export const HERO = {
  title: 'Bienvenido a la Élite Digital',
  subtitle: 'Acceso exclusivo a contenido, herramientas y comunidad reservada para profesionales de alto nivel.',
  cta_primary: 'Solicitar Acceso',
  cta_secondary: 'Ver Beneficios',
  active_members: 2847,
  member_label: 'Miembros Activos',
}

export const BENEFITS = [
  {
    id: 1,
    icon: '🔐',
    title: 'Contenido Exclusivo',
    description: 'Acceso a recursos, estrategias y case studies disponibles solo para miembros verificados de la comunidad.',
  },
  {
    id: 2,
    icon: '👥',
    title: 'Red de Élite',
    description: 'Conecta con profesionales de alto nivel. Colabora, aprende e impulsa proyectos junto a los mejores.',
  },
  {
    id: 3,
    icon: '🚀',
    title: 'Herramientas Premium',
    description: 'Utilidades, templates y software especializado diseñado para acelerar tu productividad y resultados.',
  },
  {
    id: 4,
    icon: '📊',
    title: 'Mentoría Privada',
    description: 'Sesiones 1-a-1 con expertos. Asesoramiento personalizado según tus objetivos y desafíos actuales.',
  },
  {
    id: 5,
    icon: '🎓',
    title: 'Formación Avanzada',
    description: 'Masterclasses, cursos certificados y workshops impartidos por líderes de la industria.',
  },
  {
    id: 6,
    icon: '💎',
    title: 'Estatus Premium',
    description: 'Reconocimiento y posicionamiento dentro de una comunidad seleccionada de profesionales.',
  },
]

export const HOW_IT_WORKS = [
  {
    step: 1,
    title: 'Solicita Acceso',
    description: 'Completa el formulario de solicitud. Te pediremos información básica sobre tu perfil profesional.',
    icon: '📝',
  },
  {
    step: 2,
    title: 'Verificación',
    description: 'Nuestro equipo revisa tu solicitud (24-48 horas). Validamos tu experiencia y compatibilidad con la comunidad.',
    icon: '✓',
  },
  {
    step: 3,
    title: 'Acceso Inmediato',
    description: 'Una vez aprobado, recibirás credenciales y acceso completo a la plataforma y recursos premium.',
    icon: '🔑',
  },
  {
    step: 4,
    title: 'Disfruta los Beneficios',
    description: 'Comienza a colaborar, accede a mentoría, webinars exclusivos y contenido que mejorará tu trayectoria.',
    icon: '⭐',
  },
]

export const SOCIAL_PROOF = {
  testimonials: [
    {
      id: 1,
      name: 'Carlos Mendez',
      role: 'CEO - Tech Solutions',
      text: 'La comunidad de Código Rojo cambió mi forma de hacer networking. El acceso a contenido y mentores es incomparable.',
      avatar: '👨‍💼',
    },
    {
      id: 2,
      name: 'Marina López',
      role: 'Emprendedora - Fintech',
      text: 'Encontré inversores, partners y conocimiento que no encontraría en otro lado. Absolutamente recomendado.',
      avatar: '👩‍💼',
    },
    {
      id: 3,
      name: 'David Chen',
      role: 'VP Product - Global Corp',
      text: 'La calidad de los miembros y el nivel de las conversaciones es élite. Exactamente lo que buscaba.',
      avatar: '👨‍💻',
    },
  ],
  stats: [
    { label: 'Miembros Activos', value: '2,847' },
    { label: 'País Representados', value: '48' },
    { label: 'Proyectos Colaborativos', value: '156' },
    { label: 'Tasa de Satisfacción', value: '98%' },
  ],
}

export const PRICING = [
  {
    id: 1,
    name: 'Acceso Básico',
    price: 99,
    period: 'mes',
    description: 'Para profesionales que comienzan su viaje de crecimiento.',
    features: [
      'Acceso a plataforma principal',
      'Biblioteca de contenido limitada',
      'Comunidad: mensajes texto',
      'Webinars mensuales',
      'Soporte por email',
    ],
    cta: 'Comenzar',
    highlighted: false,
  },
  {
    id: 2,
    name: 'Acceso Premium',
    price: 299,
    period: 'mes',
    description: 'La opción más elegida. Experiencia completa y sin limitaciones.',
    features: [
      'Todo en Acceso Básico +',
      'Biblioteca completa de recursos',
      'Comunidad: chat en vivo y video',
      'Webinars semanales',
      'Llamadas de mentoría: 2/mes',
      'Acceso a herramientas premium',
      'Soporte prioritario',
    ],
    cta: 'Acceso Premium',
    highlighted: true,
  },
  {
    id: 3,
    name: 'Élite VIP',
    price: 799,
    period: 'mes',
    description: 'Para líderes que exigen lo mejor y quieren máximo valor.',
    features: [
      'Todo en Acceso Premium +',
      'Mentores dedicados',
      'Llamadas 1-a-1 ilimitadas',
      'Acceso prioritario a eventos',
      'Consultoría personalizada',
      'Colocación en directorios exclusivos',
      'Soporte 24/7',
    ],
    cta: 'Convertirse en VIP',
    highlighted: false,
  },
]

export const FAQ = [
  {
    id: 1,
    question: '¿Cuáles son los criterios para ser aceptado?',
    answer: 'Buscamos profesionales con experiencia demostrable, mentalidad de crecimiento y compromiso con contribuir a la comunidad. No es solo sobre ingresos, sino sobre tu trayectoria y potencial.',
  },
  {
    id: 2,
    question: '¿Puedo cancelar en cualquier momento?',
    answer: 'Sí. No hay contratos vinculantes. Puedes cancelar tu membresía en cualquier momento sin penalizaciones, aunque te recomendamos mantenerla para maximizar el retorno.',
  },
  {
    id: 3,
    question: '¿Qué tipo de mentoría incluye cada plan?',
    answer: 'Básico: acceso a mentores en webinars grupales. Premium: 2 sesiones 1-a-1 por mes. VIP: sesiones ilimitadas con asignación de mentor dedicado.',
  },
  {
    id: 4,
    question: '¿Hay periodo de prueba?',
    answer: 'Ofrecemos 7 días de acceso completo a Premium para que experimentes la plataforma. Si no es lo tuyo, te devolvemos el dinero sin preguntas.',
  },
  {
    id: 5,
    question: '¿Es segura mi información personal?',
    answer: 'Utilizamos encriptación de nivel empresarial y cumplimos con GDPR y normativas internacionales. Tu privacidad es prioridad.',
  },
  {
    id: 6,
    question: '¿Cómo son las sesiones de mentoría?',
    answer: 'Se realizan vía video llamada (Zoom/Teams) a hora que convengas. Los mentores tienen expertise en startups, finanzas, marketing, tech y gestión de proyectos.',
  },
]

export const FOOTER = {
  company: [
    { label: 'Sobre Nosotros', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Carreras', href: '#' },
  ],
  resources: [
    { label: 'Documentación', href: '#' },
    { label: 'Comunidad', href: '#' },
    { label: 'Eventos', href: '#' },
  ],
  legal: [
    { label: 'Privacidad', href: '#' },
    { label: 'Términos', href: '#' },
    { label: 'Cookies', href: '#' },
  ],
  copyright: '© 2024 Código Rojo. Todos los derechos reservados.',
}

export const COLORS = {
  background: '#0a0a0a',
  surface: '#1a1a1a',
  border: '#2d2d2d',
  text: '#ffffff',
  textSecondary: '#b0b0b0',
  primary: '#dc2626',
  primaryLight: '#ef4444',
  primaryDark: '#b91c1c',
  accent: '#ffffff',
}

export const ANIMATION_DURATION = {
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
  verySlow: 0.8,
}
