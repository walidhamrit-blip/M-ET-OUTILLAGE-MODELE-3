"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useLang } from "@/components/lang-context";

export type HeroSlideView = {
  id: number;
  image: string;
  href: string;
  alt: string;
  altAr: string;
  altEn: string;
};

export function HeroCarousel({ slides }: { slides: HeroSlideView[] }) {
  const { lang } = useLang();
  const [index, setIndex] = useState(0);
  const count = slides.length;

  const next = useCallback(() => setIndex((i) => (count ? (i + 1) % count : 0)), [count]);
  const prev = useCallback(() => setIndex((i) => (count ? (i - 1 + count) % count : 0)), [count]);

  useEffect(() => {
    if (count < 2) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next, index, count]);

  if (count === 0) return null;

  const altOf = (s: HeroSlideView) => (lang === "ar" ? s.altAr || s.alt : s.altEn || s.alt);

  return (
    <div className="relative mx-auto max-w-[1326px] px-4 mt-4">
      <div className="relative overflow-hidden rounded-sm shadow-sm bg-gray-200">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((s) => (
            <Link key={s.id} href={s.href} className="w-full shrink-0 block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={s.image}
                alt={altOf(s)}
                className="w-full h-[220px] sm:h-[320px] md:h-[420px] object-cover"
              />
            </Link>
          ))}
        </div>

        {count > 1 && (
          <div className="absolute bottom-3 start-1/2 -translate-x-1/2 flex gap-1.5">
            {slides.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`${i + 1}`}
                className={`h-[5px] w-6 rounded-sm transition-colors ${
                  i === index ? "bg-[#e31e25]" : "bg-gray-300/80"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {count > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Previous"
            className="absolute start-0 top-1/2 -translate-y-1/2 h-20 w-9 bg-white shadow-md text-gray-800 text-2xl flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next"
            className="absolute end-0 top-1/2 -translate-y-1/2 h-20 w-9 bg-white shadow-md text-gray-800 text-2xl flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            ›
          </button>
        </>
      )}
    </div>
  );
}
