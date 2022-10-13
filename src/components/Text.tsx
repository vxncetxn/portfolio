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
          ? "text-14 mobile:text-16 tablet:text-18"
          : "base"
          ? "text-16 mobile:text-18 tablet:text-20 desktop:text-24"
          : "text-24 mobile:text-28 tablet:text-32 desktop:text-40"
      } text-neutral-02 capsize transition-colors selection:bg-theme-selected ${className}`}
    >
      {children}
    </p>
  );
}
