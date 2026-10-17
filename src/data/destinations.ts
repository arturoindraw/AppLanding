export interface Experience {
  id: string;
  title: string;
  shortDesc: string;
  country: 'panama' | 'colombia';
  region: string;
  category: 'playas' | 'cultura' | 'naturaleza' | 'gastronomia' | 'lujo';
  duration: string;
  durationCategory: 'medio_dia' | 'dia_completo' | 'multidia';
  priceUsd: number;
  rating: number;
  reviewsCount: number;
  imageUrl: string;
  badge?: string;
  highlights: string[];
  included: string[];
  excluded: string[];
  operationalNotes: string;
  pickupTime: string;
  language: 'Bilingüe (ES / EN)' | 'Español' | 'Multilingüe bajo solicitud';
  physicalLevel: 'Fácil' | 'Moderado' | 'Activo';
}

export interface DayPlan {
  dayNumber: number;
  title: string;
  country: 'panama' | 'colombia';
  destination: string;
  summary: string;
  activities: string[];
  hotelSuggestion: string;
  mealsIncluded: string;
  transferType: string;
}

export interface MultiPackage {
  id: string;
  name: string;
  tagline: string;
  totalDays: number;
  nightsPanama: number;
  nightsColombia: number;
  basePriceUsd: number;
  rating: number;
  reviewsCount: number;
  imageUrl: string;
  badge: string;
  description: string;
  targetAudience: string;
  highlights: string[];
  itinerary: DayPlan[];
}

export interface SupplierPartner {
  id: string;
  name: string;
  country: 'panama' | 'colombia';
  category: 'Transporte Terrestre' | 'Náutico / Lanchas' | 'Guías Oficiales' | 'Hotelería Boutique';
  contactPerson: string;
  phone: string;
  rating: number;
  status: 'Activo / Certificado' | 'En revisión';
  licensedNumber: string;
}

export interface BookingLead {
  id: string;
  voucherCode: string;
  clientName: string;
  agencyName: string;
  email: string;
  phone: string;
  countryRoute: 'Panamá + Colombia' | 'Panamá Exclusivo' | 'Colombia Exclusivo';
  travelDates: string;
  paxAdults: number;
  paxChildren: number;
  hotelTier: 'standard' | 'superior' | 'luxury';
  totalUsd: number;
  currency: 'USD' | 'COP';
  status: 'Nueva cotización' | 'Confirmada' | 'En operación' | 'Completada';
  assignedGuide: string;
  notes: string;
}

