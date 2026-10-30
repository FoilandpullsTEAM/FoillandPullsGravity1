/* ══════════════════════════════════════════════════════════════════
   ESTE ES EL ÚNICO ARCHIVO QUE NECESITÁS TOCAR.

   Acá viven los textos, las imágenes, los videos y los fondos de todo
   el sitio. Los colores y las tipografías están aparte, en
   `src/index.css`, arriba de todo.

   Si cambiás algo acá, cambia en todas las pantallas a la vez
   (computadora y celular). No hace falta buscarlo en ningún otro lado.
   ══════════════════════════════════════════════════════════════════ */
import { asset } from "@/lib/assets";
import type { Layer } from "@/components/ui/SectionBackdrop";

/* ─────────────── 1. IMÁGENES Y VIDEOS ───────────────
   Cambiá una dirección acá y cambia en todos los lugares donde se use
   esa imagen. Pegá la dirección completa entre las comillas. */
export const MEDIA = {
  /** Fondo del hero: el cielo. */
  heroSky: asset("/figma/bg-sky.jpg"),
  /** Textura de grano que va encima del cielo, apenas visible. */
  heroTexture: asset("/figma/texture.jpg"),
  /** La bailarina. Se usa TRES veces: el cuerpo en el hero, el recorte
      que le pasa por delante al título, y la silueta de la sección
      final. Si la cambiás, cambian las tres — es a propósito. */
  dancer: asset("/figma/dancer.webp"),
  /** Retrato recortado: el menú y el Manifesto. */
  dancerTop: asset("/figma/dancer-top.webp"),

  /** El logo. */
  logomark: "/assets/aistudio/Neon_Hexagonal_Tech_Emblem_7c1bd6cc.png",
  /** La chapita que acompaña a las tarjetas de dato del hero. */
  badge: asset("/figma/badge.webp"),

  /* Formas dibujadas del diseño: los resplandores de fondo del hero y las
     marcas del suelo. Si las cambiás por otro dibujo, respetá la proporción
     o van a quedar corridas. */
  haloLeft: asset("/svg/swirl-left.svg"),
  haloRight: asset("/svg/swirl-right.svg"),
  haloCenter: asset("/svg/swirl-center.svg"),
  haloMobile: asset("/svg/swirl-mobile.svg"),
  ground1: asset("/svg/ground-1.svg"),
  ground2: asset("/svg/ground-2.svg"),
  flower: asset("/svg/flower.svg"),

  /** Tomas de ambiente del cuerpo del sitio. */
  atmo: [
    asset("/figma/atmo-01.jpg"),
    asset("/figma/atmo-02.jpg"),
    asset("/figma/atmo-03.jpg"),
    asset("/figma/atmo-04.jpg"),
    asset("/figma/atmo-05.jpg"),
    asset("/figma/atmo-06.jpg"),
  ],

  /** Los catorce retratos del grupo "10K+ Active Members", en orden.
      Cambiá esta lista para poner las caras de tu propia gente. */
  avatars: [
    asset("/figma/avatar-01.jpg"),
    asset("/figma/avatar-02.jpg"),
    asset("/figma/avatar-03.jpg"),
    asset("/figma/avatar-04.jpg"),
    asset("/figma/avatar-05.jpg"),
    asset("/figma/avatar-06.jpg"),
    asset("/figma/avatar-07.jpg"),
    asset("/figma/avatar-08.jpg"),
    asset("/figma/avatar-09.jpg"),
    asset("/figma/avatar-10.jpg"),
    asset("/figma/avatar-11.jpg"),
    asset("/figma/avatar-12.jpg"),
    asset("/figma/avatar-13.jpg"),
    asset("/figma/avatar-14.jpg"),
  ],

  /** Cartas Pokémon 30 Aniversario */
  pokemonCards: [
    {
      id: "pikachu",
      name: "Pikachu 30th Anniversary",
      src: "/pokemon/pikachu-30th.jpg",
    },
    {
      id: "charizard",
      name: "Charizard 30th Anniversary",
      src: "/pokemon/charizard-30th.jpg",
    },
    {
      id: "mew",
      name: "Mew Star 30th Anniversary",
      src: "/pokemon/mew-30th.jpg",
    },
    {
      id: "rayquaza",
      name: "Rayquaza 30th Anniversary",
      src: "/pokemon/rayquaza-30th.jpg",
    },
  ],

  /** Cajas protectoras y Deck Boxes TCG */
  deckBoxes: [
    "/assets/aistudio/WhatsApp_Image_2026-10-19_at_2.13.00_PM_bed88c05.jpeg",
    "/assets/aistudio/Caja_Deck_Box_Pikachu_2026_Cartas_Coleccionables1_4e9d8b51.png",
    "/assets/aistudio/enhanced_Deck_Box_Portamazo_Tcg_Poke_mon_Con_Visor_Y_Visor_De_Carta1_8db05522.png",
    "/assets/aistudio/Deck_Box_Caja_Para_Mazo_Poke_mon_Tcg_-_120_Cartas_Con_Sleeves_b00c7681.png",
    "/assets/aistudio/Caja_Protectora_Para_Bundle_Box_Pokemon_Tcg_de1fccdf.png",
  ],

  /** Logo oficial 30th Celebration Pokémon TCG */
  pokemon30Logo: "/pokemon/logo-30th-transparent.png",
  pokemon30LogoRaw: "/assets/aistudio/Logo30an_ospokemon_92d05815.png",
} as const;

