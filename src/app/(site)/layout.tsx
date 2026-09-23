import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import { getTreksGroupedByRegion } from "@/lib/data/treks";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const regionGroups = (await getTreksGroupedByRegion()).filter((g) => g.treks.length > 0);

  return (
    <>
      <Navbar regionGroups={regionGroups} />
      <main className="flex-1 pt-20">{children}</main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
