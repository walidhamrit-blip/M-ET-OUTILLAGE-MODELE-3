"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

const SLIDES = [
  { image: "/images/hero1.jpg", href: "/categorie/outillage-electro", alt: "Méga promo outillage" },
  { image: "/images/hero2.jpg", href: "/categorie/gros-oeuvre", alt: "Livraison gratuite à Tripoli" },
  { image: "/images/hero3.jpg", href: "/categorie/peinture-finition", alt: "Peinture et finition" },
];

export function HeroCarousel() {
  const [index, setIndex] = useState(0);

  const next = useCallback(() => setIndex((i) => (i + 1) % SLIDES.length), []);
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + SLIDES.length) % SLIDES.length),
    []
  );

  useEffect(() => {
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [next, index]);

  return (
    <div className="relative mx-auto max-w-[1326px] px-4 mt-4">
      <div className="relative overflow-hidden rounded-sm shadow-sm bg-gray-100">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {SLIDES.map((s) => (
            <Link key={s.image} href={s.href} className="w-full shrink-0 block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={s.image}
                alt={s.alt}
                className="w-full h-[220px] sm:h-[320px] md:h-[420px] object-cover"
              />
            </Link>
          ))}
        </div>

        {/* Dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Slide ${i + 1}`}
              className={`h-[5px] w-6 rounded-sm transition-colors ${
                i === index ? "bg-[#e31e25]" : "bg-gray-300/80"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Side arrows — square white buttons on the edges */}
      <button
        onClick={prev}
        aria-label="Précédent"
        className="absolute left-0 top-1/2 -translate-y-1/2 h-20 w-9 bg-white shadow-md text-gray-800 text-2xl flex items-center justify-center hover:bg-gray-50 transition-colors"
      >
        ‹
      </button>
      <button
        onClick={next}
        aria-label="Suivant"
        className="absolute right-0 top-1/2 -translate-y-1/2 h-20 w-9 bg-white shadow-md text-gray-800 text-2xl flex items-center justify-center hover:bg-gray-50 transition-colors"
      >
        ›
      </button>
    </div>
  );
}
