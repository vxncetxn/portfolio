interface TextProps {
  font?: "primary" | "secondary";
  size?: "small" | "base" | "large";
  children: React.ReactNode;
  className?: string;
}

export function Text({
  font = "primary",
  size = "base",
  children,
  className,
}: TextProps) {
  return (
    <p
      className={`${font === "primary" ? "font-primary" : "font-secondary"} ${
        size === "small" ? "text-18" : "base" ? "text-24" : "text-40"
      } text-neutral-02 capsize transition-colors ${className}`}
    >
      {children}
    </p>
  );
}
