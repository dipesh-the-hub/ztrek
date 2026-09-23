export interface Region {
  slug: string;
  label: string;
  blurb: string;
}

// Static fallback used when no database is connected. Once a database is
// connected, regions are managed at /admin/regions instead.
export const regions: Region[] = [
  { slug: "everest", label: "Everest Region", blurb: "Home to the world's highest peak and the Sherpa capital, Namche Bazaar." },
  { slug: "annapurna", label: "Annapurna Region", blurb: "Nepal's most trekked region, from short sunrise walks to the full circuit." },
  { slug: "langtang", label: "Langtang Region", blurb: "The closest Himalayan wilderness to Kathmandu, with sacred alpine lakes." },
  { slug: "manaslu", label: "Manaslu Region", blurb: "A quieter restricted-area circuit beneath the world's 8th-highest mountain." },
  { slug: "mustang", label: "Mustang Region", blurb: "The former forbidden kingdom — a Tibetan-Buddhist desert landscape." },
  { slug: "dolpo", label: "Dolpo Region", blurb: "Nepal's remotest trans-Himalayan wilderness, trekked by wilderness camp." },
  { slug: "kanchenjunga", label: "Kanchenjunga Region", blurb: "Nepal's far-eastern giant — a remote circuit around the world's 3rd-highest peak." },
  { slug: "makalu", label: "Makalu Region", blurb: "A wild, seldom-trekked approach to the world's 5th-highest mountain." },
  { slug: "kathmandu-valley", label: "Kathmandu Valley", blurb: "Temples, stupas and living heritage in Nepal's capital." },
  { slug: "chitwan", label: "Chitwan", blurb: "Subtropical lowland national park, home to the one-horned rhino." },
  { slug: "trishuli", label: "Trishuli River", blurb: "Nepal's most accessible white-water rafting river." },
];
