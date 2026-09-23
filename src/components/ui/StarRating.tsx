import { Star } from "@phosphor-icons/react/dist/ssr";

export default function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={16}
          weight={i < rating ? "fill" : "regular"}
          className={i < rating ? "text-gold-500" : "text-stone-300"}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}
