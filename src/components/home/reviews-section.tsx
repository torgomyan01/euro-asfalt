'use client';

import { useState } from 'react';
import Link from 'next/link';
import { reviews, getAverageRating } from '@/data/reviews';

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <i
          key={star}
          className={`fa-solid fa-star text-sm ${star <= rating ? 'text-accent' : 'text-light-300'}`}
        />
      ))}
    </div>
  );
}

export default function ReviewsSection() {
  const [current, setCurrent] = useState(0);
  const avg = getAverageRating();
  const perPage = 3;
  const pages = Math.ceil(reviews.length / perPage);
  const visible = reviews.slice(current * perPage, current * perPage + perPage);

  return (
    <section className="py-16 md:py-24 bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-accent text-sm font-semibold uppercase tracking-wider mb-3">
              <i className="fa-solid fa-star" />
              <span>Что говорят клиенты</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-asphalt mb-2">Отзывы</h2>
            <div className="flex items-center gap-3">
              <StarRating rating={Math.round(avg)} />
              <span className="text-asphalt font-bold text-lg">{avg}</span>
              <span className="text-text-muted text-sm">({reviews.length} отзывов)</span>
            </div>
          </div>
          <Link
            href="/reviews"
            className="inline-flex items-center gap-2 text-accent font-semibold hover:underline flex-shrink-0"
          >
            Все отзывы
            <i className="fa-solid fa-arrow-right text-sm" />
          </Link>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {visible.map((review) => (
            <div key={review.id} className="bg-white rounded-xl p-6 shadow-sm">
              {/* Rating */}
              <StarRating rating={review.rating} />

              {/* Text */}
              <p className="text-text text-sm leading-relaxed mt-3 mb-4 line-clamp-4">
                &ldquo;{review.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-light-200">
                <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="fa-solid fa-user text-accent text-sm" />
                </div>
                <div>
                  <div className="text-asphalt font-semibold text-sm">{review.name}</div>
                  {review.company && (
                    <div className="text-text-muted text-xs">{review.company}</div>
                  )}
                </div>
                <div className="ml-auto text-text-light text-xs">
                  {new Date(review.date).toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' })}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {pages > 1 && (
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => setCurrent((p) => Math.max(0, p - 1))}
              disabled={current === 0}
              className="w-9 h-9 rounded-lg border border-light-300 flex items-center justify-center text-text-muted hover:border-accent hover:text-accent disabled:opacity-40 transition-colors"
            >
              <i className="fa-solid fa-angle-left text-sm" />
            </button>
            {Array.from({ length: pages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-9 h-9 rounded-lg border text-sm font-semibold transition-colors ${
                  i === current
                    ? 'bg-accent border-accent text-asphalt'
                    : 'border-light-300 text-text-muted hover:border-accent hover:text-accent'
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrent((p) => Math.min(pages - 1, p + 1))}
              disabled={current === pages - 1}
              className="w-9 h-9 rounded-lg border border-light-300 flex items-center justify-center text-text-muted hover:border-accent hover:text-accent disabled:opacity-40 transition-colors"
            >
              <i className="fa-solid fa-angle-right text-sm" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