/* ─────────────── 2. FONDOS DE CADA SECCIÓN ───────────────
   Las capas se pintan de arriba hacia abajo: la PRIMERA de la lista es
   la que queda más atrás.

   Para sacar una capa, borrá su línea.
   Para poner una foto de fondo, dejá una sola capa así:
       hero: [{ type: "image", src: "https://tu-foto.jpg" }],
   Para un video:
       hero: [{ type: "video", src: "...", poster: "...", mode: "loop" }],
   Para un color plano:
       hero: [{ type: "color", value: "#101820" }],

   Tipos disponibles: "image" · "video" · "color" · "gradient" ·
   "veil" (un velo encima) · "grain" (grano de película) · "vignette". */
export const BACKGROUNDS: Record<string, Layer[]> = {
  /** Hero en computadora. El cielo va estirado a propósito: el diseño
      convierte el degradado en franjas horizontales. */
  hero: [
    { type: "image", src: MEDIA.heroSky, fit: "fill", height: "105%", parallax: 70 },
    {
      type: "image",
      src: MEDIA.heroTexture,
      bleed: "8%",
      opacity: 0.2,
      blend: "color-dodge",
      parallax: 70,
    },
  ],

  /** Hero en celular. Misma receta, encuadre distinto. */
  heroMobile: [
    { type: "image", src: MEDIA.heroSky, fit: "cover", position: "bottom" },
    { type: "image", src: MEDIA.heroTexture, bleed: "10%", opacity: 0.2, blend: "color-dodge" },
  ],

  /** Fondo de todo lo que viene después del hero. Arranca en el tono en
      el que muere la foto del cielo y se hunde hacia el azul profundo.
      Las paradas van en píxeles y no en porcentaje: la página mide
      varios miles de píxeles, y un 9 % dejaría media pantalla en el azul
      pálido con el texto blanco sin contraste. */
  body: [
    {
      type: "gradient",
      value:
        "linear-gradient(180deg, var(--color-sky-fade) 0px, var(--color-cyan-mid) 180px, var(--color-deep-mid) 520px, var(--color-ink) 1500px, var(--color-abyss) 100%)",
    },
  ],
};

/* ─────────────── 3. TEXTOS ─────────────── */

export const NAV = {
  links: [
    { id: "home", label: "Home", href: "#home", preview: MEDIA.dancerTop },
    { id: "about", label: "About", href: "#about", preview: MEDIA.atmo[0] },
    { id: "classes", label: "Classes", href: "#classes", preview: MEDIA.atmo[2] },
    { id: "instructors", label: "Instructors", href: "#instructors", preview: MEDIA.avatars[0] },
    { id: "community", label: "Community", href: "#community", preview: MEDIA.atmo[4] },
  ],
  mobileTrigger: "Menu",
  closeLabel: "Cerrar",
  address: "Carrer de la Gravetat 14 · Barcelona",
  email: "hola@progravity.studio",
} as const;

