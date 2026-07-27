type StarMarkProps = {
  className?: string;
  title?: string;
};

/** Compass-star mark inspired by the L’étoile de Rêve logo. */
export function StarMark({ className = "", title }: StarMarkProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
    >
      {title ? <title>{title}</title> : null}
      {/* Main compass star */}
      <path
        d="M32 4 L34.6 28.2 L58 32 L34.6 35.8 L32 60 L29.4 35.8 L6 32 L29.4 28.2 Z"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinejoin="miter"
      />
      <path
        d="M32 12 L33.4 28.8 L48 32 L33.4 35.2 L32 52 L30.6 35.2 L16 32 L30.6 28.8 Z"
        stroke="currentColor"
        strokeWidth="0.7"
        opacity="0.55"
      />
      {/* Diagonal rays */}
      <path d="M18 18 L28.5 28.5" stroke="currentColor" strokeWidth="0.8" />
      <path d="M46 18 L35.5 28.5" stroke="currentColor" strokeWidth="0.8" />
      <path d="M18 46 L28.5 35.5" stroke="currentColor" strokeWidth="0.8" />
      <path d="M46 46 L35.5 35.5" stroke="currentColor" strokeWidth="0.8" />
      {/* Corner sparkles */}
      <path d="M15 15 L16.2 17.8 L19 19 L16.2 20.2 L15 23 L13.8 20.2 L11 19 L13.8 17.8 Z" fill="currentColor" />
      <path d="M49 15 L50.2 17.8 L53 19 L50.2 20.2 L49 23 L47.8 20.2 L45 19 L47.8 17.8 Z" fill="currentColor" />
      <path d="M15 45 L16.2 47.8 L19 49 L16.2 50.2 L15 53 L13.8 50.2 L11 49 L13.8 47.8 Z" fill="currentColor" />
      <path d="M49 45 L50.2 47.8 L53 49 L50.2 50.2 L49 53 L47.8 50.2 L45 49 L47.8 47.8 Z" fill="currentColor" />
      <circle cx="32" cy="32" r="1.6" fill="currentColor" />
    </svg>
  );
}
