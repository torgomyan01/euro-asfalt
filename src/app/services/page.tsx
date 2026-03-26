import { Metadata } from 'next';
import Link from 'next/link';
import MainTemplate from '@/components/layout/main-template/main-template';
import { services } from '@/data/services';

export const metadata: Metadata = {
  title: 'Услуги по асфальтированию в Москве — Euro-Asfalt | Цены 2024',
  description: 'Полный спектр услуг по асфальтированию в Москве и Подмосковье: укладка асфальта, ремонт дорог, строительство парковок, благоустройство территорий. Цены и описание работ.',
  keywords: 'услуги асфальтирования Москва, укладка асфальта Москва, ремонт дорог Москва, асфальтирование парковок Москва, асфальтирование Подмосковье цена',
};

export default function ServicesPage() {
  return (
    <MainTemplate>
      <div className="py-12 md:py-16 bg-asphalt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <nav className="flex items-center gap-2 text-white/50 text-sm mb-6">
            <Link href="/" className="hover:text-accent transition-colors">Главная</Link>
            <i className="fa-solid fa-chevron-right text-xs" />
            <span className="text-white">Услуги</span>
          </nav>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Наши услуги</h1>
          <p className="text-white/60 text-lg max-w-2xl">
            Полный спектр работ по асфальтированию — от небольших дворов до крупных промышленных объектов
          </p>
        </div>
      </div>

      <div className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service) => (
              <Link
                key={service.id}
                href={`/services/${service.slug}`}
                className="group flex gap-6 bg-light hover:bg-asphalt border border-light-300 hover:border-accent rounded-xl p-6 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-accent/10 group-hover:bg-accent rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                  <i className={`fa-solid ${service.icon} text-accent group-hover:text-asphalt text-2xl transition-colors duration-300`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-asphalt group-hover:text-white font-bold text-xl mb-2 transition-colors duration-300">
                    {service.title}
                  </h2>
                  <p className="text-text-muted group-hover:text-white/70 text-sm leading-relaxed mb-3 transition-colors duration-300">
                    {service.shortDescription}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-accent font-bold text-sm">
                      от {service.priceFrom.toLocaleString('ru-RU')} {service.priceUnit}
                    </span>
                    <span className="text-accent text-sm flex items-center gap-1 group-hover:translate-x-1 transition-transform duration-200">
                      Подробнее <i className="fa-solid fa-arrow-right text-xs" />
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