export const EXPERIENCES_CATALOG: Experience[] = [
  // PANAMÁ
  {
    id: 'pan-01',
    title: 'Tránsito Parcial por el Canal & Esclusas de Miraflores VIP',
    shortDesc: 'Navegación guiada dentro del Canal de Panamá junto a buques Panamax y acceso prioritario al nuevo centro de visitantes IMAX.',
    country: 'panama',
    region: 'Ciudad de Panamá',
    category: 'cultura',
    duration: '5 horas',
    durationCategory: 'medio_dia',
    priceUsd: 135,
    rating: 4.95,
    reviewsCount: 312,
    imageUrl: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80',
    badge: 'Imprescindible',
    highlights: [
      'Paso en embarcación por las cámaras de Miraflores y Pedro Miguel',
      'Charla magistral de historiador y práctico canalero',
      'Almuerzo buffet criollo a bordo y bar abierto sin alcohol',
      'Vistas panorámicas del Puente de las Américas'
    ],
    included: ['Entradas oficiales a la ACP', 'Almuerzo buffet y bebidas', 'Transporte ida y vuelta desde hotel', 'Guía bilingüe certificado'],
    excluded: ['Propinas voluntarias', 'Bebidas alcohólicas premium'],
    operationalNotes: 'Salidas coordinadas con la autoridad del Canal según el corte de agua (horario confirmado 24h antes).',
    pickupTime: '07:30 AM (Lobby del hotel)',
    language: 'Bilingüe (ES / EN)',
    physicalLevel: 'Fácil'
  },
  {
    id: 'pan-02',
    title: 'Expedición Archipiélago San Blas (Guna Yala) en Catamarán Privado',
    shortDesc: 'Aguas cristalinas, 365 islas de arena blanca y convivencia cultural respetuosa con la comarca indígena autónoma Guna.',
    country: 'panama',
    region: 'Guna Yala',
    category: 'playas',
    duration: 'Día completo (12h)',
    durationCategory: 'dia_completo',
    priceUsd: 185,
    rating: 4.98,
    reviewsCount: 420,
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    badge: 'Top DMC',
    highlights: [
      'Visita a Isla Perro Chico, Piscina Natural con estrellas de mar e Isla Pelícano',
      'Almuerzo fresco con pesca del día o langosta marina según temporada',
      'Transporte 4x4 cruzando la cordillera del Darién hasta el puerto de Cartí',
      'Taller de arte textil de la Mola con artesanas Guna'
    ],
    included: ['Transporte 4x4 con conductor autorizado', 'Lancha rápida con chalecos salvavidas', 'Impuestos comarcales Guna', 'Almuerzo y snorkel gear'],
    excluded: ['Snacks adicionales y souvenirs', 'Bebidas alcohólicas'],
    operationalNotes: 'Imprescindible pasaporte original físico para el puesto de control fronterizo comarcal.',
    pickupTime: '05:15 AM (Lobby del hotel en PTY)',
    language: 'Bilingüe (ES / EN)',
    physicalLevel: 'Moderado'
  },
  {
    id: 'pan-03',
    title: 'Casco Antiguo Rooftop Safari & Maridaje con Café Geisha',
    shortDesc: 'Recorrido histórico por iglesias barrocas, plazas de 1673 y cata privada de café Geisha de Boquete galardonado mundialmente.',
    country: 'panama',
    region: 'Ciudad de Panamá',
    category: 'gastronomia',
    duration: '3.5 horas',
    durationCategory: 'medio_dia',
    priceUsd: 85,
    rating: 4.92,
    reviewsCount: 188,
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    badge: 'Experiencia Gourmet',
    highlights: [
      'Degustación sensorial de 3 variedades de café Geisha lavado y natural',
      'Paseo peatonal por la Plaza Mayor, Arco Chato y Paseo Esteban Huertas',
      'Cóctel artesanal de autor en terraza privada con vista al skyline moderno',
      'Explicación arquitectónica de la reconstrucción tras el ataque pirata de Henry Morgan'
    ],
    included: ['Cata de café con barista SCA certificado', '1 cóctel de autor y tapas maridadas', 'Guía arquitecto local'],
    excluded: ['Compras de café empaquetado para llevar', 'Cena completa posterior'],
    operationalNotes: 'Paseo a pie con adoquines históricos; se recomienda calzado cómodo.',
    pickupTime: '03:30 PM',
    language: 'Bilingüe (ES / EN)',
    physicalLevel: 'Fácil'
  },
  {
    id: 'pan-04',
    title: 'Tierras Altas de Boquete & Volcán Barú: Canopy y Bosque Nuboso',
    shortDesc: 'Aventura entre puentes colgantes, avistamiento del Quetzal resplandeciente y microclima templado de montaña en Chiriquí.',
    country: 'panama',
    region: 'Chiriquí / Boquete',
    category: 'naturaleza',
    duration: '6 horas',
    durationCategory: 'dia_completo',
    priceUsd: 140,
    rating: 4.88,
    reviewsCount: 145,
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    badge: 'Aventura Verde',
    highlights: [
      'Circuito de 6 puentes colgantes suspendidos sobre el dosel arbóreo',
      'Visita guiada a una finca cafetalera en faldas volcánicas con cata',
      'Avistamiento de orquídeas endémicas y aves migratorias',
      'Clima primaveral constante entre 18°C y 22°C'
    ],
    included: ['Guía naturalista bilingüe', 'Equipamiento y arneses homologados', 'Entradas a reservas privadas', 'Snack energético'],
    excluded: ['Vuelo doméstico PTY-David (se cotiza por separado)'],
    operationalNotes: 'Llevar chaqueta impermeable liviana y calzado con tracción.',
    pickupTime: '08:30 AM (Hoteles de Boquete)',
    language: 'Bilingüe (ES / EN)',
    physicalLevel: 'Moderado'
  },
  {
    id: 'pan-05',
    title: 'Bocas del Toro: Cayo Zapatilla & Snorkel en Bahía de Delfines',
    shortDesc: 'El Caribe afroantillano panameño en su máxima expresión: aguas turquesa, arrecifes de coral y cultura sobre pilotes de madera.',
    country: 'panama',
    region: 'Bocas del Toro',
    category: 'playas',
    duration: '7 horas',
    durationCategory: 'dia_completo',
    priceUsd: 110,
    rating: 4.91,
    reviewsCount: 230,
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
    badge: 'Caribe Eco',
    highlights: [
      'Navegación por el Parque Nacional Marino Isla Bastimentos',
      'Encuentro ético con delfines nariz de botella en libertad',
      'Snorkel en arrecife de Coral Cay con abundante vida marina',
      'Tiempo libre en las idílicas playas vírgenes de Cayo Zapatilla'
    ],
    included: ['Lancha con capitán certificado', 'Equipo completo de careteo y snorkel', 'Impuesto de parque marino', 'Agua fresca y frutas tropicales'],
    excluded: ['Almuerzo en restaurante flotante (pago directo aprox. $15-$25 USD)'],
    operationalNotes: 'Sujeto a condiciones marítimas favorables; itinerario alternativo protegido disponible en caso de oleaje.',
    pickupTime: '09:00 AM (Muelle Isla Colón)',
    language: 'Bilingüe (ES / EN)',
    physicalLevel: 'Fácil'
  },

  // COLOMBIA
  {
    id: 'col-01',
    title: 'Cartagena Colonial VIP & Patios Secretos de Gabriel García Márquez',
    shortDesc: 'Inmersión privada en las murallas del siglo XVI, palacios coloniales restaurados y los rincones que inspiraron el realismo mágico.',
    country: 'colombia',
    region: 'Cartagena de Indias',
    category: 'cultura',
    duration: '4 horas',
    durationCategory: 'medio_dia',
    priceUsd: 95,
    rating: 4.97,
    reviewsCount: 520,
    imageUrl: 'https://images.unsplash.com/photo-1583531172005-814191b8b6c0?auto=format&fit=crop&w=1200&q=80',
    badge: 'Histórico Exclusivo',
    highlights: [
      'Acceso exclusivo a casas señoriales coloniales no abiertas al público',
      'Paseo por el barrio Getsemaní con su vibrante arte urbano y champeta',
      'Cata privada de ron añejo colombiano y chocolates de cacao fino de aroma',
      'Puesta de sol sobre los baluartes de Santo Domingo'
    ],
    included: ['Historiador profesional privado', 'Cata de rones premium con sommelier', 'Entradas al Palacio de la Inquisición', 'Paseo en coche eléctrico'],
    excluded: ['Cena formal posterior'],
    operationalNotes: 'Recomendable horario de tarde (3:30 PM a 7:30 PM) para evitar las horas de mayor calor caribeño.',
    pickupTime: '03:30 PM (Lobby hotel en Centro Histórico o Bocagrande)',
    language: 'Bilingüe (ES / EN)',
    physicalLevel: 'Fácil'
  },
  {
    id: 'col-02',
    title: 'Islas del Rosario & Barú: Day Tour en Yate Privado Luxury',
    shortDesc: 'Navegación exclusiva por el parque de corales submarinos, club de playa de lujo privado y gastronomía caribeña de autor.',
    country: 'colombia',
    region: 'Cartagena / Islas del Rosario',
    category: 'lujo',
    duration: '8 horas',
    durationCategory: 'dia_completo',
    priceUsd: 220,
    rating: 4.96,
    reviewsCount: 290,
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    badge: 'Ultra Lujo',
    highlights: [
      'Yate bimotor privado de 38 pies con capitán, marinero y sistema de sonido surround',
      'Day pass exclusivo en Isla del Pirata o Makani Beach Club con cama balinesa',
      'Almuerzo a la carta con arroz con coco, pargo rojo y ensalada fresca',
      'Snorkel en la avioneta sumergida de Pablo Escobar y arrecifes cristalinos'
    ],
    included: ['Chárter náutico privado con combustible', 'Cervezas nacionales, hielo y agua mineral a bordo', 'Impuestos de zarpe portuario', 'Day Pass de playa'],
    excluded: ['Bebidas espirituosas importadas a la carta en el club'],
    operationalNotes: 'Punto de zarpe en Marina Santa Cruz (Manga); traslados terrestres coordinados por TerraIstmo.',
    pickupTime: '08:00 AM',
    language: 'Bilingüe (ES / EN)',
    physicalLevel: 'Fácil'
  },
  {
    id: 'col-03',
    title: 'Medellín Transformación Social: Comuna 13 & Metrocable con Líder Comunitario',
    shortDesc: 'La historia real de resiliencia de la ciudad de la eterna primavera narrada por los propios artistas del hip-hop y gestores barriales.',
    country: 'colombia',
    region: 'Medellín',
    category: 'cultura',
    duration: '4.5 horas',
    durationCategory: 'medio_dia',
    priceUsd: 75,
    rating: 4.99,
    reviewsCount: 680,
    imageUrl: 'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&w=1200&q=80',
    badge: 'Premio Impacto Social',
    highlights: [
      'Subida en escaleras eléctricas al aire libre y mirador 360° del valle de Aburrá',
      'Explicación profunda de los murales y grafitis con historia social',
      'Show de breakdance y rap improvisado por jóvenes del colectivo local',
      'Vuelo en Metrocable Línea K y degustación de helado de mango biche tradicional'
    ],
    included: ['Transporte privado en van climatizada', 'Líder comunitario local + guía bilingüe', 'Tiquete de Metrocable integrado', 'Refrigerio típico'],
    excluded: ['Souvenirs de arte callejero'],
    operationalNotes: 'El 15% del costo de este tour se transfiere de forma directa a la fundación artística de la Comuna 13.',
    pickupTime: '09:00 AM o 02:00 PM',
    language: 'Bilingüe (ES / EN)',
    physicalLevel: 'Moderado'
  },
  {
    id: 'col-04',
    title: 'Eje Cafetero: Valle del Cocora, Palmas de Cera & Salento Colonial',
    shortDesc: 'Trekking suave entre las palmas de cera más altas del planeta, hacienda cafetera de tercera generación y arquitectura tradicional paisa.',
    country: 'colombia',
    region: 'Eje Cafetero / Quindío',
    category: 'naturaleza',
    duration: '8 horas',
    durationCategory: 'dia_completo',
    priceUsd: 130,
    rating: 4.94,
    reviewsCount: 380,
    imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
    badge: 'Patrimonio UNESCO',
    highlights: [
      'Paseo en clásico Jeep Willys tradicional por el cañón cordillerano',
      'Caminata por el bosque de niebla y miradores de las Palmas de Cera del Quindío',
      'Proceso completo del café: recolección manual, despulpado, secado y tueste',
      'Almuerzo típico con trucha al ajillo servida sobre patacón gigante'
    ],
    included: ['Jeep Willys privado', 'Guía profesional de senderismo y café', 'Almuerzo tradicional en Salento', 'Entrada a la reserva natural'],
    excluded: ['Paseo a caballo opcional'],
    operationalNotes: 'Temperatura oscila entre 14°C y 20°C. Traer calzado cerrado adecuado para sendero húmedo.',
    pickupTime: '08:00 AM (Hoteles en Armenia, Pereira o Salento)',
    language: 'Bilingüe (ES / EN)',
    physicalLevel: 'Moderado'
  },
  {
    id: 'col-05',
    title: 'Parque Nacional Natural Tayrona: Senderismo y Playas Sagradas de Cabo San Juan',
    shortDesc: 'Donde la Sierra Nevada de Santa Marta se funde con el mar Caribe: senderos selváticos, monos aulladores y playas vírgenes.',
    country: 'colombia',
    region: 'Santa Marta / Tayrona',
    category: 'naturaleza',
    duration: '9 horas',
    durationCategory: 'dia_completo',
    priceUsd: 125,
    rating: 4.90,
    reviewsCount: 260,
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    badge: 'Reserva de Biósfera',
    highlights: [
      'Caminata bajo el dosel tropical de Arrecifes hasta La Piscina y Cabo San Juan',
      'Baño seguro en piscinas marinas naturales protegidas por barreras rocosas',
      'Interpretación de la cosmovisión de las comunidades indígenas Kogui y Wiwa',
      'Almuerzo frente al mar en choza típica de pescadores'
    ],
    included: ['Entradas oficiales a Parques Nacionales de Colombia', 'Póliza médica obligatoria del parque', 'Guía local certificado', 'Transporte terrestre'],
    excluded: ['Paseo a caballo optativo para tramos de regreso', 'Bebidas extras'],
    operationalNotes: 'Caminata de aprox. 2 horas por trayecto en terreno llano pero con calor tropical. Requiere carné de vacuna de fiebre amarilla.',
    pickupTime: '07:00 AM (Hoteles en Santa Marta o Taganga)',
    language: 'Bilingüe (ES / EN)',
    physicalLevel: 'Activo'
  },
  {
    id: 'col-06',
    title: 'Guatapé & El Peñol: Helicóptero Panorámico & Paseo en Pontón',
    shortDesc: 'Subida al monolito de 220 metros, vuelo panorámico sobre los embalses y pueblo de los zócalos de colores.',
    country: 'colombia',
    region: 'Antioquia / Guatapé',
    category: 'lujo',
    duration: '7 horas',
    durationCategory: 'dia_completo',
    priceUsd: 195,
    rating: 4.93,
    reviewsCount: 310,
    imageUrl: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1200&q=80',
    badge: 'Top Antioquia',
    highlights: [
      'Escalamiento de los 740 escalones de la Piedra del Peñol con vista infinita',
      'Paseo privado en pontón con música y barra de bebidas por las islas del embalse',
      'Visita a las calles empedradas y zócalos artesanales de Guatapé',
      'Almuerzo gourmet paisa frente a la represa'
    ],
    included: ['Transporte privado ida y vuelta desde Medellín', 'Navegación en pontón privado', 'Entrada a la Piedra del Peñol', 'Almuerzo campestre'],
    excluded: ['Vuelo en helicóptero (upgrade opcional disponible +$120 USD/pax)'],
    operationalNotes: 'Tiempo de viaje por carretera desde Medellín aprox. 1h 45m por trayecto.',
    pickupTime: '08:00 AM',
    language: 'Bilingüe (ES / EN)',
    physicalLevel: 'Moderado'
  }
];

