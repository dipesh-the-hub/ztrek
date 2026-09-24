-- AlterTable
ALTER TABLE "SiteSettings" ADD COLUMN     "showGallery" BOOLEAN NOT NULL DEFAULT true;

-- CreateTable
CREATE TABLE "GalleryPhoto" (
    "id" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "alt" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "detail" TEXT NOT NULL DEFAULT '',
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GalleryPhoto_pkey" PRIMARY KEY ("id")
);


-- Seed the three photos the homepage gallery launched with (editable in Admin > Gallery)
INSERT INTO "GalleryPhoto" ("id", "imageUrl", "alt", "title", "detail", "sortOrder", "published", "createdAt", "updatedAt") VALUES
    ('gallery_pikey_peak', '/images/gallery/pikey-peak.jpg', 'Sunrise over the Everest range from Pikey Peak', 'Pikey Peak', 'Lower Everest region · 4,065 m', 0, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('gallery_kanchenjunga', '/images/gallery/kanchenjunga.jpg', 'The Kanchenjunga massif in far-east Nepal', 'Kanchenjunga', 'Far-east Nepal', 1, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('gallery_gosaikunda', '/images/treks/gosaikunda.jpg', 'Gosaikunda holy lake in the Langtang region', 'Gosaikunda Lake', 'Langtang · 4,380 m', 2, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
