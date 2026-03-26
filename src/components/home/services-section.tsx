import Link from 'next/link';
import { services } from '@/data/services';

export default function ServicesSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-accent text-sm font-semibold uppercase tracking-wider mb-3">
            <i className="fa-solid fa-gear" />
            <span>Что мы делаем</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-asphalt mb-4">Наши услуги</h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            Полный спектр работ по асфальтированию — от небольших дворов до крупных промышленных объектов
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Link
              key={service.id}
              href={`/services/${service.slug}`}
              className="group bg-light hover:bg-asphalt border border-light-300 hover:border-accent rounded-xl p-6 transition-all duration-300"
            >
              {/* Icon */}
              <div className="w-12 h-12 bg-accent/10 group-hover:bg-accent rounded-lg flex items-center justify-center mb-4 transition-colors duration-300">
                <i className={`fa-solid ${service.icon} text-accent group-hover:text-asphalt text-xl transition-colors duration-300`} />
              </div>

              {/* Title */}
              <h3 className="text-asphalt group-hover:text-white font-bold text-lg mb-2 transition-colors duration-300">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-text-muted group-hover:text-white/70 text-sm leading-relaxed mb-4 transition-colors duration-300">
                {service.shortDescription}
              </p>

              {/* Price */}
              <div className="flex items-center justify-between">
                <span className="text-accent font-bold text-sm">
                  от {service.priceFrom.toLocaleString('ru-RU')} {service.priceUnit}
                </span>
                <i className="fa-solid fa-arrow-right text-accent text-sm group-hover:translate-x-1 transition-transform duration-200" />
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 border-2 border-asphalt hover:bg-asphalt text-asphalt hover:text-white font-semibold px-8 py-3 rounded transition-all duration-200"
          >
            Все услуги
            <i className="fa-solid fa-arrow-right text-sm" />
          </Link>
        </div>
      </div>
    </section>
  );
}
