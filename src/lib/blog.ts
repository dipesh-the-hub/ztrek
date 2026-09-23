export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] };

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  keywords: string[];
  content: ContentBlock[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "everest-base-camp-trek-cost-guide",
    title: "Everest Base Camp Trek Cost: A Complete Budget Breakdown",
    excerpt:
      "How much does the Everest Base Camp Trek really cost in 2026? We break down permits, flights, guides, gear and everything else you'll pay for.",
    coverImage: "/images/treks/everest-base-camp.jpg",
    category: "Trip Planning",
    author: "TrekVibe Nepal Team",
    date: "2026-01-14",
    readTime: "7 min read",
    keywords: ["Everest Base Camp Trek cost", "EBC trek budget", "how much does EBC trek cost"],
    content: [
      { type: "paragraph", text: "One of the first questions every trekker asks is simple: how much does the Everest Base Camp Trek actually cost? The honest answer is that it depends heavily on how you organize the trip — but this guide breaks down every major cost so you can budget accurately before you book." },
      { type: "heading", text: "The main cost categories" },
      { type: "paragraph", text: "A fully guided Everest Base Camp Trek from a Kathmandu-based agency typically starts around USD 1,200–1,500 per person for a standard group departure, and can run higher for private departures, luxury lodges, or add-on helicopter return flights. Here is what makes up that price." },
      { type: "list", items: [
        "Kathmandu–Lukla–Kathmandu flights: roughly USD 340–400 round trip, usually the single largest line item after the overall package fee.",
        "Permits: the Sagarmatha National Park entry permit and the Khumbu Pasang Lhamu Rural Municipality entry permit together cost around USD 50–60.",
        "Guide and porter wages: a licensed English-speaking guide and a porter (carrying up to 20–25 kg) for 12–14 days.",
        "Teahouse accommodation and meals on the trail: budgeted daily, rising in price the higher you climb due to portering costs.",
        "Travel insurance with high-altitude and helicopter evacuation cover — non-negotiable, and not included in most packages.",
      ] },
      { type: "heading", text: "What is usually not included" },
      { type: "paragraph", text: "Most reputable agencies, including TrekVibe Nepal, exclude your Nepal entry visa fee, meals in Kathmandu, personal trekking gear, tips for your guide and porter, and any emergency evacuation costs beyond what insurance covers. Budget roughly USD 200–300 for these extras on top of your package price." },
      { type: "heading", text: "Ways to control the cost without cutting corners on safety" },
      { type: "list", items: [
        "Travel in a small group rather than a fully private trip — shared guide and transport costs bring the per-person price down significantly.",
        "Trek in the shoulder season (late March or late November) when teahouse rates are slightly lower and flights are easier to book.",
        "Avoid the temptation to skip acclimatization days to save a night's lodging — the medical risk and potential evacuation cost far outweighs the saving.",
      ] },
      { type: "paragraph", text: "If you want an exact, itemized quote for your dates and group size, our team can put together a written cost breakdown within 24 hours — just reach out through our trip planner form." },
    ],
  },
  {
    slug: "best-time-to-trek-in-nepal",
    title: "Best Time to Trek in Nepal: A Season-by-Season Guide",
    excerpt:
      "From spring rhododendrons to the monsoon-friendly deserts of Mustang and Dolpo, here's when to trek each region of Nepal for the best conditions.",
    coverImage: "/images/treks/langtang.jpg",
    category: "Trip Planning",
    author: "TrekVibe Nepal Team",
    date: "2026-01-08",
    readTime: "6 min read",
    keywords: ["best time to trek in Nepal", "Nepal trekking seasons", "when to trek Everest Annapurna"],
    content: [
      { type: "paragraph", text: "Nepal's trekking calendar isn't one-size-fits-all — the right season depends heavily on which region you're heading to. Here's how our guides plan departures across the year." },
      { type: "heading", text: "Spring (March–May)" },
      { type: "paragraph", text: "Widely considered the best all-round trekking season. Daytime temperatures are pleasant, mountain visibility is generally excellent, and rhododendron forests bloom spectacularly along routes like Poon Hill, Annapurna Base Camp and Mardi Himal. This is peak season for Everest Base Camp, Annapurna Circuit and Manaslu." },
      { type: "heading", text: "Autumn (September–November)" },
      { type: "paragraph", text: "The other prime season, following the monsoon when the air is freshly washed and skies are at their clearest for mountain photography. Trails and teahouses are busiest during this window, especially October, so book flights and lodges in advance." },
      { type: "heading", text: "Winter (December–February)" },
      { type: "paragraph", text: "Lower-altitude treks like Ghorepani Poon Hill and Langtang Valley remain very trekkable, with clear skies and cold but manageable temperatures. High passes such as Thorong La or Larkya La can close after heavy snowfall, so winter is not recommended for the Annapurna Circuit or Manaslu Circuit." },
      { type: "heading", text: "Monsoon / Summer (June–September)" },
      { type: "paragraph", text: "Most of Nepal is wet, leech-prone and often cloud-covered during monsoon — but the trans-Himalayan rain-shadow regions of Upper Mustang and Dolpo are the exception, staying dry and clear precisely when the rest of the country is under cloud. If you can only travel in summer, these two regions are your best options." },
      { type: "list", items: [
        "Everest Base Camp & Annapurna Base Camp: March–May or September–November",
        "Annapurna Circuit & Manaslu Circuit: March–May or September–November",
        "Ghorepani Poon Hill & Langtang: year-round, best March–May and September–December",
        "Upper Mustang & Dolpo: June–September (rain shadow) or spring/autumn shoulder windows",
      ] },
    ],
  },
  {
    slug: "nepal-trekking-permits-explained",
    title: "Trekking Permits in Nepal: TIMS, ACAP and Restricted Area Permits Explained",
    excerpt:
      "TIMS card, national park fees, restricted area permits — here's exactly which permits you need for each region and how TrekVibe Nepal handles them for you.",
    coverImage: "/images/treks/manaslu-circuit.jpg",
    category: "Trip Planning",
    author: "TrekVibe Nepal Team",
    date: "2025-12-20",
    readTime: "5 min read",
    keywords: ["Nepal trekking permits", "TIMS card", "ACAP permit", "restricted area permit Nepal"],
    content: [
      { type: "paragraph", text: "Nepal requires trekking permits for almost every route, and the type you need depends entirely on the region. Here is a plain-language breakdown of what each permit is for." },
      { type: "heading", text: "TIMS Card (Trekkers' Information Management System)" },
      { type: "paragraph", text: "A general registration card required on most open trekking routes, used for trekker safety records. Issued through a registered agency like TrekVibe Nepal — we handle this for every guest automatically." },
      { type: "heading", text: "National Park and Conservation Area Permits" },
      { type: "paragraph", text: "Routes passing through a protected area require an entry permit, with fees supporting conservation work. The Annapurna Conservation Area Permit (ACAP) covers Annapurna Base Camp, Poon Hill, Annapurna Circuit and Mardi Himal; the Sagarmatha National Park permit plus the Khumbu Pasang Lhamu Rural Municipality permit cover the Everest region; and the Langtang National Park permit covers Langtang and Gosaikunda." },
      { type: "heading", text: "Restricted Area Permits" },
      { type: "paragraph", text: "Some regions near the Tibet border or in remote, culturally sensitive areas — Manaslu, Upper Mustang and Dolpo among them — are classified as restricted areas. These require a special permit issued only through a registered trekking agency, a licensed guide at all times, and a minimum group size of two trekkers. Restricted area permits are priced per day and are considerably more expensive than open-route permits, which is reflected in the higher package cost of those treks." },
      { type: "list", items: [
        "Everest region: Sagarmatha National Park permit + Khumbu Rural Municipality permit",
        "Annapurna region: ACAP (covers ABC, Poon Hill, Circuit, Mardi Himal)",
        "Langtang region: Langtang National Park permit",
        "Manaslu: Restricted Area Permit + MCAP + ACAP",
        "Upper Mustang: Restricted Area Permit + ACAP",
        "Dolpo (Upper & Lower): Restricted Area Permit + Shey Phoksundo National Park permit",
      ] },
      { type: "paragraph", text: "Every TrekVibe Nepal package includes the correct permits for your route as standard — you will never need to queue at a permit office yourself." },
    ],
  },
  {
    slug: "annapurna-circuit-vs-everest-base-camp",
    title: "Annapurna Circuit vs Everest Base Camp: Which Trek Is Right for You?",
    excerpt:
      "Two of Nepal's most famous treks compared on difficulty, scenery, cost and culture, to help you choose your first Himalayan adventure.",
    coverImage: "/images/treks/annapurna-base-camp.jpg",
    category: "Trek Comparisons",
    author: "TrekVibe Nepal Team",
    date: "2025-12-05",
    readTime: "6 min read",
    keywords: ["Annapurna Circuit vs Everest Base Camp", "which Nepal trek to choose", "EBC or Annapurna Circuit"],
    content: [
      { type: "paragraph", text: "Everest Base Camp and the Annapurna Circuit are the two treks most first-time visitors to Nepal ask us about. Both are world-class, but they suit slightly different travelers." },
      { type: "heading", text: "Scenery and highlight moments" },
      { type: "paragraph", text: "Everest Base Camp is a single, straight-line approach and return, culminating in the sunrise view of Everest from Kala Patthar. The Annapurna Circuit is a full loop with far more landscape variety — subtropical valleys, high desert, and a temple crossing at Muktinath — arguably offering more diversity per day than EBC." },
      { type: "heading", text: "Altitude and difficulty" },
      { type: "paragraph", text: "EBC tops out at 5,545 m (Kala Patthar); the Annapurna Circuit's Thorong La Pass reaches 5,416 m. Both are graded challenging, though EBC involves more consecutive days above 4,000 m, while the Circuit's toughest single day is the long pass-crossing push over Thorong La." },
      { type: "heading", text: "Logistics and flights" },
      { type: "paragraph", text: "EBC requires the short, weather-dependent Lukla flight, which can be delayed in poor visibility — build in buffer days. The Annapurna Circuit starts by road, so it is less exposed to flight cancellations, though road construction has shortened some of its lower sections in recent years." },
      { type: "heading", text: "Cost and crowds" },
      { type: "paragraph", text: "Everest Base Camp tends to cost more overall due to the Lukla flights, and its main season (October–November) sees the highest trekker traffic of any route in Nepal. The Annapurna Circuit costs somewhat less and, while still popular, spreads trekkers out more across its longer route." },
      { type: "paragraph", text: "Still undecided? Tell us your fitness level, available dates and travel style through our trip planner, and we'll recommend the better fit for you personally." },
    ],
  },
  {
    slug: "altitude-sickness-guide-nepal-trekking",
    title: "How to Prevent and Recognize Altitude Sickness While Trekking in Nepal",
    excerpt:
      "Altitude sickness is the single biggest risk on a Himalayan trek — and almost entirely preventable with the right pacing. Here's what to know.",
    coverImage: "/images/treks/gosaikunda.jpg",
    category: "Health & Safety",
    author: "TrekVibe Nepal Team",
    date: "2025-11-22",
    readTime: "6 min read",
    keywords: ["altitude sickness Nepal trekking", "AMS prevention", "high altitude sickness symptoms"],
    content: [
      { type: "paragraph", text: "Acute Mountain Sickness (AMS) can affect any trekker above roughly 2,500 m, regardless of age or fitness level. The good news: with sensible pacing, it is largely preventable, and every TrekVibe Nepal itinerary is designed around this principle." },
      { type: "heading", text: "Early symptoms to watch for" },
      { type: "list", items: [
        "Headache, especially one that doesn't improve with rest or water",
        "Nausea or loss of appetite",
        "Dizziness or unusual fatigue",
        "Difficulty sleeping",
        "Mild shortness of breath at rest",
      ] },
      { type: "heading", text: "The golden rules of prevention" },
      { type: "list", items: [
        "Climb high, sleep low — ascend gradually and use acclimatization days built into your itinerary.",
        "Never gain more than roughly 300–500 m of sleeping altitude per day above 3,000 m.",
        "Drink 3–4 litres of water daily and avoid alcohol at altitude.",
        "Walk at a slow, steady pace — arriving at camp tired but not exhausted.",
        "Report symptoms to your guide immediately rather than pushing through them.",
      ] },
      { type: "heading", text: "What we do differently" },
      { type: "paragraph", text: "Every TrekVibe Nepal guide carries a pulse oximeter and checks blood oxygen levels daily above 3,000 m, and our itineraries for EBC, Annapurna Circuit and Manaslu build in dedicated acclimatization days rather than the bare minimum. If symptoms worsen, our guides are trained to descend with you immediately — the single most effective treatment for AMS — and we require travel insurance with helicopter evacuation cover on every high-altitude booking as a safety net of last resort." },
    ],
  },
  {
    slug: "choosing-a-trekking-agency-in-kathmandu",
    title: "How to Choose a Trekking Agency in Kathmandu: A No-Nonsense Checklist",
    excerpt:
      "Kathmandu has hundreds of trekking operators. Here's what to actually check before you hand over a deposit for your Himalayan trip.",
    coverImage: "/images/treks/mardi-himal.jpg",
    category: "Trip Planning",
    author: "TrekVibe Nepal Team",
    date: "2025-11-02",
    readTime: "5 min read",
    keywords: ["trekking agency in Kathmandu", "best Nepal trekking company", "how to choose a trekking operator"],
    content: [
      { type: "paragraph", text: "With hundreds of registered trekking companies in Kathmandu alone, picking the right one matters as much as picking the right trek. Here's what we'd tell a friend to check." },
      { type: "heading", text: "1. Is the guide actually licensed?" },
      { type: "paragraph", text: "Ask specifically whether your guide holds a government-issued trekking guide license, not just company experience. Licensed guides receive formal training in first aid, high-altitude medicine and rescue coordination." },
      { type: "heading", text: "2. Are acclimatization days built in, not optional?" },
      { type: "paragraph", text: "Some budget itineraries compress schedules to look cheaper, cutting acclimatization days that exist specifically to prevent altitude sickness. Compare the number of trekking days for the same route across agencies — a suspiciously short itinerary is a red flag, not a bargain." },
      { type: "heading", text: "3. What exactly is included in the price?" },
      { type: "paragraph", text: "Get a written breakdown of what's included — permits, flights, guide, porter, accommodation — versus what's extra, so you can compare quotes on a like-for-like basis rather than headline price alone." },
      { type: "heading", text: "4. Do they require and check travel insurance?" },
      { type: "paragraph", text: "A responsible agency will ask to see proof of insurance with high-altitude and helicopter evacuation cover before departure. If an agency doesn't ask, that's a sign they haven't thought through emergency scenarios." },
      { type: "heading", text: "5. Can you talk to a real person before booking?" },
      { type: "paragraph", text: "A trustworthy operator will happily get on a call or WhatsApp to answer detailed questions about your specific dates and fitness level rather than pushing you straight to payment. At TrekVibe Nepal, every itinerary is discussed directly with our Kathmandu-based team before you book." },
    ],
  },
];

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}
