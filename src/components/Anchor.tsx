import { useRef, useState, lazy } from "react";
// import { Text } from "./Text";
const LinkPreview = lazy(() => import("./LinkPreview"));

interface AnchorProps {
  href: string;
  font?: "sans" | "serif";
  size?: "small" | "base" | "large";
  linkType?: "default" | "demo";
  img?: string;
  imgAlt?: string;
  lineWrap?: boolean;
  children: React.ReactNode;
}

export function Anchor({
  href,
  font = "serif",
  size = "base",
  // linkType = "default",
  img,
  imgAlt,
  lineWrap = false,
  children,
}: AnchorProps) {
  const anchorRef = useRef<HTMLAnchorElement>(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  return (
    <span
      onMouseEnter={
        typeof window !== "undefined" &&
        window.matchMedia("(hover: hover)").matches &&
        img
          ? () => {
              setPreviewOpen(true);
            }
          : undefined
      }
      onMouseLeave={
        typeof window !== "undefined" &&
        window.matchMedia("(hover: hover)").matches &&
        img
          ? () => {
              setPreviewOpen(false);
            }
          : undefined
      }
      className="relative"
    >
      <a
        ref={anchorRef}
        href={href}
        target="_blank"
        rel="noopener"
        className={`${font === "sans" ? "font-sans" : "font-serif"} ${
          size === "small"
            ? "text-14 mobile:text-16 tablet:text-18"
            : "base"
            ? "text-16 mobile:text-18 tablet:text-20 desktop:text-24"
            : "text-24 mobile:text-28 tablet:text-32 desktop:text-40"
        } ${
          lineWrap ? "" : "inline-block"
        } text-neutral-02 underline transition-colors selection:bg-theme-selected rounded-2 focus-visible:outline-none focus-visible:ring focus-visible:ring-theme-selected focus-visible:ring-offset-2 focus-visible:ring-offset-transparent`}
      >
        {children}
      </a>
      {typeof window !== "undefined" &&
      window.matchMedia("(hover: hover)").matches &&
      img &&
      imgAlt ? (
        <LinkPreview
          open={previewOpen}
          img={img}
          imgAlt={imgAlt}
          anchorRef={anchorRef}
        />
      ) : null}
    </span>
  );
}