export const MULTIDESTINO_PACKAGES: MultiPackage[] = [
  {
    id: 'pkg-01',
    name: 'Ruta Dos Mares y Cafetales',
    tagline: 'Lo mejor de Panamá y Colombia en 8 días: Canal, Islas paradisíacas, Historia amurallada y Medellín innovadora.',
    totalDays: 8,
    nightsPanama: 3,
    nightsColombia: 4,
    basePriceUsd: 1490,
    rating: 4.97,
    reviewsCount: 184,
    imageUrl: 'https://images.unsplash.com/photo-1583531172005-814191b8b6c0?auto=format&fit=crop&w=1200&q=80',
    badge: 'Circuito Estrella Multidestino',
    targetAudience: 'Parejas, grupos de amigos y agencias B2B que buscan el equilibrio ideal entre cultura, trópico y gastronomía.',
    description: 'El programa insignia de TerraIstmo DMC conecta de forma fluida el istmo centroamericano con el Caribe y los Andes colombianos. Incluye asistencia personalizada en aeropuertos, conexión aérea PTY-CTG y guías locales exclusivos.',
    highlights: [
      'Tránsito de esclusas en el Canal de Panamá y cena en terraza del Casco Viejo',
      'Día completo en las islas vírgenes de San Blas (Guna Yala)',
      'Vuelo internacional PTY a Cartagena de Indias incluido',
      'Atardecer en las murallas históricas y tour privado por Getsemaní',
      'Vuelo doméstico o traslado a Medellín con inmersión social en Comuna 13'
    ],
    itinerary: [
      {
        dayNumber: 1,
        title: 'Bienvenida a Ciudad de Panamá — Conexión de Dos Océanos',
        country: 'panama',
        destination: 'Ciudad de Panamá',
        summary: 'Recepción VIP en el Aeropuerto Internacional de Tocumen (PTY), traslado privado al hotel boutique en el Casco Antiguo y cóctel de bienvenida con vista a la bahía.',
        activities: ['Transfer VIP Tocumen a Casco Antiguo', 'Check-in y briefing con el Concierge TerraIstmo', 'Paseo nocturno sugerido por la Plaza Bolívar'],
        hotelSuggestion: 'Hotel La Compañía Hyatt Unbound o Central Hotel Panamá',
        mealsIncluded: 'Cóctel de autor de bienvenida',
        transferType: 'Vehículo ejecutivo privado climatizado'
      },
      {
        dayNumber: 2,
        title: 'La Maravilla de la Ingeniería y Casco Antiguo Colonial',
        country: 'panama',
        destination: 'Ciudad de Panamá',
        summary: 'Visita guiada por el Centro de Visitantes de Miraflores para ver el tránsito de enormes portacontenedores, seguida de recorrido peatonal histórico y cata de café Geisha.',
        activities: ['Visita Miraflores / Canal de Panamá', 'Rooftop Safari & Cata de Café Geisha de Boquete', 'Almuerzo de cocina panameña contemporánea'],
        hotelSuggestion: 'Hotel La Compañía / Central Hotel',
        mealsIncluded: 'Desayuno buffet y almuerzo gastronómico',
        transferType: 'Van privada de turismo con aire acondicionado'
      },
      {
        dayNumber: 3,
        title: 'Paraíso Caribeño: Expedición a San Blas (Guna Yala)',
        country: 'panama',
        destination: 'Guna Yala (San Blas)',
        summary: 'Salida temprana en 4x4 cruzando la serranía selvática hasta el puerto de Cartí. Navegación entre cayos de postal, baño en la piscina natural y almuerzo de langosta marina.',
        activities: ['Crucero en lancha entre cayos coralinos', 'Snorkel en arrecife de Isla Perro Chico', 'Intercambio cultural con la comunidad indígena Guna'],
        hotelSuggestion: 'Regreso a Ciudad de Panamá (o noche opcional en cabaña sobre el agua)',
        mealsIncluded: 'Desayuno y almuerzo caribeño con pesca del día',
        transferType: 'Camioneta 4x4 + Lancha marina rápida homologada'
      },
      {
        dayNumber: 4,
        title: 'Puente Aéreo al Caribe Colombiano: Arribo a Cartagena de Indias',
        country: 'colombia',
        destination: 'Cartagena de Indias',
        summary: 'Traslado al aeropuerto PTY para el vuelo de solo 1 hora y 10 minutos hacia Cartagena (CTG). Llegada a la joya colonial, check-in en casona republicana y paseo al atardecer.',
        activities: ['Vuelo internacional PTY - CTG', 'Recepción en aeropuerto Rafael Núñez y bienvenida con gaitas', 'Brindis con ron colombiano en Baluarte de Santo Domingo'],
        hotelSuggestion: 'Hotel Charleston Santa Teresa o Casa San Agustín',
        mealsIncluded: 'Desayuno buffet y cata de rones',
        transferType: 'Vuelo internacional comercial + Traslado privado en destino'
      },
      {
        dayNumber: 5,
        title: 'Realismo Mágico: Murallas, Patios Secretos y Getsemaní',
        country: 'colombia',
        destination: 'Cartagena de Indias',
        summary: 'Caminata inmersiva descubriendo conventos, floridos balcones de buganvilias, la historia del contrabando pirata y el pulso bohemio del barrio Getsemaní.',
        activities: ['Tour guiado con historiador por el recinto amurallado', 'Taller de arte urbano en Getsemaní', 'Tarde libre para compras de esmeraldas certificadas'],
        hotelSuggestion: 'Hotel Charleston Santa Teresa / Casa San Agustín',
        mealsIncluded: 'Desayuno buffet',
        transferType: 'Recorrido peatonal asistido + traslados locales en coche eléctrico'
      },
      {
        dayNumber: 6,
        title: 'Archipiélago del Rosario: Día de Sol y Mar Turquesa',
        country: 'colombia',
        destination: 'Islas del Rosario',
        summary: 'Zarpe matutino en yate privado hacia las islas de coral protegidas. Snorkel en arrecifes, descanso en camas de playa y almuerzo típico frente al mar.',
        activities: ['Navegación privada por el parque nacional natural marino', 'Snorkel guiado en aguas cristalinas', 'Almuerzo a la orilla del mar en club de playa exclusivo'],
        hotelSuggestion: 'Hotel Charleston Santa Teresa',
        mealsIncluded: 'Desayuno buffet y almuerzo isleño completo',
        transferType: 'Embarcación náutica bimotor privada'
      },
      {
        dayNumber: 7,
        title: 'Medellín de la Eterna Primavera: Resiliencia & Comuna 13',
        country: 'colombia',
        destination: 'Medellín',
        summary: 'Conexión aérea matutina a Medellín. Ascenso en Metrocable sobre las laderas andinas, recorrido por las escaleras eléctricas de la Comuna 13 y cena en El Poblado.',
        activities: ['Vuelo doméstico CTG - MDE', 'Tour de transformación social en Comuna 13 con líder barrial', 'Cena de degustación paisa en restaurante de autor'],
        hotelSuggestion: 'The Click Clack Hotel Medellín o Marriott El Poblado',
        mealsIncluded: 'Desayuno buffet y cena de autor',
        transferType: 'Vuelo doméstico + transporte ejecutivo privado'
      },
      {
        dayNumber: 8,
        title: 'Despedida TerraIstmo & Conexión Internacional',
        country: 'colombia',
        destination: 'Medellín / Retorno',
        summary: 'Mañana libre para compras de diseño colombiano en el Parque Lleras o visita al Museo de Antioquia (Botero). Traslado privado al Aeropuerto José María Córdova (MDE).',
        activities: ['Check-out y asistencia con equipaje', 'Visita panorámica de Plaza Botero (según horario de vuelo)', 'Transfer VIP al aeropuerto internacional MDE'],
        hotelSuggestion: 'Fin de servicios DMC TerraIstmo',
        mealsIncluded: 'Desayuno buffet',
        transferType: 'Vehículo privado al aeropuerto'
      }
    ]
  },
  {
    id: 'pkg-02',
    name: 'Caribe Puro & Culturas Vivas',
    tagline: '10 días explorando la costa caribeña de Panamá y Colombia: Bocas del Toro, San Blas, Cartagena y las selvas sagradas del Tayrona.',
    totalDays: 10,
    nightsPanama: 5,
    nightsColombia: 5,
    basePriceUsd: 1980,
    rating: 4.99,
    reviewsCount: 112,
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    badge: 'Paraíso Caribeño',
    targetAudience: 'Amantes de la playa virgen, biodiversidad marina, ecoturismo de lujo y culturas afroantillanas e indígenas.',
    description: 'Una expedición sensorial que reúne los tres archipiélagos más espectaculares de América Central y del Sur: Bocas del Toro, Guna Yala y las Islas del Rosario, finalizando al pie de la montaña costera más alta del mundo.',
    highlights: [
      'Playas secretas y delfines en Bocas del Toro',
      'Campamento boutique y corales de San Blas',
      'Vuelo interoceánico a Cartagena amurallada',
      'Senderismo en las playas sagradas de Cabo San Juan en Parque Tayrona'
    ],
    itinerary: [
      {
        dayNumber: 1,
        title: 'Arribo a Panamá y vuelo a Bocas del Toro',
        country: 'panama',
        destination: 'Bocas del Toro (Isla Colón)',
        summary: 'Recepción en PTY, vuelo doméstico a Bocas del Toro y check-in en lodge sobre el agua.',
        activities: ['Transfer y vuelo a Bocas', 'Cóctel de maracuyá caribeño', 'Cena en muelle flotante'],
        hotelSuggestion: 'Red Frog Beach Island Resort o Nayara Bocas Bali',
        mealsIncluded: 'Cena de bienvenida',
        transferType: 'Vuelo doméstico + Lancha rápida'
      },
      {
        dayNumber: 2,
        title: 'Cayo Zapatilla y Arrecife de Coral Cay',
        country: 'panama',
        destination: 'Bocas del Toro',
        summary: 'Día de navegación y careteo en las aguas más transparentes de Panamá.',
        activities: ['Snorkel con estrellas de mar y mantarrayas', 'Playa virgen en Zapatilla', 'Avistamiento de osos perezosos'],
        hotelSuggestion: 'Red Frog Beach Island Resort',
        mealsIncluded: 'Desayuno y almuerzo tipo picnic gourmet',
        transferType: 'Lancha rápida con capitán'
      },
      {
        dayNumber: 3,
        title: 'Retorno a Ciudad de Panamá & Casco Histórico',
        country: 'panama',
        destination: 'Ciudad de Panamá',
        summary: 'Vuelo de regreso a la capital y tarde de patrimonio colonial.',
        activities: ['Paseo por el Casco Antiguo', 'Cena gourmet con vista al Canal'],
        hotelSuggestion: 'Hotel La Compañía Hyatt Unbound',
        mealsIncluded: 'Desayuno buffet y cena',
        transferType: 'Vuelo doméstico + Van ejecutiva'
      },
      {
        dayNumber: 4,
        title: 'Islas de San Blas — Cultura Guna Ancestral',
        country: 'panama',
        destination: 'Guna Yala',
        summary: 'Expedición a las islas del Caribe oriental panameño con los indígenas Guna.',
        activities: ['Isla Perro Chico', 'Piscina natural de estrellas marinas', 'Molas artesanales'],
        hotelSuggestion: 'Hotel La Compañía (Ciudad de Panamá)',
        mealsIncluded: 'Desayuno y almuerzo caribeño',
        transferType: '4x4 + Lancha'
      },
      {
        dayNumber: 5,
        title: 'Canal de Panamá y Vuelo a Cartagena de Indias',
        country: 'colombia',
        destination: 'Cartagena de Indias',
        summary: 'Mañana en esclusas de Miraflores y vuelo internacional directo a Colombia.',
        activities: ['Canal de Panamá', 'Vuelo PTY - CTG', 'Check-in en Cartagena amurallada'],
        hotelSuggestion: 'Hotel Sofitel Legend Santa Clara',
        mealsIncluded: 'Desayuno buffet',
        transferType: 'Vuelo internacional + Van privada'
      },
      {
        dayNumber: 6,
        title: 'Cartagena Histórica y Tarde en Barú',
        country: 'colombia',
        destination: 'Cartagena de Indias',
        summary: 'Paseo guiado por baluartes coloniales y tarde de playa privada en península de Barú.',
        activities: ['Caminata histórica privada', 'Club de playa en Barú', 'Atardecer en la muralla'],
        hotelSuggestion: 'Hotel Sofitel Legend Santa Clara',
        mealsIncluded: 'Desayuno buffet y almuerzo de mar',
        transferType: 'Transporte privado + embarcación'
      },
      {
        dayNumber: 7,
        title: 'Ruta Costera hacia Santa Marta y Parque Tayrona',
        country: 'colombia',
        destination: 'Santa Marta / Tayrona',
        summary: 'Ruta panorámica terrestre bordeando el Caribe y la Ciénaga Grande hasta las faldas de la Sierra Nevada.',
        activities: ['Ruta escénica Barranquilla - Santa Marta', 'Llegada al eco-resort selvático'],
        hotelSuggestion: 'Ecohabs Tayrona o Cayena Beach Villa',
        mealsIncluded: 'Desayuno buffet y cena orgánica',
        transferType: 'Van privada de lujo'
      },
      {
        dayNumber: 8,
        title: 'Senderismo Sagrado en Parque Tayrona: Cabo San Juan',
        country: 'colombia',
        destination: 'Parque Nacional Tayrona',
        summary: 'Caminata entre bosque húmedo tropical, avistamiento de fauna y baño en Cabo San Juan de Guía.',
        activities: ['Senderismo guiado por Arrecifes y La Piscina', 'Playa de Cabo San Juan', 'Charla con mamo indígena'],
        hotelSuggestion: 'Cayena Beach Villa',
        mealsIncluded: 'Desayuno buffet y almuerzo campestre',
        transferType: 'Sendero ecológico guiado'
      },
      {
        dayNumber: 9,
        title: 'Día de Relajación en Palomino & Sierra Nevada',
        country: 'colombia',
        destination: 'La Guajira / Palomino',
        summary: 'Descenso en tubing suave por el río Palomino que desemboca en el mar y yoga al atardecer.',
        activities: ['Tubing flotante en río de agua dulce', 'Masaje con aceites tropicales', 'Cena de mariscos'],
        hotelSuggestion: 'Cayena Beach Villa',
        mealsIncluded: 'Desayuno, almuerzo y cena',
        transferType: 'Vehículo privado'
      },
      {
        dayNumber: 10,
        title: 'Retorno desde Santa Marta o Cartagena',
        country: 'colombia',
        destination: 'Santa Marta (SMR) / Retorno',
        summary: 'Traslado al aeropuerto de Santa Marta (SMR) o Cartagena (CTG) para vuelo de conexión de regreso.',
        activities: ['Check-out y transfer VIP al aeropuerto'],
        hotelSuggestion: 'Fin del itinerario',
        mealsIncluded: 'Desayuno buffet',
        transferType: 'Vehículo privado'
      }
    ]
  },
  {
    id: 'pkg-03',
    name: 'Expedición Bio-Pacífico & Andes',
    tagline: '12 días de inmersión en reservas biológicas de clase mundial: Isla Coiba, Volcán Barú, Eje Cafetero y Medellín.',
    totalDays: 12,
    nightsPanama: 6,
    nightsColombia: 6,
    basePriceUsd: 2450,
    rating: 4.95,
    reviewsCount: 76,
    imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
    badge: 'Eco & Aventura Premium',
    targetAudience: 'Viajeros apasionados por la ornitología, el buceo, el senderismo de montaña y el café de especialidad.',
    description: 'El circuito definitivo de naturaleza tropical que abarca el Parque Nacional Coiba (el Galápagos del Pacífico de Centroamérica), las tierras altas chiricanas de Boquete, el Paisaje Cultural Cafetero de Colombia y los valles antioqueños.',
    highlights: [
      'Buceo o snorkel de superficie con tiburones punta blanca y tortugas en Coiba',
      'Cata de cosechas micro-lote de Café Geisha en Boquete',
      'Trekking entre Palmas de Cera gigantes en el Valle del Cocora',
      'Piedra del Peñol y embalse de Guatapé en Antioquia'
    ],
    itinerary: [
      {
        dayNumber: 1,
        title: 'Llegada a Panamá y traslado a Tierras Altas',
        country: 'panama',
        destination: 'Boquete (Chiriquí)',
        summary: 'Recepción en PTY, vuelo doméstico a David y traslado a los valles montañosos de Boquete.',
        activities: ['Vuelo PTY - DAV', 'Check-in en lodge de montaña con chimenea'],
        hotelSuggestion: 'The Haven Boquete o Finca Lérida Hotel Ecológico',
        mealsIncluded: 'Cena campestre de montaña',
        transferType: 'Vuelo doméstico + 4x4'
      },
      {
        dayNumber: 2,
        title: 'Puentes Colgantes & Bosque Nuboso del Volcán Barú',
        country: 'panama',
        destination: 'Boquete',
        summary: 'Circuito de canopy y observación del Quetzal resplandeciente.',
        activities: ['Caminata por el dosel del bosque nuboso', 'Cata sensorial de café Geisha'],
        hotelSuggestion: 'Finca Lérida Hotel Ecológico',
        mealsIncluded: 'Desayuno buffet y almuerzo gourmet',
        transferType: 'Vehículo 4x4'
      },
      {
        dayNumber: 3,
        title: 'Costa del Pacífico: Santa Catalina & Parque Nacional Coiba',
        country: 'panama',
        destination: 'Parque Nacional Isla Coiba',
        summary: 'Traslado a la costa sur de Veraguas y navegación a la joya marina de la UNESCO.',
        activities: ['Embarcación marina a Isla Granito de Oro', 'Snorkel con vida marina pelágica'],
        hotelSuggestion: 'Hotel Santa Catalina Panamá',
        mealsIncluded: 'Desayuno y almuerzo en isla virgen',
        transferType: 'Transporte terrestre + Embarcación marina'
      },
      {
        dayNumber: 4,
        title: 'Segunda jornada en Coiba y retorno a Ciudad de Panamá',
        country: 'panama',
        destination: 'Ciudad de Panamá',
        summary: 'Buceo matutino o avistamiento de cetáceos y vuelo de retorno a la capital.',
        activities: ['Bahía Damas', 'Vuelo a Ciudad de Panamá', 'Noche en Casco Antiguo'],
        hotelSuggestion: 'Hotel La Compañía Hyatt Unbound',
        mealsIncluded: 'Desayuno y almuerzo ligero',
        transferType: 'Lancha + Vuelo doméstico'
      },
      {
        dayNumber: 5,
        title: 'Canal de Panamá & Vuelo Internacional a Colombia',
        country: 'colombia',
        destination: 'Bogotá / Eje Cafetero',
        summary: 'Esclusas de Miraflores por la mañana y vuelo hacia el corazón andino de Colombia.',
        activities: ['Centro de visitantes Miraflores', 'Vuelo PTY - Pereira (PEI) vía BOG'],
        hotelSuggestion: 'Hacienda San José o Hotel Boutique Sazagua',
        mealsIncluded: 'Desayuno buffet',
        transferType: 'Vuelo internacional + Transfer privado'
      },
      {
        dayNumber: 6,
        title: 'Valle del Cocora: Palmas de Cera Centenarias',
        country: 'colombia',
        destination: 'Quindío / Salento',
        summary: 'El paisaje más icónico de Colombia a bordo de un jeep Willys tradicional.',
        activities: ['Jeep Willys por la cordillera', 'Trekking suave en el Valle del Cocora', 'Pueblo artesanal de Salento'],
        hotelSuggestion: 'Hacienda San José / Sazagua',
        mealsIncluded: 'Desayuno buffet y almuerzo tradicional paisa',
        transferType: 'Jeep Willys privado'
      },
      {
        dayNumber: 7,
        title: 'Cultura Cafetera Viva: Finca Tradicional & Barismo',
        country: 'colombia',
        destination: 'Eje Cafetero',
        summary: 'Aprende a catar café de origen con los campesinos recolectores del Paisaje Cultural Cafetero.',
        activities: ['Taller del grano a la taza', 'Paseo en Filandia con mirador colina iluminada'],
        hotelSuggestion: 'Hacienda San José',
        mealsIncluded: 'Desayuno y almuerzo campesino',
        transferType: 'Van ejecutiva'
      },
      {
        dayNumber: 8,
        title: 'Ruta hacia Medellín a través de la Cordillera Central',
        country: 'colombia',
        destination: 'Medellín',
        summary: 'Viaje panorámico atravesando cañones fluviales y llegada a la capital de la innovación.',
        activities: ['Ruta escénica cordillerana', 'Llegada a El Poblado y cena en Provenza'],
        hotelSuggestion: 'Marriott Medellín El Poblado',
        mealsIncluded: 'Desayuno y cena de bienvenida en Medellín',
        transferType: 'Vehículo privado de lujo'
      },
      {
        dayNumber: 9,
        title: 'Comuna 13 & Parque Arví en Teleférico',
        country: 'colombia',
        destination: 'Medellín',
        summary: 'De la transformación urbana con arte callejero a los bosques de niebla de Santa Elena.',
        activities: ['Comuna 13 con raperos locales', 'Metrocable al Parque Arví', 'Cultura silletera tradicional'],
        hotelSuggestion: 'Marriott Medellín',
        mealsIncluded: 'Desayuno buffet y refrigerio típico',
        transferType: 'Van privada + Sistema Metro'
      },
      {
        dayNumber: 10,
        title: 'Piedra del Peñol & Embalse de Guatapé',
        country: 'colombia',
        destination: 'Guatapé',
        summary: 'Excursión de día completo al embalse, escalada de la roca y paseo en barco.',
        activities: ['Cima de la Piedra del Peñol', 'Paseo en lancha privada', 'Calles de zócalos de colores'],
        hotelSuggestion: 'Marriott Medellín',
        mealsIncluded: 'Desayuno buffet y almuerzo paisa',
        transferType: 'Van privada + Embarcación'
      },
      {
        dayNumber: 11,
        title: 'Gastronomía de Vanguardia & Compras de Diseño',
        country: 'colombia',
        destination: 'Medellín',
        summary: 'Día para descubrir el epicentro gastronómico y de moda de Colombia.',
        activities: ['Visita a talleres de cuero y café', 'Cena de clausura en restaurante de estrella Michelin/50 Best'],
        hotelSuggestion: 'Marriott Medellín',
        mealsIncluded: 'Desayuno buffet y cena de gala',
        transferType: 'Van con chofer a disposición'
      },
      {
        dayNumber: 12,
        title: 'Despedida y Vuelo Internacional',
        country: 'colombia',
        destination: 'Medellín (MDE) / Retorno',
        summary: 'Traslado privado al Aeropuerto Internacional José María Córdova para conexión de regreso a casa.',
        activities: ['Check-out y transfer VIP'],
        hotelSuggestion: 'Fin del itinerario TerraIstmo DMC',
        mealsIncluded: 'Desayuno buffet',
        transferType: 'Van ejecutiva al aeropuerto'
      }
    ]
  }
];

