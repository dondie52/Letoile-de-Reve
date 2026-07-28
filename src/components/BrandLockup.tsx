import Image from "next/image";
import { ASSETS, BRAND } from "@/lib/constants";

type BrandLockupProps = {
  /** Compact sizing for scrolled / dense header states */
  compact?: boolean;
  className?: string;
  priority?: boolean;
};

/**
 * Official vertical lockup: star above wordmark, tagline, and location subtitle.
 * Matches the L’ÉTOILE DE RÊVE brand mark used on print / social references.
 */
export function BrandLockup({
  compact = false,
  className = "",
  priority = false,
}: BrandLockupProps) {
  return (
    <span
      className={`brand-lockup ${compact ? "brand-lockup--compact" : ""} ${className}`.trim()}
      aria-hidden="true"
    >
      <Image
        src={ASSETS.logoMark}
        alt=""
        width={150}
        height={123}
        priority={priority}
        fetchPriority={priority ? "high" : "auto"}
        sizes="(max-width: 639px) 32px, (max-width: 1023px) 40px, 52px"
        className="brand-lockup-star"
      />
      <span className="brand-lockup-wordmark">
        <span className="brand-lockup-etoile">L’ÉTOILE</span>
        <span className="brand-lockup-reve">DE RÊVE</span>
      </span>
      <span className="brand-lockup-tagline">{BRAND.tagline.toUpperCase()}</span>
      <span className="brand-lockup-rule" aria-hidden="true">
        <span className="brand-lockup-rule-line" />
        <span className="brand-lockup-rule-diamond" />
        <span className="brand-lockup-rule-line" />
      </span>
      <span className="brand-lockup-subtitle">
        LUXURY APARTMENT&nbsp;|&nbsp;PHAKALANE
      </span>
    </span>
  );
}
