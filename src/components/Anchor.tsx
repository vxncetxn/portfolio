interface AnchorProps {
  href: string;
  font?: "sans" | "serif";
  size?: "small" | "base" | "large";
  children: React.ReactNode;
}

export function Anchor({
  href,
  font = "serif",
  size = "base",
  children,
}: AnchorProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      className={`${font === "sans" ? "font-sans" : "font-serif"} ${
        size === "small" ? "text-18" : "base" ? "text-24" : "text-40"
      } text-neutral-02 underline transition-colors selection:bg-theme-selected rounded-2 focus-visible:outline-none focus-visible:ring focus-visible:ring-theme-selected focus-visible:ring-offset-2 focus-visible:ring-offset-transparent`}
    >
      {children}
    </a>
  );
}
