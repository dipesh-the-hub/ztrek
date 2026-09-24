import Image from "next/image";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

const photos = [
  {
    src: "/images/gallery/pikey-peak.jpg",
    alt: "Sunrise over the Everest range from Pikey Peak",
    title: "Pikey Peak",
    detail: "Lower Everest region · 4,065 m",
  },
  {
    src: "/images/gallery/kanchenjunga.jpg",
    alt: "The Kanchenjunga massif in far-east Nepal",
    title: "Kanchenjunga",
    detail: "Far-east Nepal",
  },
  {
    src: "/images/treks/gosaikunda.jpg",
    alt: "Gosaikunda holy lake in the Langtang region",
    title: "Gosaikunda Lake",
    detail: "Langtang · 4,380 m",
  },
];

export default function Gallery() {
  return (
    <section className="section-y bg-cream" id="gallery">
      <Container>
        <div data-reveal>
          <SectionHeading eyebrow="From the Trail" title="Views you walk for" />
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-[1.3fr_1fr] md:grid-rows-2">
          {photos.map((photo, i) => (
            <figure
              key={photo.src}
              data-curtain
              style={{ "--d": `${i * 0.15}s` } as React.CSSProperties}
              className={`group relative m-0 overflow-hidden rounded-[22px] bg-stone-300 ${
                i === 0 ? "aspect-[4/5] md:aspect-auto md:row-span-2" : "aspect-[16/10]"
              }`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes={i === 0 ? "(min-width: 768px) 56vw, 100vw" : "(min-width: 768px) 44vw, 100vw"}
                className="object-cover group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent" aria-hidden="true" />
              <figcaption className="absolute left-5 bottom-4 text-white">
                <span className="block font-semibold">{photo.title}</span>
                <span className="block text-sm text-white/80">{photo.detail}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
