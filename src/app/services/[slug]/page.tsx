import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import MainTemplate from '@/components/layout/main-template/main-template';
import { services, getServiceBySlug } from '@/data/services';
import CtaSection from '@/components/home/cta-section';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return services.filter((s) => s.slug !== 'ukladka-bruschatki').map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: service.seoTitle,
    description: service.seoDescription,
    keywords: service.keywords.join(', '),
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.description,
    provider: { '@type': 'LocalBusiness', name: 'Euro-Asfalt' },
    offers: {
      '@type': 'Offer',
      price: service.priceFrom,
      priceCurrency: 'RUB',
      priceSpecification: { '@type': 'UnitPriceSpecification', price: service.priceFrom, unitText: service.priceUnit },
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <MainTemplate>
        {/* Hero */}
        <div className="py-12 md:py-16 bg-asphalt">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <nav className="flex items-center gap-2 text-white/50 text-sm mb-6">
              <Link href="/" className="hover:text-accent transition-colors">Главная</Link>
              <i className="fa-solid fa-chevron-right text-xs" />
              <Link href="/services" className="hover:text-accent transition-colors">Услуги</Link>
              <i className="fa-solid fa-chevron-right text-xs" />
              <span className="text-white">{service.title}</span>
            </nav>
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <i className={`fa-solid ${service.icon} text-accent text-3xl`} />
              </div>
              <div>
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">{service.title}</h1>
                <div className="text-accent font-bold text-xl">
                  от {service.priceFrom.toLocaleString('ru-RU')} {service.priceUnit}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="py-12 md:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main */}
              <div className="lg:col-span-2">
                <p className="text-text text-lg leading-relaxed mb-8">{service.description}</p>

                {/* Features */}
                <h2 className="text-2xl font-bold text-asphalt mb-4">Что входит в услугу</h2>
                <ul className="space-y-2 mb-10">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-text">
                      <i className="fa-solid fa-circle-check text-accent flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* Process */}
                <h2 className="text-2xl font-bold text-asphalt mb-6">Этапы работ</h2>
                <div className="space-y-4">
                  {service.process.map((step) => (
                    <div key={step.step} className="flex gap-4">
                      <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center flex-shrink-0 font-bold text-asphalt text-sm">
                        {step.step}
                      </div>
                      <div className="pt-1">
                        <div className="text-asphalt font-bold mb-1">{step.title}</div>
                        <div className="text-text-muted text-sm">{step.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sidebar */}
              <div>
                <div className="bg-asphalt rounded-2xl p-6 sticky top-24">
                  <h3 className="text-white font-bold text-xl mb-4">Заказать услугу</h3>
                  <div className="text-accent font-bold text-2xl mb-2">
                    от {service.priceFrom.toLocaleString('ru-RU')} {service.priceUnit}
                  </div>
                  <p className="text-white/60 text-sm mb-6">Точная стоимость — после бесплатного выезда специалиста</p>
                  <Link
                    href="/contacts#form"
                    className="w-full bg-accent hover:bg-accent-hover text-asphalt font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200 mb-3"
                  >
                    <i className="fa-solid fa-phone-flip" />
                    Оставить заявку
                  </Link>
                  <Link
                    href="/calculator"
                    className="w-full border border-white/30 hover:border-accent text-white hover:text-accent font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200"
                  >
                    <i className="fa-solid fa-calculator" />
                    Калькулятор
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <CtaSection />
      </MainTemplate>
    </>
  );
}
