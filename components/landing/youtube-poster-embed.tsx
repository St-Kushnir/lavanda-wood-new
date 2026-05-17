"use client";

import Image from "next/image";
import { useCallback, useState } from "react";

type YouTubePosterEmbedProps = {
  videoId: string;
  /** Короткий опис для прев’ю та iframe */
  title: string;
  /** Власне зображення-прев’ю замість скріншота з YouTube */
  posterSrc?: string;
  /** Підпис до прев’ю (якщо передано posterSrc) */
  posterAlt?: string;
  /** Додаткові класи для прев’ю (object-position, scale тощо) */
  posterImageClassName?: string;
};

/**
 * Спочатку показує прев’ю (власне фото або maxresdefault / hqdefault з YouTube),
 * після кліку підвантажує iframe з autoplay.
 */
export function YouTubePosterEmbed({
  videoId,
  title,
  posterSrc,
  posterAlt,
  posterImageClassName,
}: YouTubePosterEmbedProps) {
  const [playing, setPlaying] = useState(false);
  const [thumbTier, setThumbTier] = useState<"maxres" | "hq">("maxres");

  const useYouTubeThumb = !posterSrc;

  const resolvedPoster = posterSrc
    ? posterSrc
    : thumbTier === "maxres"
      ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
      : `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  const onThumbError = useCallback(() => {
    if (!useYouTubeThumb) return;
    setThumbTier((t) => (t === "maxres" ? "hq" : t));
  }, [useYouTubeThumb]);

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl ring-1 ring-white/[0.08] sm:rounded-3xl">
      {playing ? (
        <iframe
          title={title}
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          className="absolute inset-0 h-full w-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : (
        <>
          <Image
            src={resolvedPoster}
            alt={posterSrc ? (posterAlt ?? "") : ""}
            fill
            className={["object-cover", posterImageClassName ?? "object-center"].filter(Boolean).join(" ")}
            sizes="(max-width: 1440px) 100vw, 1440px"
            priority={false}
            onError={useYouTubeThumb ? onThumbError : undefined}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-black/25" />
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group absolute inset-0 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A36D]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#121212]"
            aria-label={`Відтворити відео: ${title}`}
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#C6A36D] text-[#0F0F0F] shadow-[0_12px_40px_rgba(0,0,0,0.45)] transition group-hover:scale-105 group-hover:bg-[#d4b07e] sm:h-[4.5rem] sm:w-[4.5rem]">
              <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7 fill-current sm:h-8 sm:w-8" aria-hidden>
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </button>
        </>
      )}
    </div>
  );
}
