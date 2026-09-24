import Link from "next/link";
import Image from "next/image";
import {
  SquaresFour,
  Mountains,
  Newspaper,
  ChatCircleText,
  UsersThree,
  Envelope,
  SignOut,
  ArrowSquareOut,
  MapPinLine,
  Tag,
  Gear,
  ListBullets,
  Images,
} from "@phosphor-icons/react/dist/ssr";
import { logoutAction } from "@/lib/actions/auth";
import { USE_DB } from "@/lib/db";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: SquaresFour },
  { href: "/admin/inquiries", label: "Inquiries", icon: Envelope },
  { href: "/admin/settings", label: "Homepage Settings", icon: Gear },
  { href: "/admin/menu", label: "Navigation Menu", icon: ListBullets },
  { href: "/admin/treks", label: "Treks", icon: Mountains },
  { href: "/admin/blog", label: "Blog Posts", icon: Newspaper },
  { href: "/admin/testimonials", label: "Testimonials", icon: ChatCircleText },
  { href: "/admin/guides", label: "Guides", icon: UsersThree },
  { href: "/admin/gallery", label: "Gallery", icon: Images },
  { href: "/admin/regions", label: "Regions", icon: MapPinLine },
  { href: "/admin/categories", label: "Categories", icon: Tag },
];

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-navy-50 flex">
      <aside className="hidden md:flex md:w-64 md:flex-col bg-navy-950 text-white shrink-0">
        <div className="flex items-center gap-3 px-5 h-20 border-b border-white/10">
          <Image
            src="/images/brand/logo.webp"
            alt="TrekVibe Nepal"
            width={36}
            height={36}
            className="h-9 w-9 rounded-full"
          />
          <span className="font-display text-sm font-semibold">
            TrekVibe <span className="text-gold-400">Admin</span>
          </span>
        </div>

        <nav className="flex-1 px-3 py-5 space-y-1" aria-label="Admin">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white transition-colors"
            >
              <Icon size={18} aria-hidden="true" />
              {label}
            </Link>
          ))}
        </nav>

        <div className="px-3 pb-5 space-y-1 border-t border-white/10 pt-4">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition-colors"
          >
            <ArrowSquareOut size={18} aria-hidden="true" />
            View Site
          </Link>
          <form action={logoutAction}>
            <button
              type="submit"
              className="w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
            >
              <SignOut size={18} aria-hidden="true" />
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        {!USE_DB && (
          <div className="bg-gold-100 text-gold-600 text-sm px-6 py-2.5 text-center font-medium">
            No database connected — showing read-only demo data from the site&apos;s static content. Set DATABASE_URL to enable editing.
          </div>
        )}
        <header className="md:hidden flex items-center justify-between h-16 px-4 bg-navy-950 text-white">
          <span className="font-display text-sm font-semibold">TrekVibe Admin</span>
          <form action={logoutAction}>
            <button type="submit" className="text-xs font-semibold text-white/80 cursor-pointer">
              Sign Out
            </button>
          </form>
        </header>
        <main className="flex-1 p-5 sm:p-8">{children}</main>
      </div>
    </div>
  );
}