export const INITIAL_OPERATIONS_BOOKINGS: BookingLead[] = [
  {
    id: 'BK-8901',
    voucherCode: 'TERRA-2026-PTYCTG-8901',
    clientName: 'Alexander & Claire Dupont',
    agencyName: 'Voyages Lumière (París, Francia)',
    email: 'c.dupont@voyageslumiere.fr',
    phone: '+33 6 12 34 56 78',
    countryRoute: 'Panamá + Colombia',
    travelDates: '12 Nov 2026 – 20 Nov 2026',
    paxAdults: 2,
    paxChildren: 0,
    hotelTier: 'luxury',
    totalUsd: 4890,
    currency: 'USD',
    status: 'En operación',
    assignedGuide: 'Carlos Mendizábal (PTY) / Sofía Herrera (CTG)',
    notes: 'Habitaciones con cama king, no mariscos para la Sra. Dupont. Vuelo de llegada AF474 Tocumen.'
  },
  {
    id: 'BK-8902',
    voucherCode: 'TERRA-2026-B2B-8902',
    clientName: 'Familia Ramírez Gómez (5 pax)',
    agencyName: 'Andina Travel Experts (Madrid, España)',
    email: 'reservas@andinatravel.es',
    phone: '+34 91 555 0192',
    countryRoute: 'Panamá + Colombia',
    travelDates: '02 Dic 2026 – 10 Dic 2026',
    paxAdults: 4,
    paxChildren: 1,
    hotelTier: 'superior',
    totalUsd: 7920,
    currency: 'USD',
    status: 'Confirmada',
    assignedGuide: 'Mateo Osorio (MDE) / Roberto Díaz (Guna Yala)',
    notes: 'Excursión a San Blas confirmada en lancha techada. Solicitan cuna de bebé en Medellín.'
  },
  {
    id: 'BK-8903',
    voucherCode: 'TERRA-2026-PTY-8903',
    clientName: 'Dr. William Chen & Sra.',
    agencyName: 'Directo / Web B2C',
    email: 'william.chen.med@gmail.com',
    phone: '+1 415 889 0021',
    countryRoute: 'Panamá Exclusivo',
    travelDates: '22 Oct 2026 – 27 Oct 2026',
    paxAdults: 2,
    paxChildren: 0,
    hotelTier: 'standard',
    totalUsd: 2150,
    currency: 'USD',
    status: 'Nueva cotización',
    assignedGuide: 'Por asignar (Turno Centro Histórico)',
    notes: 'Interesados en cata de café Geisha y tránsito completo del Canal.'
  },
  {
    id: 'BK-8904',
    voucherCode: 'TERRA-2026-COL-8904',
    clientName: 'Incentivo Corporativo TechNova (8 pax)',
    agencyName: 'Nexus MICE Solutions (Miami, USA)',
    email: 'events@nexusmice.com',
    phone: '+1 305 444 7812',
    countryRoute: 'Colombia Exclusivo',
    travelDates: '15 Ene 2027 – 21 Ene 2027',
    paxAdults: 8,
    paxChildren: 0,
    hotelTier: 'luxury',
    totalUsd: 14200,
    currency: 'USD',
    status: 'Completada',
    assignedGuide: 'Valentina Restrepo & Equipo Náutico VIP',
    notes: 'Alquiler de 2 yates en Islas del Rosario y reserva en restaurante Carmen Medellín.'
  }
];

