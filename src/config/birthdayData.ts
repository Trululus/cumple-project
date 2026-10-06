import type { BirthdayConfig } from '../types';

/**
 * ==============================================================================
 * ARCHIVO CENTRAL DE CONFIGURACIÓN DE CUMPLEAÑOS 🎂✨
 * ==============================================================================
 * Edita aquí todo el contenido de la experiencia:
 * - Nombre y claves de acceso
 * - Fotografías y notas del álbum
 * - Premios de la ruleta
 * - Mensaje final y dedicatoria
 *
 * FOTOGRAFÍAS:
 * - Coloca tus fotos en la carpeta `public/photos/` (ej: `public/photos/foto1.jpg`)
 * - Escribe la ruta en el campo `image` de cada recuerdo.
 */

export const birthdayData: BirthdayConfig = {
  personName: 'Hola mi amor',
  birthdayDate: 'Hoy es tu día especial ✨',

  // ----------------------------------------------------------------------------
  // PANTALLA INICIAL: ACCESO VIP & BIENVENIDA
  // ----------------------------------------------------------------------------
  access: {
    badge: 'Misión Especial de Cumpleaños 🎂',
    preTitle: 'Nikolle Yulianny Arevalo Peñaranda',
    title: 'Tengo Una Sorpresa Para Ti ✨',
    subtitle: 'Esta experiencia fue creada con mucho amor y cariño para celebrar tu día. Escribe tu clave para comenzar.',
    inputPlaceholder: 'Clave...',
    unlockButtonText: 'COMENZAR EXPERIENCIA 🚀',
    validKeys: [
      'Nikolle',
      'Niki',
      'nikolle',
      'yuliany',
    ],
    nameMapping: {
      nikolle: 'Nikolle',
      yuliany: 'Yuliany',
      Niki: 'Niki',
    },
    errorMessage: 'Hmm… esa no es la clave secreta 👀 ¿Será tu apodo?',
    unlockedGreeting: '¡Hola, {nombre}! 🎂✨',
    unlockedDescription: 'Hoy celebramos tu día con mucha felicidad. Pero antes de continuar, debes superar dos pequeños momentos: revivir recuerdos juntos y girar la ruleta.',
    startButtonText: 'COMENZAR',
  },

  // ----------------------------------------------------------------------------
  // NIVEL 1: ÁLBUM DE RECUERDOS POLAROID 📸
  // ----------------------------------------------------------------------------
  memories: {
    levelNumber: 1,
    badge: 'Nivel 1 • Recuerdos Inolvidables 📸',
    title: 'Los Mejores Momentos',
    subtitle: 'Cada anécdota y aventura contigo se convierte en uno de mis recuerdos favoritos.',
    items: [
      {
        id: 'mem-1',
        memoryNumber: 1,
        image: '/photos/1.JPG',
        fallbackGradient: 'from-amber-500/30 via-orange-500/20 to-purple-500/30',
        date: '24 de Noviembre 2025',
        location: 'Titanes',
        title: 'Donde todo empezó ✨',
        note: 'Aquel día en que nos vimos por primera vez y no te caí tan bien, por creido.',
        tag: 'El Principio',
      },
      {
        id: 'mem-2',
        memoryNumber: 2,
        image: '/photos/2.jpg',
        fallbackGradient: 'from-purple-500/30 via-pink-500/20 to-amber-500/30',
        date: '25 de Marzo 2026',
        location: 'Producción🎬',
        title: 'Luces Camara y Acción',
        note: 'Nuestro segundo encuentro… aquel en el que, entre palabras, historias y miles de sonrisas, comenzamos a escribir juntos una novela que aún seguimos viviendo.',
        tag: 'Producción',
      },
      {
        id: 'mem-3',
        memoryNumber: 3,
        image: '/photos/3.jpg',
        fallbackGradient: 'from-rose-500/30 via-amber-500/20 to-emerald-500/30',
        date: '8 de Agosto 2026',
        location: 'Volando 🚗',
        title: 'Entre sonrisas y aventuras',
        note: 'Aquel día en que disfrutamos de la feria por primera vez contigo.',
        tag: 'Globito',
      },
      {
        id: 'mem-4',
        memoryNumber: 4,
        image: '/photos/4.jpg',
        fallbackGradient: 'from-amber-400/30 via-pink-500/20 to-purple-600/30',
        date: 'Hoy y siempre',
        location: 'Compartiendo',
        title: 'Por muchos años más juntos celebrando la vida',
        note: 'Un año más de aprendizajes. Contigo, la vida se trata de aprender, crecer y disfrutar, y eso me encanta. ¡Que este nuevo año venga cargado de mucha abundancia, felicidad y momentos inolvidables!',
        tag: 'Celebremos',
      },
    ],
    completionMessage: 'Y pensar en todo lo que hemos vivido… ¡y todo lo que viene! ',
    buttonText: 'GIRAR LA RULETA',
  },

  // ----------------------------------------------------------------------------
  // NIVEL 2: RULETA DE PREMIOS Y DESEOS 🎡
  // ----------------------------------------------------------------------------
  wheel: {
    levelNumber: 2,
    badge: 'Ruleta de Planes 🎡',
    title: '¿Qué plan tendremos para tu cumpleaños? 🎁',
    subtitle: 'Gira la ruleta y descubre qué planespecial tienes asegurado.',
    spinButtonText: 'GIRAR LA RULETA 🎡',
    spinningText: 'El destino está decidiendo tu plan...',
    resultIntro: '¡El destino ha hablado! 🎉',
    resultSubtitle: 'Este premio es canjeable cuando tengas disponibilidad.',
    acceptButtonText: 'Quedarme con este plan 🎁',
    prizes: [
      {
        id: 'dinner',
        title: 'Comemos Salchipapas',
        emoji: '🍟',
        category: 'Comida y Festejo',
        description: 'Una salida a tu restaurante predilecto, con tu comida favorita.',
        highlights: ['Comida que amas', 'Cero preocupaciones', 'Brindis especial'],
        vibe: 'Delicioso & Festivo',
        color: '#f59e0b',
      },
      {
        id: 'dessert',
        title: 'Vale x Torta o Helado',
        emoji: '🍰',
        category: 'Dulces & Antojos',
        description: 'Tarde de postrecito, torta de cumpleaños o heladito que deseess.',
        highlights: ['Puro dulce', 'Antojo cumplido', 'Momento dulce'],
        vibe: 'Tentador & Dulce',
        color: '#ec4899',
      },
      {
        id: 'movie-series',
        title: 'Cine & Snacks Ilimitados',
        emoji: '🎬',
        category: 'Entretenimiento & Relax',
        description: 'Crispetas, tardeito o noche de cine y comida favorita.',
        highlights: ['Gran película', 'Snacks sin límite', 'Comodidad total'],
        vibe: 'Acogedor & Relajado',
        color: '#8b5cf6',
      },
      {
        id: 'wish-ticket',
        title: 'Ticket de Deseo Cumpleañero',
        emoji: '✨',
        category: 'Comodín Mágico',
        description: 'Tú eliges lo que quieras pedir: un favor, una escapada o una petición especial válida por 1 año.',
        highlights: ['Tú mandas', 'Sin restricciones razonables', 'Poder total'],
        vibe: 'Mágico & Exclusivo',
        color: '#06b6d4',
      },
      {
        id: 'adventure',
        title: 'Tardeo de juegos y aventura',
        emoji: '🌅',
        category: 'Naturaleza & Desconexión',
        description: 'Una salida a un parque , o centro comercial algo distinto para salir de la rutina.',
        highlights: ['Vistas increíbles', 'Fotos lindas', 'Aventura nueva'],
        vibe: 'Aventurero & Único',
        color: '#f43f5e',
      },
    ],
  },

  // ----------------------------------------------------------------------------
  // NIVEL 3: GRAN FINAL & CELEBRACIÓN 🎉
  // ----------------------------------------------------------------------------
  celebration: {
    badge: 'La Gran Revelación 🎁',
    preTitle: 'Llegamos al final del recorrido...',
    mainQuestion: '¿Quieres abrir tu sorpresa final de cumpleaños?',
    subText: 'Completaste la misión, ganaste tu premio y ahora queda lo más importante.',
    yesButtonText: '¡ABRIR REGALO! 🎁',
    noButtonText: 'NO',
    evasiveMessages: [
      '¡Hoy no se aceptan excusas! 😂',
      '¿Seguro? Mira que hay confeti y regalos... 👀',
      'Ese botón NO tiene miedo a celebrar 🎉',
      '¡El botón NO está bloqueado por ser tu día! 😜',
      '¡Imposible escapar, mereces festejar! ✨',
      '¡Haz clic en el SÍ que te va a encantar! ❤️',
    ],
    revealed: {
      badge: '🎂 ¡MISIÓN DE CUMPLEAÑOS COMPLETADA! 🎂',
      title: '¡FELIZ CUMPLEAÑOS! 🎉🥳',
      subtitle: 'Que este nuevo año de vida sea el más brillante hasta ahora.',
      prizePrefix: 'Tu plan oficial:',
      letterParagraph1:
        'Hoy celebramos tu existencia, tu energía y todo lo bonito que aportas a quienes te rodean. Gracias por compartir conmigo tu compañia tus risas, por estar siempre ahí y por ser esa persona incondicional que ilumina donde estés.',
      letterParagraph2:
        'Deseo de todo corazón mi princesa que este nuevo ciclo de vida sea repleto de metas cumplidas, salud, amor y seguir viviendo contigo muchas más aventuras para recordar.',
      letterSign: '¡Te Amo Galacticamente preciosa y que cumplas muchísimos más! ❤️🎂',
      moreConfettiButtonText: '¡Confeti! 🎊',
      restartButtonText: 'Revivir la aventura 🔄',
    },
  },
};
