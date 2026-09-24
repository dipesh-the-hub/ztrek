import Image from "next/image";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import type { GalleryPhoto } from "@/lib/gallery";

// Photos are managed in the admin panel under Gallery. The first one is shown large.
export default function Gallery({ photos }: { photos: GalleryPhoto[] }) {
  return (
    <section className="section-y bg-cream" id="gallery">
      <Container>
        <div data-reveal>
          <SectionHeading eyebrow="From the Trail" title="Views you walk for" />
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-[1.3fr_1fr] md:auto-rows-[minmax(14rem,auto)] md:grid-flow-dense">
          {photos.map((photo, i) => (
            <figure
              key={photo.imageUrl + i}
              data-curtain
              style={{ "--d": `${(i % 3) * 0.15}s` } as React.CSSProperties}
              className={`group relative m-0 overflow-hidden rounded-[22px] bg-stone-300 ${
                i === 0 ? "aspect-[4/5] md:aspect-auto md:row-span-2" : "aspect-[16/10]"
              } ${photos.length === 1 ? "md:col-span-2" : ""}`}
            >
              <Image
                src={photo.imageUrl}
                alt={photo.alt}
                fill
                sizes={i === 0 ? "(min-width: 768px) 56vw, 100vw" : "(min-width: 768px) 44vw, 100vw"}
                className="object-cover group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent" aria-hidden="true" />
              <figcaption className="absolute left-5 bottom-4 text-white">
                <span className="block font-semibold">{photo.title}</span>
                {photo.detail && <span className="block text-sm text-white/80">{photo.detail}</span>}
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
