export interface GalleryPhoto {
  imageUrl: string;
  alt: string;
  title: string;
  detail: string;
}

// Shown when no database is connected, and used to seed the GalleryPhoto table.
export const galleryPhotos: GalleryPhoto[] = [
  {
    imageUrl: "/images/gallery/pikey-peak.jpg",
    alt: "Sunrise over the Everest range from Pikey Peak",
    title: "Pikey Peak",
    detail: "Lower Everest region · 4,065 m",
  },
  {
    imageUrl: "/images/gallery/kanchenjunga.jpg",
    alt: "The Kanchenjunga massif in far-east Nepal",
    title: "Kanchenjunga",
    detail: "Far-east Nepal",
  },
  {
    imageUrl: "/images/treks/gosaikunda.jpg",
    alt: "Gosaikunda holy lake in the Langtang region",
    title: "Gosaikunda Lake",
    detail: "Langtang · 4,380 m",
  },
];
