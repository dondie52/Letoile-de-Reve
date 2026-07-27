import Image from "next/image";
import { StarMark } from "@/components/StarMark";
import { ASSETS, BRAND } from "@/lib/constants";

type BrandLogoProps = {
  variant?: "nav" | "full" | "mark";
  className?: string;
  priority?: boolean;
};

export function BrandLogo({
  variant = "nav",
  className = "",
  priority = false,
}: BrandLogoProps) {
  if (variant === "full") {
    return (
      <Image
        src={ASSETS.logoFull}
        alt={BRAND.name}
        width={365}
        height={424}
        priority={priority}
        className={`h-auto w-full object-contain ${className}`}
      />
    );
  }

  if (variant === "mark") {
    return (
      <StarMark className={`h-14 w-14 text-gold ${className}`} title={BRAND.name} />
    );
  }

  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <StarMark className="h-9 w-9 shrink-0 text-gold sm:h-10 sm:w-10" />
      <span className="flex min-w-0 flex-col leading-none">
        <span className="font-display text-[1.2rem] tracking-[0.02em] text-ivory sm:text-[1.4rem]">
          {BRAND.name}
        </span>
        <span className="mt-1.5 hidden text-[0.58rem] uppercase tracking-[0.22em] text-gold/90 sm:block">
          Luxury apartment
        </span>
      </span>
    </span>
  );
}
