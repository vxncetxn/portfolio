interface AnchorProps {
  href: string;
  font?: "primary" | "secondary";
  size?: "small" | "base" | "large";
  children: React.ReactNode;
}

export function Anchor({
  href,
  font = "secondary",
  size = "base",
  children,
}: AnchorProps) {
  return (
    <a
      href={href}
      className={`${font === "primary" ? "font-primary" : "font-secondary"} ${
        size === "small" ? "text-18" : "base" ? "text-24" : "text-40"
      } text-neutral-02 underline`}
    >
      {children}
    </a>
  );
}
