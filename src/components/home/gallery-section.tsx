'use client';

import { useState } from 'react';
import Image from 'next/image';

const images = Array.from({ length: 70 }, (_, i) => ({
  src: `/images/gallery/g-${String(i + 1).padStart(2, '0')}.jpeg`,
  alt: `Асфальтирование — фото ${i + 1}`,
}));

const INITIAL_COUNT = 12;

export default function GallerySection() {
  const [visible, setVisible] = useState(INITIAL_COUNT);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const shown = images.slice(0, visible);

  function prev() {
    setLightbox((n) => (n !== null ? (n - 1 + images.length) % images.length : null));
  }
  function next() {
    setLightbox((n) => (n !== null ? (n + 1) % images.length : null));
  }

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-accent text-sm font-semibold uppercase tracking-wider mb-3">
            <i className="fa-solid fa-images" />
            <span>Наши работы</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-asphalt mb-3">Фотогалерея</h2>
          <p className="text-text-muted text-lg max-w-xl mx-auto">
            Реальные объекты — дороги, парковки, промышленные площадки
          </p>
        </div>

        {/* Grid */}
        <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3">
          {shown.map((img, idx) => (
            <div
              key={img.src}
              className="break-inside-avoid relative overflow-hidden rounded-xl cursor-pointer group"
              onClick={() => setLightbox(idx)}
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={600}
                height={400}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              <div className="absolute inset-0 bg-asphalt/0 group-hover:bg-asphalt/40 transition-colors duration-300 flex items-center justify-center">
                <i className="fa-solid fa-magnifying-glass-plus text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          ))}
        </div>

        {/* Load more */}
        {visible < images.length && (
          <div className="text-center mt-10">
            <button
              onClick={() => setVisible((v) => Math.min(v + 12, images.length))}
              className="inline-flex items-center gap-2 bg-asphalt hover:bg-asphalt/80 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200"
            >
              <i className="fa-solid fa-plus" />
              Показать ещё ({images.length - visible} фото)
            </button>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          {/* Close */}
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white text-3xl z-10"
            onClick={() => setLightbox(null)}
          >
            <i className="fa-solid fa-xmark" />
          </button>

          {/* Prev */}
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-3xl z-10 w-12 h-12 flex items-center justify-center"
            onClick={(e) => { e.stopPropagation(); prev(); }}
          >
            <i className="fa-solid fa-chevron-left" />
          </button>

          {/* Image */}
          <div
            className="relative max-w-5xl max-h-[85vh] w-full h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[lightbox].src}
              alt={images[lightbox].alt}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>

          {/* Next */}
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-3xl z-10 w-12 h-12 flex items-center justify-center"
            onClick={(e) => { e.stopPropagation(); next(); }}
          >
            <i className="fa-solid fa-chevron-right" />
          </button>

          {/* Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50 text-sm">
            {lightbox + 1} / {images.length}
          </div>
        </div>
      )}
    </section>
  );
}