export const SUPPLIERS_DATABASE: SupplierPartner[] = [
  {
    id: 'sup-01',
    name: 'TransCanal Luxury Vans PTY',
    country: 'panama',
    category: 'Transporte Terrestre',
    contactPerson: 'Eric Santamaría',
    phone: '+507 6234-9988',
    rating: 4.9,
    status: 'Activo / Certificado',
    licensedNumber: 'ATP-TRANS-2024-88'
  },
  {
    id: 'sup-02',
    name: 'Guna Yala Catamaran Fleet & 4x4 Co.',
    country: 'panama',
    category: 'Náutico / Lanchas',
    contactPerson: 'Ologwagdi Morris (Comarca Guna)',
    phone: '+507 6890-1122',
    rating: 4.95,
    status: 'Activo / Certificado',
    licensedNumber: 'CONGRESO-GUNA-PERMIT-402'
  },
  {
    id: 'sup-03',
    name: 'Cartagena Yachting & Sea Charters',
    country: 'colombia',
    category: 'Náutico / Lanchas',
    contactPerson: 'Capitán Hernán Berrio',
    phone: '+57 312 876 5432',
    rating: 4.98,
    status: 'Activo / Certificado',
    licensedNumber: 'DIMAR-NAUT-9901-CTG'
  },
  {
    id: 'sup-04',
    name: 'Asociación de Guías Oficiales de Turismo Antioquia (AGOTA)',
    country: 'colombia',
    category: 'Guías Oficiales',
    contactPerson: 'Marcela Londoño',
    phone: '+57 301 234 5678',
    rating: 4.92,
    status: 'Activo / Certificado',
    licensedNumber: 'RNT-COLOMBIA-38291'
  },
  {
    id: 'sup-05',
    name: 'Colección de Hoteles Boutique del Istmo & Andes',
    country: 'panama',
    category: 'Hotelería Boutique',
    contactPerson: 'Mariana Valenzuela',
    phone: '+507 205-8000',
    rating: 5.0,
    status: 'Activo / Certificado',
    licensedNumber: 'HOTEL-ALLIANCE-DMC-01'
  }
];