export const HERO = {
  /** El nombre de la marca. */
  brand: "foillandpulls",
  /** Título que leen los lectores de pantalla (no se ve en la página). */
  srTitle: "foillandpulls — Defy gravity, own the dance.",
  /**
   * Partes del título del hero.
   */
  brandParts: {
    line1: "Foil",
    line2: "landpulls",
  },
  /** El lema, en dos líneas de dos pedazos cada una. */
  tagline: [
    ["Defy", "Gravity."],
    ["Own the", "Dance."],
  ],
  /** Los botones del hero. */
  buttons: [
    { label: "Join the Movement", href: "#membership", style: "solid" },
    { label: "Our Classes", href: "#classes", style: "ghost" },
  ],
  body: "foillandpulls is a next-level dance experience that blends strength, rhythm, and aerial-inspired movement into one seamless flow.",
  stats: [
    { value: 150, suffix: "+", label: "Classes Monthly" },
    { value: 10, suffix: "K+", label: "Active Members" },
  ],
  dancerAlt: "Bailarín de foillandpulls suspendido en el aire",
  pokemon30LogoAlt: "Pokémon Trading Card Game 30th Celebration",
} as const;

export const MARQUEE = {
  row1: ["Defy Gravity", "Own the Dance", "Aerial Flow", "Strength × Rhythm", "No Ceiling"],
  row2: ["No Ceiling", "Strength × Rhythm", "Aerial Flow", "Own the Dance", "Defy Gravity"],
  separator1: "✦",
  separator2: "—",
} as const;

export const MANIFESTO = {
  kicker: "The Method",
  title: "Movement without a ceiling",
  lead: "Cada sesión se construye sobre tres capas: fuerza que sostiene, ritmo que ordena y suspensión que libera. Aprendes a caer bien antes de aprender a volar.",
  pillars: [
    {
      number: "01",
      title: "Ground",
      description: "Base de fuerza y control postural. Sin suelo firme no hay vuelo limpio.",
    },
    {
      number: "02",
      title: "Flow",
      description: "Transiciones continuas: el peso se transfiere sin cortes ni pausas visibles.",
    },
    {
      number: "03",
      title: "Air",
      description: "Trabajo aéreo asistido, saltos y suspensiones con retorno controlado.",
    },
  ],
  figures: [
    { value: 12, suffix: "", label: "Años de método" },
    { value: 3, suffix: "", label: "Salas en la ciudad" },
    { value: 40, suffix: "+", label: "Profesores certificados" },
  ],
  images: {
    top: {
      src: MEDIA.dancerTop,
      alt: "Suspensión asistida · Sala A",
      caption: "Suspensión asistida · Sala A",
    },
    bottom: {
      src: MEDIA.atmo[3],
      alt: "Night Session",
      caption: "Night Session",
    },
  },
} as const;

export const LEVELS = ["All", "Beginner", "Intermediate", "Advanced"] as const;

