// Tour catalogue for EurAsia Rwanda.
// Elevation is in metres and is used to derive the "altitude band" shown on every
// card — in Rwanda altitude is the honest predictor of how hard a day will be.
// Prices are USD per person, land-only (permits are added separately at booking).

export const TOUR_CATEGORIES = [
  { id: 'all', label: 'All experiences' },
  { id: 'wildlife', label: 'Wildlife' },
  { id: 'trekking', label: 'Trekking' },
  { id: 'culture', label: 'Culture & history' },
  { id: 'lake', label: 'Lake & leisure' },
  { id: 'food', label: 'Coffee & tea' },
];

export const DIFFICULTIES = ['Easy', 'Moderate', 'Challenging'];

export const tours = [
  {
    id: 'gorilla-volcanoes',
    name: 'Mountain Gorilla Trek',
    region: 'Volcanoes National Park, Musanze',
    category: 'wildlife',
    icon: 'mountain',
    days: 2,
    nights: 1,
    groupMin: 1,
    groupMax: 8,
    difficulty: 'Challenging',
    price: 690,
    rating: 5.0,
    reviews: 214,
    minAltitude: 2400,
    maxAltitude: 3200,
    driveHours: 2.5,
    bestMonths: 'Jun–Sep and Dec–Feb (drier trails)',
    permit: {
      required: true,
      name: 'RDB gorilla permit',
      tiers: { foreign: 1500, resident: 500, citizen: 30000 / 1450 },
      note: 'Permits are issued by the Rwanda Development Board and sell out months ahead. We hold your date the moment your deposit clears.',
    },
    summary:
      'One hour, face to face with a habituated gorilla family on the Virunga slopes. The trek to reach them is the real work — bamboo, nettles and thin air.',
    highlights: [
      'Sunrise briefing and Intore dancers at Kinigi park headquarters',
      'One full hour with a habituated family — Susa, Amahoro or Agashya',
      'Overnight in Musanze with the Virunga chain on the skyline',
      'Porter hired from the local co-operative carries your pack',
    ],
    includes: [
      '4x4 with driver-guide from Kigali and back',
      'One night accommodation in Musanze',
      'Park ranger, tracker team and briefing',
      'Bottled water, packed lunch on trek day',
    ],
    excludes: ['Gorilla permit', 'Porter tip', 'Travel insurance', 'Personal gear'],
    knowBefore: [
      'You must be 15 or older to trek — this is set by the park, not by us.',
      'Trekking time ranges from 40 minutes to 6 hours depending on where the family moved overnight.',
      'Gaiters, waterproofs and gloves matter more than boots. We lend gaiters free.',
      'Anyone with flu or a cold is turned back at the briefing to protect the gorillas.',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Kigali to Musanze',
        altitude: 1850,
        description:
          'Leave Kigali mid-morning on the Northern Corridor, stopping at the Ruhengeri viewpoint where five volcanoes line up at once. Afternoon at the Gorilla Guardians village, then an early dinner and kit check with your guide.',
        stops: ['Kigali', 'Ruhengeri viewpoint', 'Gorilla Guardians village', 'Musanze'],
      },
      {
        day: 2,
        title: 'Trek day and return',
        altitude: 3200,
        description:
          'At the park gate by 07:00 for group allocation. Trek in, one hour with the family, then back down and the drive to Kigali, arriving early evening.',
        stops: ['Kinigi HQ', 'Virunga slopes', 'Kigali'],
      },
    ],
  },
  {
    id: 'akagera-bigfive',
    name: 'Akagera Big Five Safari',
    region: 'Akagera National Park, Eastern Province',
    category: 'wildlife',
    icon: 'sun',
    days: 2,
    nights: 1,
    groupMin: 2,
    groupMax: 6,
    difficulty: 'Easy',
    price: 540,
    rating: 4.9,
    reviews: 176,
    minAltitude: 1250,
    maxAltitude: 1825,
    driveHours: 2.5,
    bestMonths: 'Jun–Sep — game concentrates around the lakes',
    permit: {
      required: true,
      name: 'Akagera park entry',
      tiers: { foreign: 100, resident: 50, citizen: 8000 / 1450 },
      note: 'Entry covers two days in the park and includes the boat safari fee.',
    },
    summary:
      'Rwanda\u2019s only savannah park, and the only place in the country with all of the Big Five. Lions came back in 2015, rhinos in 2017.',
    highlights: [
      'Dawn game drive through the northern plains for lion and rhino',
      'Boat safari on Lake Ihema — hippo, crocodile and shoebill country',
      'Roan antelope and eland on the Kilala plain',
      'Roof-hatch 4x4 so everyone gets a clear line of sight',
    ],
    includes: [
      '4x4 with roof hatch and driver-guide',
      'One night in a lodge or tented camp inside the park',
      'Boat safari on Lake Ihema',
      'All meals from lunch day one to lunch day two',
    ],
    excludes: ['Park entry fees', 'Drinks at the lodge', 'Night drive supplement'],
    knowBefore: [
      'The northern gate is a rough two and a half hours from Kigali — leave by 06:00 for the best light.',
      'Shoebill sightings are seasonal and never guaranteed. Your guide will tell you honestly what the week has looked like.',
      'Bring a long lens. Distances here are savannah distances.',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Kigali to Akagera, afternoon drive',
        altitude: 1400,
        description:
          'Early departure east through Rwamagana. Enter at the southern gate, game drive up through the Kilala plain to camp, arriving in time for sundowners over the lakes.',
        stops: ['Kigali', 'Rwamagana', 'Southern gate', 'Kilala plain'],
      },
      {
        day: 2,
        title: 'Dawn drive, boat safari, return',
        altitude: 1300,
        description:
          'Out at first light for the northern plains where the lions and the rhino range. Late morning boat safari on Lake Ihema, lunch, then the road back to Kigali.',
        stops: ['Northern plains', 'Lake Ihema', 'Kigali'],
      },
    ],
  },
  {
    id: 'nyungwe-canopy',
    name: 'Nyungwe Chimps & Canopy Walk',
    region: 'Nyungwe National Park, Southern Province',
    category: 'trekking',
    icon: 'tree',
    days: 3,
    nights: 2,
    groupMin: 2,
    groupMax: 8,
    difficulty: 'Moderate',
    price: 830,
    rating: 4.8,
    reviews: 91,
    minAltitude: 1600,
    maxAltitude: 2950,
    driveHours: 5,
    bestMonths: 'Jun–Sep; chimps are easiest to find Aug–Nov',
    permit: {
      required: true,
      name: 'Chimpanzee tracking permit',
      tiers: { foreign: 250, resident: 150, citizen: 25000 / 1450 },
      note: 'Includes park entry and the canopy walkway fee for the duration of your stay.',
    },
    summary:
      'One of the oldest montane rainforests in Africa. Thirteen primate species, a suspension bridge strung across a ravine, and tea fields running right up to the treeline.',
    highlights: [
      'Pre-dawn chimpanzee tracking from Uwinka or Cyamudongo',
      'The canopy walkway — 160 metres of steel high over the forest floor',
      'Colobus troops that move a hundred strong',
      'Gisakura tea estate on the western edge',
    ],
    includes: [
      '4x4 and driver-guide for three days',
      'Two nights lodging on the forest edge',
      'Park ranger for every guided walk',
      'All breakfasts and packed lunches',
    ],
    excludes: ['Tracking permit and park entry', 'Dinners', 'Canopy walkway tips'],
    knowBefore: [
      'Chimp tracking starts at 04:30. That is not a typo — the troop is located before it disperses.',
      'The forest gets over 2,000 mm of rain a year. Assume you will be rained on and pack accordingly.',
      'The canopy walkway is fine for most people but it does move. Skip it if heights are a problem.',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Kigali to Nyungwe via Nyanza',
        altitude: 1700,
        description:
          'South through Nyanza with a stop at the King\u2019s Palace, then Huye for lunch before the last climb into the forest. Arrive at the lodge by late afternoon.',
        stops: ['Kigali', 'Nyanza', 'Huye', 'Gisakura'],
      },
      {
        day: 2,
        title: 'Chimpanzee tracking and the canopy',
        altitude: 2500,
        description:
          'Out at 04:30 to meet the trackers. After the chimps, back for a late breakfast, then the Igishigishigi trail and the canopy walkway in the afternoon light.',
        stops: ['Cyamudongo', 'Uwinka', 'Canopy walkway'],
      },
      {
        day: 3,
        title: 'Tea estate and return',
        altitude: 1900,
        description:
          'Morning walk through the Gisakura tea estate with a colobus troop nearly always in the buffer zone, then the long drive back to Kigali.',
        stops: ['Gisakura estate', 'Huye', 'Kigali'],
      },
    ],
  },
  {
    id: 'kivu-congo-nile',
    name: 'Lake Kivu & the Congo Nile Trail',
    region: 'Rubavu to Karongi, Western Province',
    category: 'lake',
    icon: 'waves',
    days: 2,
    nights: 1,
    groupMin: 2,
    groupMax: 8,
    difficulty: 'Easy',
    price: 380,
    rating: 4.7,
    reviews: 133,
    minAltitude: 1460,
    maxAltitude: 2100,
    driveHours: 3,
    bestMonths: 'Year round — the lake is warm and bilharzia-free',
    permit: { required: false },
    summary:
      'A freshwater inland sea with no crocodiles and no hippos, ringed by coffee terraces. The trail along its shoulder is one of the best drives in East Africa.',
    highlights: [
      'Boat out to Napoleon Island and its fruit bat colony',
      'Sections of the Congo Nile Trail with the lake below you the whole way',
      'Sunset from the Rubavu shore with the Nyiragongo glow to the north',
      'Fishermen\u2019s dawn chorus on the water',
    ],
    includes: [
      'Vehicle and driver-guide',
      'One night on the lakeshore',
      'Boat trip with skipper',
      'Breakfast and one dinner',
    ],
    excludes: ['Lunches', 'Kayak or bike hire', 'Drinks'],
    knowBefore: [
      'The lake is safe to swim in and locals do it daily.',
      'Bike hire on the trail can be arranged with a day\u2019s notice — tell us at booking.',
      'The Rubavu to Karongi road is tarmac but slow and beautiful. Do not rush it.',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Kigali to Rubavu',
        altitude: 1460,
        description:
          'West through Muhanga and the Kivu Belt road. Afternoon on the water — Napoleon Island, hot springs and a swim — then dinner on the shore.',
        stops: ['Kigali', 'Muhanga', 'Rubavu', 'Napoleon Island'],
      },
      {
        day: 2,
        title: 'The trail south to Karongi',
        altitude: 2100,
        description:
          'Follow the Congo Nile Trail south through coffee-washing stations and terraced hills, with the lake in and out of view. Lunch in Karongi, then back to Kigali.',
        stops: ['Kinunu', 'Karongi', 'Kigali'],
      },
    ],
  },
  {
    id: 'kigali-heritage',
    name: 'Kigali Heritage Day',
    region: 'Kigali City',
    category: 'culture',
    icon: 'city',
    days: 1,
    nights: 0,
    groupMin: 1,
    groupMax: 10,
    difficulty: 'Easy',
    price: 120,
    rating: 4.9,
    reviews: 302,
    minAltitude: 1450,
    maxAltitude: 1650,
    driveHours: 0,
    bestMonths: 'Year round',
    permit: { required: false },
    summary:
      'The city on its own terms — memorial, market, art and the neighbourhood streets, walked at a pace that leaves room to sit with what you see.',
    highlights: [
      'Kigali Genocide Memorial at Gisozi, unhurried and with a guide who will answer anything',
      'Nyamirambo walking tour led by the women\u2019s centre',
      'Kimironko market with someone who knows the stallholders',
      'Inema Arts Centre and a coffee at the end',
    ],
    includes: ['Vehicle and driver-guide for the day', 'All entry fees', 'Lunch in Nyamirambo', 'Bottled water'],
    excludes: ['Purchases at the market', 'Tips'],
    knowBefore: [
      'The memorial is a burial site for more than 250,000 people. Dress modestly and photography is not permitted inside.',
      'We schedule the memorial first and keep the afternoon light. Most people want space afterwards.',
      'Say the word and we will slow the whole day down. There is no schedule worth rushing this one for.',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Memorial, market, neighbourhood, art',
        altitude: 1567,
        description:
          'Gisozi in the morning, then Kimironko market, lunch and a walking tour in Nyamirambo, finishing at Inema Arts Centre before sunset from the Kigali Heights side of town.',
        stops: ['Gisozi', 'Kimironko', 'Nyamirambo', 'Inema Arts Centre'],
      },
    ],
  },
  {
    id: 'golden-monkeys-twin-lakes',
    name: 'Golden Monkeys & the Twin Lakes',
    region: 'Musanze and Burera',
    category: 'wildlife',
    icon: 'footprints',
    days: 1,
    nights: 0,
    groupMin: 2,
    groupMax: 8,
    difficulty: 'Moderate',
    price: 260,
    rating: 4.8,
    reviews: 68,
    minAltitude: 1860,
    maxAltitude: 2600,
    driveHours: 2.5,
    bestMonths: 'Jun–Sep and Dec–Feb',
    permit: {
      required: true,
      name: 'Golden monkey permit',
      tiers: { foreign: 100, resident: 65, citizen: 12000 / 1450 },
      note: 'Booked with the same park office as the gorilla permits, usually available at shorter notice.',
    },
    summary:
      'An endangered monkey found only in the Virungas, an easier trek than the gorillas, and two crater lakes below the volcanoes to finish the day.',
    highlights: [
      'A troop that can run to eighty animals moving through bamboo',
      'A shorter, gentler trek than the gorilla route',
      'Burera and Ruhondo, the twin lakes, with Muhabura behind them',
      'Musanze caves on the way back if there is time',
    ],
    includes: ['4x4 and driver-guide', 'Park ranger', 'Packed lunch', 'Water'],
    excludes: ['Golden monkey permit', 'Musanze caves entry', 'Tips'],
    knowBefore: [
      'The bamboo zone is muddy in every season. Gaiters help.',
      'This is a long day trip from Kigali — 05:30 departure. Staying over in Musanze makes it much more pleasant.',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Trek and lakes',
        altitude: 2600,
        description:
          'Early drive to Kinigi, briefing at 07:00 and into the bamboo. Back down by midday, lunch overlooking the twin lakes, then Kigali by evening.',
        stops: ['Kinigi', 'Bamboo zone', 'Lake Burera', 'Kigali'],
      },
    ],
  },
  {
    id: 'kivu-coffee-trail',
    name: 'Kivu Coffee & Tea Trail',
    region: 'Rubavu and Nyabihu',
    category: 'food',
    icon: 'coffee',
    days: 1,
    nights: 0,
    groupMin: 2,
    groupMax: 10,
    difficulty: 'Easy',
    price: 165,
    rating: 4.7,
    reviews: 54,
    minAltitude: 1460,
    maxAltitude: 2300,
    driveHours: 3,
    bestMonths: 'Mar–Jun is harvest and the washing stations are at full tilt',
    permit: { required: false },
    summary:
      'Cherry to cup in a single day. A washing station on the lake, a tea estate on the volcanic slopes, and a cupping table at the end of it.',
    highlights: [
      'Pick and pulp cherry alongside a co-operative on the Kivu shore',
      'Cupping session with a Q-grader',
      'Tea plucking on the Nyabihu slopes at 2,300 metres',
      'Take home a kilo of what you cupped',
    ],
    includes: ['Vehicle and driver-guide', 'Co-operative fees', 'Cupping session', 'Lunch', '1 kg roasted coffee'],
    excludes: ['Additional coffee purchases', 'Tips'],
    knowBefore: [
      'Outside harvest season the washing station demo runs on stored cherry — still worth it, but ask us if timing matters to you.',
      'Wear closed shoes for the estate walk.',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Washing station, estate, cupping table',
        altitude: 2300,
        description:
          'Drive west to the lake, morning at the washing station, then up to the Nyabihu tea slopes for the afternoon and a cupping before the road home.',
        stops: ['Rubavu', 'Kinunu washing station', 'Nyabihu estate', 'Kigali'],
      },
    ],
  },
  {
    id: 'nyanza-huye-route',
    name: 'Nyanza & Huye Cultural Route',
    region: 'Southern Province',
    category: 'culture',
    icon: 'city',
    days: 1,
    nights: 0,
    groupMin: 2,
    groupMax: 10,
    difficulty: 'Easy',
    price: 145,
    rating: 4.6,
    reviews: 47,
    minAltitude: 1600,
    maxAltitude: 1900,
    driveHours: 2,
    bestMonths: 'Year round',
    permit: { required: false },
    summary:
      'The royal seat at Nyanza and the ethnographic collection at Huye — the clearest single day anyone can spend on Rwandan history before 1900.',
    highlights: [
      'King\u2019s Palace Museum and the long-horned Inyambo cattle',
      'Intore dancers and the royal drums',
      'Ethnographic Museum at Huye, the best collection in the country',
      'Lunch on the Huye campus strip',
    ],
    includes: ['Vehicle and driver-guide', 'All museum entries', 'Lunch', 'Water'],
    excludes: ['Tips', 'Craft purchases'],
    knowBefore: [
      'The Inyambo cattle keepers perform the praise songs on request — tell your guide in the morning.',
      'Both museums close at 18:00. We leave Kigali by 07:30 to fit them properly.',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Royal Nyanza and the Huye collection',
        altitude: 1750,
        description:
          'South on the Huye road, the King\u2019s Palace and Inyambo herd mid-morning, lunch in Huye, then the Ethnographic Museum before returning to Kigali.',
        stops: ['Kigali', 'Nyanza', 'Huye', 'Kigali'],
      },
    ],
  },
];

