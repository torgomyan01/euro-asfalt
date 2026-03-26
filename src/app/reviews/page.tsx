import { Metadata } from 'next';
import Link from 'next/link';
import MainTemplate from '@/components/layout/main-template/main-template';
import { reviews, getAverageRating } from '@/data/reviews';
import CtaSection from '@/components/home/cta-section';

export const metadata: Metadata = {
  title: 'Отзывы клиентов об асфальтировании в Москве — Euro-Asfalt',
  description: 'Отзывы клиентов об асфальтировании в Москве и Подмосковье от Euro-Asfalt. Реальные отзывы о качестве работ, сроках и ценах.',
  keywords: 'отзывы Euro-Asfalt Москва, отзывы об асфальтировании Москва, клиенты Euro-Asfalt, асфальтирование Москва отзывы',
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <i key={star} className={`fa-solid fa-star text-sm ${star <= rating ? 'text-accent' : 'text-light-300'}`} />
      ))}
    </div>
  );
}

export default function ReviewsPage() {
  const avg = getAverageRating();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Euro-Asfalt',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: avg,
      reviewCount: reviews.length,
      bestRating: 5,
    },
    review: reviews.map((r) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: r.name },
      reviewRating: { '@type': 'Rating', ratingValue: r.rating },
      reviewBody: r.text,
      datePublished: r.date,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <MainTemplate>
        <div className="py-12 md:py-16 bg-asphalt">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <nav className="flex items-center gap-2 text-white/50 text-sm mb-6">
              <Link href="/" className="hover:text-accent transition-colors">Главная</Link>
              <i className="fa-solid fa-chevron-right text-xs" />
              <span className="text-white">Отзывы</span>
            </nav>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Отзывы клиентов</h1>
            <div className="flex items-center gap-4">
              <StarRating rating={Math.round(avg)} />
              <span className="text-accent font-bold text-2xl">{avg}</span>
              <span className="text-white/50">из 5 ({reviews.length} отзывов)</span>
            </div>
          </div>
        </div>

        <div className="py-12 md:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reviews.map((review) => (
                <div key={review.id} className="bg-light rounded-xl p-6">
                  <StarRating rating={review.rating} />
                  <p className="text-text text-base leading-relaxed mt-3 mb-5">&ldquo;{review.text}&rdquo;</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-light-200">
                    <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <i className="fa-solid fa-user text-accent text-sm" />
                    </div>
                    <div className="flex-1">
                      <div className="text-asphalt font-semibold text-sm">{review.name}</div>
                      {review.company && <div className="text-text-muted text-xs">{review.company}</div>}
                    </div>
                    <div className="text-text-light text-xs">
                      {new Date(review.date).toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <CtaSection />
      </MainTemplate>
    </>
  );
}