export const CLASSES = {
  kicker: "Timetable",
  title: "Elige tu nivel",
  lead: "Seis formatos que se encadenan entre sí. Empieza por donde estés hoy: el método te lleva al siguiente.",
  cta: "Ver horarios completos",
  items: [
    {
      id: "basics",
      title: "Gravity Basics",
      level: "Beginner",
      duration: "45 min",
      intensity: 2,
      description: "Alineación, respiración y las cinco caídas seguras que abren todo el método.",
      image: MEDIA.atmo[0],
    },
    {
      id: "flow",
      title: "Aerial Flow",
      level: "Intermediate",
      duration: "60 min",
      intensity: 4,
      description: "Secuencias continuas con suspensión asistida y retorno al suelo sin impacto.",
      image: MEDIA.atmo[1],
    },
    {
      id: "drop",
      title: "Power Drop",
      level: "Advanced",
      duration: "75 min",
      intensity: 5,
      description: "Explosividad, saltos altos y descensos controlados. Solo con base sólida.",
      image: MEDIA.atmo[2],
    },
    {
      id: "rhythm",
      title: "Rhythm Lab",
      level: "Beginner",
      duration: "50 min",
      intensity: 3,
      description: "Musicalidad pura: subdivisión, acento y silencio aplicados al cuerpo entero.",
      image: MEDIA.atmo[3],
    },
    {
      id: "suspension",
      title: "Core Suspension",
      level: "Intermediate",
      duration: "55 min",
      intensity: 4,
      description: "Centro, cadena posterior y agarre. La clase que sostiene todas las demás.",
      image: MEDIA.atmo[4],
    },
    {
      id: "night",
      title: "Night Session",
      level: "Advanced",
      duration: "90 min",
      intensity: 5,
      description: "Improvisación libre en sala abierta con DJ en vivo. Solo por invitación.",
      image: MEDIA.atmo[5],
    },
  ],
} as const;

export const INSTRUCTORS = {
  kicker: "The Crew",
  title: "Quién te va a corregir",
  lead: "Cinco personas, un método. Cada una sostiene una capa distinta del programa.",
  items: [
    {
      id: "noa",
      name: "Noa Ferrand",
      role: "Head of Aerial",
      years: "09 years",
      bio: "Formada en circo contemporáneo y danza aérea. Dirige el programa de suspensión y toda la progresión de retorno al suelo.",
      image: MEDIA.avatars[0],
    },
    {
      id: "kai",
      name: "Kai Ortega",
      role: "Rhythm & Musicality",
      years: "07 years",
      bio: "Percusionista antes que bailarín. Trabaja la subdivisión rítmica como herramienta de control, no como adorno.",
      image: MEDIA.avatars[1],
    },
    {
      id: "lina",
      name: "Lina Meško",
      role: "Strength Base",
      years: "11 years",
      bio: "Preparadora física del equipo. Diseña las bases de fuerza que sostienen el trabajo aéreo de todo el estudio.",
      image: MEDIA.avatars[2],
    },
    {
      id: "dario",
      name: "Dario Vance",
      role: "Power & Impact",
      years: "06 years",
      bio: "Especialista en impacto y explosividad. Su clase Power Drop es la más exigente del calendario.",
      image: MEDIA.avatars[3],
    },
    {
      id: "sena",
      name: "Sena Aydın",
      role: "Flow Architecture",
      years: "08 years",
      bio: "Coreógrafa. Construye las secuencias largas que unen las tres capas del método en un solo recorrido.",
      image: MEDIA.avatars[4],
    },
  ],
} as const;

export const GALLERY = {
  kicker: "Inside the studio",
  title: "Cómo se ve por dentro",
  lead: "Sesiones reales y equipamiento de colección. Pulsa cualquier imagen para verla en grande.",
  items: [
    { id: "1", title: "Warm-up · Studio A", shape: "tall" as const, src: MEDIA.atmo[0] },
    { id: "box-1", title: "Poké Ball Deck Box · TCG Classic", shape: "wide" as const, src: MEDIA.deckBoxes[0] },
    { id: "2", title: "Suspension drill", shape: "wide" as const, src: MEDIA.atmo[1] },
    { id: "box-2", title: "Caja Deck Box Pikachu 2026 Coleccionables", shape: "tall" as const, src: MEDIA.deckBoxes[1] },
    { id: "3", title: "Rhythm Lab", shape: "normal" as const, src: MEDIA.atmo[2] },
    { id: "box-3", title: "Deck Box Portamazo con Visor Team Rocket Force", shape: "wide" as const, src: MEDIA.deckBoxes[2] },
    { id: "4", title: "Open floor", shape: "tall" as const, src: MEDIA.atmo[3] },
    { id: "box-4", title: "Deck Box Caja para Mazo · 120 Cartas con Sleeves", shape: "normal" as const, src: MEDIA.deckBoxes[3] },
    { id: "5", title: "Night Session", shape: "normal" as const, src: MEDIA.atmo[4] },
    { id: "box-5", title: "Caja Protectora para Bundle Box 30th Celebration", shape: "tall" as const, src: MEDIA.deckBoxes[4] },
    { id: "6", title: "Drop practice", shape: "wide" as const, src: MEDIA.atmo[5] },
    { id: "7", title: "Cool down", shape: "normal" as const, src: MEDIA.avatars[5] },
    { id: "8", title: "Studio B", shape: "normal" as const, src: MEDIA.avatars[6] },
  ],
} as const;

