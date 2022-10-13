import { useState, useEffect } from "react";
import { debounce } from "../lib/debounce";

interface LinkPreviewProps {
  open: boolean;
  img: string;
  imgAlt: string;
  anchorRef: React.MutableRefObject<null>;
}

export default function LinkPreview({
  open,
  img,
  imgAlt,
  anchorRef,
}: LinkPreviewProps) {
  const [collisionParams, setCollisionParams] = useState({
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  });

  useEffect(() => {
    const handleResize = debounce(() => {
      const domRect = anchorRef.current.getBoundingClientRect();
      const bounds = {
        left: domRect.left,
        right: window.innerWidth - domRect.left - domRect.width,
        top: domRect.top,
        bottom: window.innerHeight - domRect.top - domRect.height,
        width: domRect.width,
      };

      let widthPop;
      if (window.matchMedia("(min-width: 1024px)").matches) {
        widthPop = 360;
      } else if (window.matchMedia("(min-width: 768px)").matches) {
        widthPop = 320;
      } else if (window.matchMedia("(min-width: 375px)").matches) {
        widthPop = 280;
      } else {
        widthPop = 240;
      }
      const heightPop = widthPop / (16 / 9);
      const collisionPadding = 8;

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
    }, 500);

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className={`hover-none:hidden absolute left-1/2 z-10 bg-neutral-01 w-240 mobile:w-280 tablet:w-320 desktop:w-360 aspect-video rounded-8 shadow-2xl p-8 pointer-events-none transition border border-neutral-04 ${
        collisionParams.top ? "top-full" : "bottom-full"
      } ${open ? "opacity-1" : "opacity-0"}`}
      style={{
        transform: `translate(calc(-50% + ${
          collisionParams.left || collisionParams.right || 0
        }px), ${
          open
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
  );
}
