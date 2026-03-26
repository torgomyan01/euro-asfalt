import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import MainTemplate from '@/components/layout/main-template/main-template';
import { portfolio, getPortfolioBySlug } from '@/data/portfolio';
import CtaSection from '@/components/home/cta-section';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return portfolio.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = getPortfolioBySlug(slug);
  if (!item) return {};
  return {
    title: `${item.title} — Портфолио | Euro-Asfalt`,
    description: item.shortDescription,
  };
}

export default async function PortfolioItemPage({ params }: Props) {
  const { slug } = await params;
  const item = getPortfolioBySlug(slug);
  if (!item) notFound();

  return (
    <MainTemplate>
      <div className="py-12 md:py-16 bg-asphalt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <nav className="flex items-center gap-2 text-white/50 text-sm mb-6">
            <Link href="/" className="hover:text-accent transition-colors">Главная</Link>
            <i className="fa-solid fa-chevron-right text-xs" />
            <Link href="/portfolio" className="hover:text-accent transition-colors">Портфолио</Link>
            <i className="fa-solid fa-chevron-right text-xs" />
            <span className="text-white">{item.title}</span>
          </nav>
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/30 text-accent text-sm font-medium px-3 py-1 rounded-full mb-4">
            {item.category}
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">{item.title}</h1>
          <div className="flex flex-wrap items-center gap-6 text-white/60 text-sm">
            <span className="flex items-center gap-2">
              <i className="fa-solid fa-ruler-combined text-accent" />
              {item.area.toLocaleString('ru-RU')} м²
            </span>
            <span className="flex items-center gap-2">
              <i className="fa-solid fa-location-dot text-accent" />
              {item.city}
            </span>
            <span className="flex items-center gap-2">
              <i className="fa-solid fa-calendar text-accent" />
              {item.year}
            </span>
            <span className="flex items-center gap-2">
              <i className="fa-solid fa-clock text-accent" />
              {item.duration}
            </span>
          </div>
        </div>
      </div>

      <div className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Main image */}
          {item.coverImage ? (
            <div className="relative aspect-[16/7] rounded-2xl overflow-hidden mb-6">
              <Image
                src={item.coverImage}
                alt={item.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 1280px"
              />
            </div>
          ) : (
            <div className="aspect-[16/7] bg-asphalt-700 rounded-2xl flex items-center justify-center mb-6">
              <i className="fa-solid fa-road text-asphalt-500 text-6xl" />
            </div>
          )}

          {/* Gallery — additional images */}
          {item.images.length > 1 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10">
              {item.images.slice(1).map((src, idx) => (
                <div key={idx} className="relative aspect-[4/3] rounded-xl overflow-hidden">
                  <Image
                    src={src}
                    alt={`${item.title} — фото ${idx + 2}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 50vw, 33vw"
                  />
                </div>
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-asphalt mb-4">Описание проекта</h2>
              <p className="text-text leading-relaxed text-lg mb-6">{item.description}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span key={tag} className="bg-light text-text-muted text-sm px-3 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <div className="bg-asphalt rounded-2xl p-6">
                <h3 className="text-white font-bold text-lg mb-4">Детали проекта</h3>
                <dl className="space-y-3">
                  {[
                    { label: 'Категория', value: item.category },
                    { label: 'Площадь', value: `${item.area.toLocaleString('ru-RU')} м²` },
                    { label: 'Город', value: item.city },
                    { label: 'Год', value: String(item.year) },
                    { label: 'Срок выполнения', value: item.duration },
                  ].map((d) => (
                    <div key={d.label} className="flex justify-between gap-4">
                      <dt className="text-white/50 text-sm">{d.label}</dt>
                      <dd className="text-white font-semibold text-sm text-right">{d.value}</dd>
                    </div>
                  ))}
                </dl>
                <Link
                  href="/contacts#form"
                  className="w-full bg-accent hover:bg-accent-hover text-asphalt font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200 mt-6"
                >
                  <i className="fa-solid fa-phone-flip" />
                  Заказать похожий проект
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CtaSection />
    </MainTemplate>
  );
}