export const TESTIMONIALS = {
  kicker: "Community",
  title: "Lo cuentan ellos",
  lead: "Cuatro voces de las diez mil personas que entrenan con el método.",
  items: [
    {
      name: "Mireia Solà",
      since: "Miembro desde 2023",
      quote:
        "Llegué sin poder sostener mi propio peso treinta segundos. Ocho meses después cerré mi primera secuencia aérea completa.",
      avatar: MEDIA.avatars[7],
    },
    {
      name: "Tomás Iriarte",
      since: "Miembro desde 2022",
      quote:
        "No es una clase de fitness disfrazada de danza. Es técnica real, corregida de cerca, con una progresión que se nota cada semana.",
      avatar: MEDIA.avatars[8],
    },
    {
      name: "Yuki Hara",
      since: "Miembro desde 2024",
      quote:
        "La comunidad es la mitad del método. Nadie compite contigo; todo el mundo te sostiene el peso cuando hace falta.",
      avatar: MEDIA.avatars[9],
    },
    {
      name: "Adaeze Nwosu",
      since: "Miembro desde 2021",
      quote:
        "El trabajo de suelo cambió mi forma de caminar. Suena exagerado hasta que te pasa.",
      avatar: MEDIA.avatars[10],
    },
  ],
} as const;

export const PLANS = {
  kicker: "Membership",
  title: "Entra al movimiento",
  lead: "Sin permanencia. Cambias o cancelas tu plan desde la app cuando quieras.",
  discountBadge: "−2 meses",
  periodMonthly: "/mo",
  periodYearly: "/yr",
  items: [
    {
      id: "drop-in",
      name: "Drop-in",
      monthly: 29,
      yearly: 290,
      description: "Para probar el método sin compromiso.",
      featured: false,
      perks: ["4 clases al mes", "Acceso a Gravity Basics", "App de seguimiento"],
      cta: "Elegir Drop-in",
    },
    {
      id: "flow",
      name: "Flow",
      monthly: 69,
      yearly: 690,
      description: "El plan de quien ya entrena en serio.",
      featured: true,
      badge: "Más elegido",
      perks: [
        "Clases ilimitadas",
        "Todas las disciplinas",
        "Sala abierta 7 días",
        "2 invitados al mes",
      ],
      cta: "Elegir Flow",
    },
    {
      id: "air",
      name: "Air",
      monthly: 119,
      yearly: 1190,
      description: "Acompañamiento uno a uno y trabajo aéreo avanzado.",
      featured: false,
      perks: [
        "Todo lo del plan Flow",
        "2 sesiones privadas al mes",
        "Night Session incluida",
        "Plan de fuerza personalizado",
      ],
      cta: "Elegir Air",
    },
  ],
} as const;

export const JOIN = {
  pill: "Primera clase gratis",
  titlePart1: "Defy gravity.",
  titlePart2: "Own the dance.",
  inputPlaceholder: "tu@correo.com",
  buttonSubmit: "Reservar mi clase",
  buttonSending: "Enviando…",
  errorValidation: "Escribe un correo válido, por ejemplo nombre@dominio.com.",
  successEcho:
    "Hecho. Te hemos reservado una plaza de prueba y te escribimos a",
  successSuffix: "con los horarios de esta semana.",
} as const;

