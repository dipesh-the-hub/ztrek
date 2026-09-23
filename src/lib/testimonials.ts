// Placeholder testimonials for launch — replace with real guest reviews
// (e.g. pulled from Google Business Profile or TripAdvisor) before going live.
export interface Testimonial {
  name: string;
  location: string;
  trek: string;
  rating: number;
  quote: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Sample Review",
    location: "Add reviewer country",
    trek: "Everest Base Camp Trek",
    rating: 5,
    quote:
      "Replace this with a real guest quote about their trek experience — what the guide did well, how the itinerary felt, and what stood out.",
  },
  {
    name: "Sample Review",
    location: "Add reviewer country",
    trek: "Annapurna Base Camp Trek",
    rating: 5,
    quote:
      "Replace this with a real guest quote. Short, specific quotes about the guide, food, and views tend to convert best.",
  },
  {
    name: "Sample Review",
    location: "Add reviewer country",
    trek: "Manaslu Circuit Trek",
    rating: 5,
    quote:
      "Replace this with a real guest quote. Consider importing your Google Business Profile or TripAdvisor reviews here once you have a review history.",
  },
];
