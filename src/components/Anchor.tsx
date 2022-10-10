import { useState } from "react";
import { Text } from "./Text";

interface AnchorProps {
  href: string;
  font?: "sans" | "serif";
  size?: "small" | "base" | "large";
  linkType?: "default" | "demo";
  img?: string;
  imgAlt?: string;
  children: React.ReactNode;
}

export function Anchor({
  href,
  font = "serif",
  size = "base",
  linkType = "default",
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
          <div className="absolute right-16 bottom-16 flex items-center space-x-8 p-8 backdrop-blur-sm bg-[#100a0a]/30 rounded-8">
            <Text size="small" className="text-white">
              VISIT {linkType === "demo" ? "DEMO" : "LINK"}
            </Text>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              className="w-16 h-16 fill-white"
            >
              <path
                fill-rule="evenodd"
                d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z"
                clip-rule="evenodd"
              />
              <path
                fill-rule="evenodd"
                d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
        </div>
      ) : null}
    </span>
  );
}
