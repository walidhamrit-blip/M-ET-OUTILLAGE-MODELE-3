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
  const { lang, dir } = useLang();
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

  // Garde l'index valide si la liste de slides change (ex. slide désactivée).
  const current = Math.min(index, count - 1);
  const isRtl = dir === "rtl";
  const altOf = (s: HeroSlideView) => (lang === "ar" ? s.altAr || s.alt : s.altEn || s.alt);
  // En RTL la piste flex est disposée de droite à gauche : il faut translater
  // vers la droite (+) pour afficher les slides suivants, et vers la gauche (-) en LTR.
  const shift = isRtl ? current * 100 : -current * 100;

  return (
    <div className="relative mx-auto max-w-[1326px] px-4 mt-4">
      <div className="relative overflow-hidden rounded-sm shadow-sm bg-gray-200">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(${shift}%)` }}
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
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {slides.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`${i + 1} / ${count}`}
                className={`h-[5px] w-6 rounded-sm transition-colors ${
                  i === current ? "bg-[#e31e25]" : "bg-gray-300/80"
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
            aria-label={isRtl ? "السابق" : "Previous"}
            className="absolute start-0 top-1/2 -translate-y-1/2 h-20 w-9 bg-white shadow-md text-gray-800 text-2xl flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            {isRtl ? "›" : "‹"}
          </button>
          <button
            type="button"
            onClick={next}
            aria-label={isRtl ? "التالي" : "Next"}
            className="absolute end-0 top-1/2 -translate-y-1/2 h-20 w-9 bg-white shadow-md text-gray-800 text-2xl flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            {isRtl ? "‹" : "›"}
          </button>
        </>
      )}
    </div>
  );
}
