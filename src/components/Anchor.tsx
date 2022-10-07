import { useState } from "react";

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
  const [previewOpen, setPreviewOpen] = useState(false);

  return (
    <span
      onMouseEnter={() => setPreviewOpen(true)}
      onMouseLeave={() => setPreviewOpen(false)}
      className="relative"
    >
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
      {previewOpen ? (
        <div className="absolute left-1/2 -top-200 -translate-x-1/2 -translate-y-16 bg-white h-200 aspect-video rounded-8 shadow-2xl p-4">
          <img
            src="/meta-image.jpg"
            alt="test"
            className="w-full h-full rounded-4"
          />
        </div>
      ) : null}
    </span>
  );
}
