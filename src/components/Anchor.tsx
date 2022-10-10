import { useState } from "react";

interface AnchorProps {
  href: string;
  font?: "sans" | "serif";
  size?: "small" | "base" | "large";
  img?: string;
  imgAlt?: string;
  children: React.ReactNode;
}

export function Anchor({
  href,
  font = "serif",
  size = "base",
  img,
  imgAlt,
  children,
}: AnchorProps) {
  const [previewOpen, setPreviewOpen] = useState(false);

  return (
    <span
      onMouseEnter={() => img && setPreviewOpen(true)}
      onMouseLeave={() => img && setPreviewOpen(false)}
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
      {img ? (
        <div
          className={`absolute left-1/2 -top-200 -translate-x-1/2 bg-neutral-01 w-360 aspect-video rounded-8 shadow-2xl p-8 pointer-events-none transition border border-neutral-04 ${
            previewOpen
              ? "opacity-1 -translate-y-20"
              : "opacity-0 translate-y-40"
          }`}
        >
          <picture>
            <source
              type="image/avif"
              srcSet={`/images/${img}-360w.avif 360w, /images/${img}-720w.avif 720w, /images/${img}-1080w.avif 1080w, /images/${img}-1440w.avif 1440w`}
              sizes="360px"
            />
            <source
              type="image/webp"
              srcSet={`/images/${img}-360w.webp 360w, /images/${img}-720w.webp 720w, /images/${img}-1080w.webp 1080w, /images/${img}-1440w.webp 1440w`}
              sizes="360px"
            />
            <source
              type="image/jpeg"
              srcSet={`/images/${img}-360w.jpeg 360w, /images/${img}-720w.jpeg 720w, /images/${img}-1080w.jpeg 1080w, /images/${img}-1440w.jpeg 1440w`}
              sizes="360px"
            />
            <img
              src={`/images/${img}-360w.jpeg`}
              alt={imgAlt}
              loading="lazy"
              decoding="async"
              className="w-360 aspect-video object-cover"
            />
          </picture>
        </div>
      ) : null}
    </span>
  );
}
