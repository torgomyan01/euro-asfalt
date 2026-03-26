import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import MainTemplate from '@/components/layout/main-template/main-template';
import { portfolio, portfolioCategories } from '@/data/portfolio';

export const metadata: Metadata = {
  title: 'Портфолио — выполненные объекты в Москве и Подмосковье | Euro-Asfalt',
  description: 'Портфолио выполненных работ по асфальтированию в Москве и Московской области. Дороги, парковки, промышленные площадки, благоустройство территорий.',
  keywords: 'портфолио асфальтирование Москва, выполненные работы асфальт Москва, примеры асфальтирования Москва',
};

export default function PortfolioPage() {
  return (
    <MainTemplate>
      <div className="py-12 md:py-16 bg-asphalt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <nav className="flex items-center gap-2 text-white/50 text-sm mb-6">
            <Link href="/" className="hover:text-accent transition-colors">Главная</Link>
            <i className="fa-solid fa-chevron-right text-xs" />
            <span className="text-white">Портфолио</span>
          </nav>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Портфолио</h1>
          <p className="text-white/60 text-lg">Выполненные объекты — лучшее подтверждение нашего качества</p>
        </div>
      </div>

      <div className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { value: '800+', label: 'Объектов' },
              { value: '12 лет', label: 'Опыта' },
              { value: '2 млн м²', label: 'Уложено' },
              { value: '3 года', label: 'Гарантия' },
            ].map((stat) => (
              <div key={stat.label} className="bg-light rounded-xl p-4 text-center">
                <div className="text-accent font-bold text-2xl md:text-3xl">{stat.value}</div>
                <div className="text-text-muted text-sm">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolio.map((item) => (
              <Link
                key={item.id}
                href={`/portfolio/${item.slug}`}
                className="group bg-white rounded-xl overflow-hidden border border-light-200 hover:shadow-md transition-shadow duration-300"
              >
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
                  <div className="absolute inset-0 bg-asphalt/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white font-semibold flex items-center gap-2">
                      <i className="fa-solid fa-eye" /> Подробнее
                    </span>
                  </div>
                  <div className="absolute top-3 left-3 bg-accent text-asphalt text-xs font-bold px-2 py-1 rounded z-10">
                    {item.category}
                  </div>
                </div>
                <div className="p-4">
                  <h2 className="text-asphalt font-bold text-base mb-2 group-hover:text-accent transition-colors duration-200">
                    {item.title}
                  </h2>
                  <p className="text-text-muted text-sm mb-3 line-clamp-2">{item.shortDescription}</p>
                  <div className="flex items-center gap-4 text-text-muted text-xs">
                    <span className="flex items-center gap-1">
                      <i className="fa-solid fa-ruler-combined text-accent" />
                      {item.area.toLocaleString('ru-RU')} м²
                    </span>
                    <span className="flex items-center gap-1">
                      <i className="fa-solid fa-location-dot text-accent" />
                      {item.city}
                    </span>
                    <span className="flex items-center gap-1">
                      <i className="fa-solid fa-calendar text-accent" />
                      {item.year}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </MainTemplate>
  );
}