export const FAQ_CHATBOT_KNOWLEDGE = [
  {
    triggers: ['vacuna', 'fiebre amarilla', 'sanidad', 'salud', 'requisitos médicos'],
    response: '¡Hola! Para viajar a Panamá y Colombia, los requisitos sanitarios son sencillos: la vacuna contra la Fiebre Amarilla es altamente recomendada (y exigida si procedes o visitas zonas selváticas como el Darién en Panamá o el Parque Nacional Tayrona / Amazonía en Colombia). Debe aplicarse al menos 10 días antes del viaje. Para ciudades principales (Ciudad de Panamá, Cartagena, Medellín, Bogotá) no hay exigencia sanitaria obligatoria. ¿Deseas que coordinemos asistencia médica internacional incluida en tu cotización?'
  },
  {
    triggers: ['vuelo', 'conexion', 'conectar', 'pty', 'ctg', 'mde', 'copa', 'distancia', 'avion'],
    response: 'La conexión aérea entre Panamá y Colombia es de las más directas del continente gracias al "Hub de las Américas" de Copa Airlines en Tocumen (PTY). Un vuelo directo PTY a Cartagena (CTG) dura apenas 1 hora y 10 minutos; y a Medellín (MDE) solo 1 hora y 15 minutos. En TerraIstmo DMC nos encargamos de emitir los pasajes aéreos inter-países o sincronizarnos exactamente con tus vuelos internacionales con asistencia VIP de equipaje en ambos lados.'
  },
  {
    triggers: ['moneda', 'dolar', 'peso', 'cop', 'usd', 'cambio', 'tarjeta', 'efectivo', 'divisa'],
    response: 'En Panamá la moneda de curso legal es el Dólar Estadounidense (USD) (junto al Balboa, con paridad 1:1, solo en monedas fraccionarias). En Colombia se utiliza el Peso Colombiano (COP), cuya tasa ronda actualmente los 4.100 a 4.200 COP por 1 USD. En nuestra plataforma puedes ver y cotizar en tiempo real en ambas monedas. En ambos países las tarjetas Visa y Mastercard son ampliamente aceptadas, aunque para San Blas y mercados de artesanías recomendamos llevar dólares en billetes de baja denominación ($1, $5, $20).'
  },
  {
    triggers: ['mejor epoca', 'clima', 'temporada', 'lluvia', 'verano', 'cuando viajar'],
    response: 'La temporada seca ("verano") en el Caribe y Panamá va de mediados de diciembre a finales de abril, con cielos despejados, brisa alisios y mar calmo (ideal para San Blas y Bocas del Toro). Sin embargo, Colombia es un país de microclimas: Medellín es la "ciudad de la eterna primavera" con 24°C todo el año, y el Eje Cafetero goza de clima templado continuo. ¡Podemos diseñar tu ruta evitando temporadas de precipitaciones intensas!'
  },
  {
    triggers: ['agencia', 'b2b', 'comision', 'margen', 'operador', 'mayorista', 'dmc'],
    response: '¡Excelente! Somos DMC receptivo oficial con tarifas netas confidenciales para agencias de viajes minoristas y mayoristas de Europa, Norteamérica y Latinoamérica. En nuestro cotizador puedes activar el modo B2B y definir el margen de comisión de tu agencia (10%, 15% o 20%). Generamos vauchers y propuestas con marca blanca o co-brandeados listos para que los envíes directamente a tu cliente final.'
  },
  {
    triggers: ['visa', 'pasaporte', 'migracion', 'aduanas', 'requisitos de entrada'],
    response: 'Los ciudadanos de la Unión Europea, Estados Unidos, Canadá y la mayoría de países de América Latina NO requieren visa previa para estancias turísticas de hasta 90 días ni en Panamá ni en Colombia. Solo se necesita pasaporte con vigencia mínima de 6 meses y billete de salida. Al entrar a Colombia como turista extranjero extranjero, estás 100% EXENTO del IVA (19%) en servicios hoteleros y turísticos según el Decreto 297 de 2016, lo cual ya calculamos a tu favor en nuestro cotizador.'
  }
];
