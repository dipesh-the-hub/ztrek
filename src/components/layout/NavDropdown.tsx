import Link from "next/link";
import NavPopover from "@/components/layout/NavPopover";

export interface NavDropdownItem {
  label: string;
  href: string;
  description?: string;
}

export default function NavDropdown({
  label,
  items,
  light,
}: {
  label: string;
  items: NavDropdownItem[];
  light?: boolean;
}) {
  return (
    <NavPopover label={label} light={light} panelClassName="w-72">
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="block rounded-lg px-3 py-2.5 hover:bg-navy-50 transition-colors"
            >
              <span className="block text-sm font-semibold text-navy-950">
                {item.label}
              </span>
              {item.description && (
                <span className="block text-xs text-stone-500 mt-0.5">
                  {item.description}
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </NavPopover>
  );
}
