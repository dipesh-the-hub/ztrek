export interface Category {
  slug: string;
  label: string;
  blurb: string;
}

// Static fallback used when no database is connected. Once a database is
// connected, categories are managed at /admin/categories instead — that's
// where you'd add "City Tour", "Adventure Activity", or anything else.
export const categories: Category[] = [
  { slug: "trekking", label: "Trekking", blurb: "Multi-day guided treks across Nepal's mountain regions." },
  { slug: "city-tour", label: "City Tour", blurb: "Half-day and full-day guided tours around the Kathmandu Valley." },
  { slug: "peak-climbing", label: "Peak Climbing", blurb: "Guided ascents of Nepal's 6,000 m \"trekking peaks\" for climbers." },
  { slug: "river-rafting", label: "River Rafting", blurb: "White-water rafting trips on Nepal's glacier-fed rivers." },
  { slug: "jungle-safari", label: "Jungle Safari", blurb: "Wildlife safaris in Nepal's lowland national parks." },
];
