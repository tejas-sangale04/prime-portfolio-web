import type { LucideIcon } from "lucide-react";
import { BRAND_ICONS, type BrandKey } from "@/components/site/brand-icons";
import { cn } from "@/lib/utils";

/** A brand slug from `BRAND_ICONS`, or a Lucide icon for skills with no logo. */
export type SkillIconSource = BrandKey | LucideIcon;

// Near-black brand colours (Next.js, Vercel, GitHub…) vanish on the dark page,
// so those fall back to the current text colour.
function isDark(hex: string) {
  const n = parseInt(hex, 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  return 0.2126 * r + 0.7152 * g + 0.0722 * b < 60;
}

export function SkillIcon({ icon, className }: { icon: SkillIconSource; className?: string }) {
  if (typeof icon !== "string") {
    const Icon = icon;
    return <Icon aria-hidden="true" className={cn("text-emerald-300/90", className)} />;
  }
  const brand = BRAND_ICONS[icon];
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill={isDark(brand.hex) ? "currentColor" : `#${brand.hex}`}
    >
      <path d={brand.path} />
    </svg>
  );
}