// Add-ons priced per the unit shown. Used by the tour booking flow.
export const TOUR_EXTRAS = [
  { id: 'porter', label: 'Trek porter', note: 'Hired from the park co-operative. Carries your pack, steadies you on the steep sections.', price: 25, unit: 'per person per trek day' },
  { id: 'photographer', label: 'Photographer', note: 'Travels with you and hands over edited files within a week.', price: 180, unit: 'per day' },
  { id: 'culturalVillage', label: 'Gorilla Guardians village', note: 'Former poachers turned conservation guides. Half a day.', price: 30, unit: 'per person' },
  { id: 'airportPickup', label: 'Airport pickup', note: 'Kigali International, any hour, with a name board.', price: 35, unit: 'one off' },
  { id: 'simCard', label: 'Local SIM with data', note: '20 GB on MTN or Airtel, registered and activated before you land.', price: 15, unit: 'per person' },
];

export const ACCOMMODATION_TIERS = [
  { id: 'standard', label: 'Standard', note: 'Clean, well-run guesthouses. Hot water, solid breakfast.', perNight: 0 },
  { id: 'comfort', label: 'Comfort', note: 'Mid-range lodges with a view worth waking up for.', perNight: 120 },
  { id: 'luxury', label: 'Luxury', note: 'The lodges people plan a whole trip around.', perNight: 350 },
];

export const RESIDENCY = [
  { id: 'foreign', label: 'Foreign visitor' },
  { id: 'resident', label: 'Rwanda / EAC resident' },
  { id: 'citizen', label: 'Rwandan citizen' },
];
