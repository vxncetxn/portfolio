interface TextProps {
  font?: "sans" | "serif";
  size?: "small" | "base" | "large";
  children: React.ReactNode;
  className?: string;
}

export function Text({
  font = "sans",
  size = "base",
  children,
  className,
}: TextProps) {
  return (
    <p
      className={`${font === "sans" ? "font-sans" : "font-serif"} ${
        size === "small"
          ? "text-14 xs:text-16 md:text-18"
          : "base"
          ? "text-16 xs:text-18 md:text-20 lg:text-24"
          : "text-24 xs:text-28 md:text-32 lg:text-40"
      } text-neutral-02 capsize transition-colors selection:bg-theme-selected ${className}`}
    >
      {children}
    </p>
  );
}
