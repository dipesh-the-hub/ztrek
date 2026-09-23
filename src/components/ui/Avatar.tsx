export default function Avatar({
  initials,
  className,
}: {
  initials: string;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center justify-center rounded-full bg-navy-900 text-gold-300 font-display font-semibold shrink-0 ${className ?? "h-12 w-12 text-base"}`}
      aria-hidden="true"
    >
      {initials}
    </div>
  );
}
