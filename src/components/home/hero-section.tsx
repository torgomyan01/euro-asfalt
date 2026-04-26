import Link from 'next/link';
import { contacts } from '@/data/contacts';

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-asphalt overflow-hidden">
      {/* Background video */}
      <div className="absolute inset-0">
        <video
          className="w-full h-full object-cover object-center"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/hero-bg.jpg"
          aria-label="Асфальтирование в Москве"
        >
          <source src="/videos/asphalt-work.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay so text stays readable */}
        <div className="absolute inset-0 bg-asphalt/65" />
      </div>

      {/* Accent line */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/30 text-accent text-sm font-medium px-4 py-2 rounded-full mb-6">
            <i className="fa-solid fa-road text-xs" />
            <span>Профессиональное асфальтирование</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
            Асфальтирование{' '}
            <span className="text-accent">в Москве</span>{' '}
            и Подмосковье
          </h1>

          <p className="text-white/70 text-lg md:text-xl leading-relaxed mb-8 max-w-2xl">
            Укладка асфальта, строительство дорог и парковок, благоустройство территорий.
            Работаем с 2012 года по Москве и Московской области. Гарантия 3 года на все виды работ.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-6 mb-10">
            {[
              { value: '800+', label: 'объектов' },
              { value: '12 лет', label: 'опыта' },
              { value: '3 года', label: 'гарантия' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-accent font-bold text-2xl md:text-3xl">{stat.value}</div>
                <div className="text-white/50 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/contacts#form"
              className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-asphalt font-bold text-base px-8 py-4 rounded transition-colors duration-200"
            >
              <i className="fa-solid fa-phone-flip" />
              Получить расчёт
            </Link>
            <Link
              href="/calculator"
              className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white/30 hover:border-accent text-white hover:text-accent font-semibold text-base px-8 py-4 rounded transition-colors duration-200"
            >
              <i className="fa-solid fa-calculator" />
              Калькулятор стоимости
            </Link>
          </div>

          {/* Phone */}
          <div className="mt-8 flex items-center gap-3">
            <a
              href={`tel:${contacts.phoneClear}`}
              className="flex items-center gap-2 text-white/60 hover:text-white transition-colors duration-200"
            >
              <i className="fa-solid fa-phone text-accent" />
              <span className="text-lg font-semibold">{contacts.phone}</span>
            </a>
            <span className="text-white/30">|</span>
            <span className="text-white/50 text-sm">{contacts.workingHours}</span>
          </div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