export const FOOTER_LINKS = {
  description:
    "Next-level aerial dance studio. Strength, rhythm and suspension.",
  wordmark: "foillandpulls",
  columns: [
    {
      title: "Studio",
      links: [
        { label: "About", href: "#about" },
        { label: "Classes", href: "#classes" },
        { label: "Instructors", href: "#instructors" },
        { label: "Community", href: "#community" },
      ],
    },
    {
      title: "Visit",
      links: [
        { label: "Book a trial", href: "#join" },
        { label: "Schedule", href: "#classes" },
        { label: "Memberships", href: "#membership" },
        { label: "Gift cards", href: "#" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Terms", href: "#" },
        { label: "Privacy", href: "#" },
        { label: "Cookies", href: "#" },
        { label: "Accessibility", href: "#" },
      ],
    },
  ],
  credit:
    "Diseño replicado del archivo de Figma «Daily Hero 13 · Arkkhe» — nodos 6001:119 y 6001:208.",
  copyright: "© 2026 foillandpulls Studio. Todos los derechos reservados.",
} as const;

export const SOCIALS = [
  { name: "Instagram", href: "https://instagram.com" },
  { name: "YouTube", href: "https://youtube.com" },
  { name: "X", href: "https://x.com" },
] as const;

export const ADMIN = {
  triggerButton: "Editor Online",
  modalTitle: "Panel de Edición",
  modalSubtitle: "Acceso exclusivo para administradores",
  closeButton: "Cerrar",
  loginError: "Usuario o contraseña incorrectos",
  usernameLabel: "Usuario",
  usernamePlaceholder: "admin",
  passwordLabel: "Contraseña",
  passwordPlaceholder: "••••••••",
  loginButton: "Ingresar",
  editorTitle: "Editor en Tiempo Real",
  editorSubtitle: "Los cambios se guardan localmente en tu navegador",
  logoutButton: "Salir",
  exportButton: "Copiar JSON",
  resetButton: "Restablecer",
  resetConfirm: "¿Deseas restablecer todos los textos e imágenes a los valores iniciales?",
  saveNotice: "Guardado automáticamente en LocalStorage",
  copiedNotice: "¡Copiado al portapapeles!",
  tabs: {
    hero: "Hero & Marca",
    pokemon: "Cartas Pokémon",
    media: "Imágenes & Logos",
    manifesto: "El Método",
    classes: "Clases",
    instructors: "Instructores",
    membership: "Membresías",
    footer: "Pie de Página",
  },
  fields: {
    brandName: "Nombre de Marca",
    brandLine1: "Título Línea 1",
    brandLine2: "Título Línea 2",
    tagline1: "Lema Línea 1 - Parte A",
    tagline2: "Lema Línea 1 - Parte B",
    tagline3: "Lema Línea 2 - Parte A",
    tagline4: "Lema Línea 2 - Parte B",
    heroBody: "Descripción del Hero",
    heroBtn1: "Botón Principal",
    heroBtn2: "Botón Secundario",
    cardTitle: "Nombre de la Carta",
    cardUrl: "URL o Ruta de la Imagen",
    logoImage: "Logo Superior (Ruta / URL)",
    heroDancerImage: "Bailarín Central (Ruta / URL)",
    manifestoKicker: "Subtítulo / Kicker",
    manifestoTitle: "Título del Método",
    manifestoLead: "Descripción del Método",
    itemTitle: "Título",
    itemDesc: "Descripción",
    classesKicker: "Kicker Clases",
    classesTitle: "Título Clases",
    classesLead: "Descripción Clases",
    itemDuration: "Duración",
    instructorsKicker: "Kicker Instructores",
    instructorsTitle: "Título Instructores",
    itemName: "Nombre",
    itemRole: "Rol / Especialidad",
    itemYears: "Años de Experiencia",
    itemBio: "Biografía",
    membershipKicker: "Kicker Membresía",
    membershipTitle: "Título Membresía",
    planName: "Nombre del Plan",
    planPrice: "Precio Mensual (€)",
    planDesc: "Descripción del Plan",
    planCta: "Texto del Botón",
    joinTitle1: "Llamado a la Acción Línea 1",
    joinTitle2: "Llamado a la Acción Línea 2",
    joinButton: "Botón de Registro",
    footerWordmark: "Palabra de Marca de Fondo",
    footerDesc: "Descripción de Pie",
    footerCopyright: "Texto de Copyright",
  },
} as const;
