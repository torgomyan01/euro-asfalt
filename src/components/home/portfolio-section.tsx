import Link from 'next/link';
import Image from 'next/image';
import { portfolio } from '@/data/portfolio';

export default function PortfolioSection() {
  const featured = portfolio.slice(0, 6);

  return (
    <section className="py-16 md:py-24 bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-accent text-sm font-semibold uppercase tracking-wider mb-3">
              <i className="fa-solid fa-images" />
              <span>Наши работы</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-asphalt mb-2">Портфолио</h2>
            <p className="text-text-muted text-lg">Выполненные объекты — лучшее подтверждение качества</p>
          </div>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-accent font-semibold hover:underline flex-shrink-0"
          >
            Все проекты
            <i className="fa-solid fa-arrow-right text-sm" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((item) => (
            <Link
              key={item.id}
              href={`/portfolio/${item.slug}`}
              className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] bg-asphalt-700 overflow-hidden">
                {item.coverImage ? (
                  <Image
                    src={item.coverImage}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <i className="fa-solid fa-road text-asphalt-500 text-4xl" />
                  </div>
                )}
                {/* Overlay */}
                <div className="absolute inset-0 bg-asphalt/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white font-semibold flex items-center gap-2">
                    <i className="fa-solid fa-eye" />
                    Подробнее
                  </span>
                </div>
                {/* Category badge */}
                <div className="absolute top-3 left-3 bg-accent text-asphalt text-xs font-bold px-2 py-1 rounded z-10">
                  {item.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="text-asphalt font-bold text-base mb-1 group-hover:text-accent transition-colors duration-200">
                  {item.title}
                </h3>
                <div className="flex items-center gap-4 text-text-muted text-sm">
                  <span className="flex items-center gap-1">
                    <i className="fa-solid fa-ruler-combined text-xs text-accent" />
                    {item.area.toLocaleString('ru-RU')} м²
                  </span>
                  <span className="flex items-center gap-1">
                    <i className="fa-solid fa-location-dot text-xs text-accent" />
                    {item.city}
                  </span>
                  <span className="flex items-center gap-1">
                    <i className="fa-solid fa-calendar text-xs text-accent" />
                    {item.year}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
