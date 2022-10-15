interface SpanProps {
  font?: "sans" | "serif";
  size?: "small" | "base" | "large";
  children: React.ReactNode;
}

export function Span({ font = "serif", size = "base", children }: SpanProps) {
  return (
    <span
      className={`inline-block ${
        font === "sans" ? "font-sans" : "font-serif"
      } ${
        size === "small"
          ? "text-14 mobile:text-16 tablet:text-18"
          : "base"
          ? "text-16 mobile:text-18 tablet:text-20 desktop:text-24"
          : "text-24 mobile:text-28 tablet:text-32 desktop:text-40"
      } text-neutral-02 capsize transition-colors selection:bg-theme-selected`}
    >
      {children}
    </span>
  );
}