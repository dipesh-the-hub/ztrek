import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import { getTreksGroupedByRegion } from "@/lib/data/treks";
import { getNavItems } from "@/lib/data/navItems";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [regionGroupsRaw, navItems] = await Promise.all([
    getTreksGroupedByRegion(),
    getNavItems(),
  ]);
  const regionGroups = regionGroupsRaw.filter((g) => g.treks.length > 0);

  return (
    <>
      <Navbar regionGroups={regionGroups} navItems={navItems} />
      <main className="flex-1 pt-20">{children}</main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
