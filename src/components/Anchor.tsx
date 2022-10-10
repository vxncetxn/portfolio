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
      {previewOpen ? (
        <div className="absolute left-1/2 -top-200 -translate-x-1/2 -translate-y-16 bg-white w-320 aspect-video rounded-8 shadow-2xl p-4">
          <picture>
            <source
              type="image/avif"
              srcSet={`/images/${img}-320w.avif 320w, /images/${img}-640w.avif 640w, /images/${img}-960w.avif 960w, /images/${img}-1280w.avif 1280w`}
              sizes="320px"
            />
            <source
              type="image/webp"
              srcSet={`/images/${img}-320w.webp 320w, /images/${img}-640w.webp 640w, /images/${img}-960w.webp 960w, /images/${img}-1280w.webp 1280w`}
              sizes="320px"
            />
            <source
              type="image/jpeg"
              srcSet={`/images/${img}-320w.jpeg 320w, /images/${img}-640w.jpeg 640w, /images/${img}-960w.jpeg 960w, /images/${img}-1280w.jpeg 1280w`}
              sizes="320px"
            />
            <img
              src={`/images/${img}-320w.jpeg`}
              alt={imgAlt}
              loading="lazy"
              decoding="async"
              className="w-320 aspect-video object-cover"
            />
          </picture>
        </div>
      ) : null}
    </span>
  );
}
