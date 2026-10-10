import Link from "next/link";
import { Fragment } from "react";

const SITE_ORIGIN = /^https?:\/\/(www\.)?trekvibenepal\.com/;
const LINK_PATTERN = /\[([^\]]+)\]\(([^)\s]+)\)/g;

/**
 * Renders blog text, turning Markdown-style [label](url) links into anchors.
 * Links to trekvibenepal.com become in-site <Link>s; anything else opens in a
 * new tab.
 */
export default function InlineText({ text }: { text: string }) {
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;

  for (const match of text.matchAll(LINK_PATTERN)) {
    const [whole, label, url] = match;
    const index = match.index ?? 0;
    if (index > lastIndex) parts.push(text.slice(lastIndex, index));

    const className = "font-medium text-gold-600 underline underline-offset-2 hover:text-navy-950";
    if (SITE_ORIGIN.test(url) || url.startsWith("/")) {
      const href = url.replace(SITE_ORIGIN, "") || "/";
      parts.push(<Link key={index} href={href} className={className}>{label}</Link>);
    } else {
      parts.push(
        <a key={index} href={url} target="_blank" rel="noopener noreferrer" className={className}>
          {label}
        </a>,
      );
    }
    lastIndex = index + whole.length;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));

  return <>{parts.map((part, i) => <Fragment key={i}>{part}</Fragment>)}</>;
}
