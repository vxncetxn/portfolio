import { useRef, useState, useEffect } from "react";
// import { Text } from "./Text";

function debounce(fn, wait = 1) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn.call(this, ...args), wait);
  };
}

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
  // linkType = "default",
  img,
  imgAlt,
  children,
}: AnchorProps) {
  const anchorRef = useRef();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [collisionParams, setCollisionParams] = useState({
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  });

  useEffect(() => {
    const handleResize = debounce(() => {
      const domRect = anchorRef.current.getClientRects()[0];
      const bounds = {
        left: domRect.left,
        right: window.innerWidth - domRect.left - domRect.width,
        top: domRect.top,
        bottom: window.innerHeight - domRect.top - domRect.height,
        width: domRect.width,
      };
      const widthPop = 360;
      const heightPop = widthPop / (16 / 9);
      const collisionPadding = 16;

      const leftCollision =
        collisionPadding + 0.5 * (widthPop - bounds.width) - bounds.left > 0
          ? collisionPadding + 0.5 * (widthPop - bounds.width) - bounds.left
          : 0;
      const rightCollision =
        bounds.right - (collisionPadding + 0.5 * (widthPop - bounds.width)) < 0
          ? bounds.right - (collisionPadding + 0.5 * (widthPop - bounds.width))
          : 0;
      const topCollision =
        collisionPadding + heightPop + 8 - bounds.top > 0
          ? heightPop + 8 - bounds.top
          : 0;
      const bottomCollision =
        collisionPadding + heightPop + 8 - bounds.bottom > 0
          ? heightPop + 8 - bounds.bottom
          : 0;

      setCollisionParams({
        left: leftCollision,
        right: rightCollision,
        top: topCollision,
        bottom: bottomCollision,
      });

      console.log(
        "Look here: ",
        bounds.right,
        collisionPadding + 0.5 * (widthPop - bounds.width),
        bounds.right - collisionPadding + 0.5 * (widthPop - bounds.width),
        children
      );
    }, 500);

    window.dispatchEvent(new Event("resize"));

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <span
      onMouseEnter={() => img && setPreviewOpen(true)}
      onMouseLeave={() => img && setPreviewOpen(false)}
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
        } text-neutral-02 underline transition-colors selection:bg-theme-selected rounded-2 focus-visible:outline-none focus-visible:ring focus-visible:ring-theme-selected focus-visible:ring-offset-2 focus-visible:ring-offset-transparent`}
      >
        {children}
      </a>
      {img ? (
        <div
          className={`hover-none:hidden absolute left-1/2 z-10 bg-neutral-01 w-360 aspect-video rounded-8 shadow-2xl p-8 pointer-events-none transition border border-neutral-04 ${
            collisionParams.top ? "top-full" : "bottom-full"
          } ${previewOpen ? "opacity-1" : "opacity-0"}`}
          style={{
            transform: `translate(calc(-50% + ${
              collisionParams.left || collisionParams.right || 0
            }px), ${
              previewOpen
                ? collisionParams.top
                  ? "8"
                  : "-8"
                : collisionParams.top
                ? "-40"
                : "40"
            }px)`,
          }}
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
              className="object-cover w-360 aspect-video"
            />
          </picture>
          {/* <div className="absolute right-16 bottom-16 flex items-center space-x-8 p-8 backdrop-blur-sm bg-[#100a0a]/30 rounded-8">
            <Text size="small" className="text-white">
              VISIT {linkType === "demo" ? "DEMO" : "LINK"}
            </Text>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox={`0 0 20 20`}
              className="w-16 h-16 fill-white"
            >
              <path
                fillRule="evenodd"
                d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z"
                clipRule="evenodd"
              />
              <path
                fillRule="evenodd"
                d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z"
                clipRule="evenodd"
              />
            </svg>
          </div> */}
        </div>
      ) : null}
    </span>
  );
}
