import { Metadata } from 'next';
import MainTemplate from '@/components/layout/main-template/main-template';
import HeroSection from '@/components/home/hero-section';
import ServicesSection from '@/components/home/services-section';
import FeaturesSection from '@/components/home/features-section';
import GallerySection from '@/components/home/gallery-section';
import CalculatorSection from '@/components/home/calculator-section';
import ReviewsSection from '@/components/home/reviews-section';
import FaqSection from '@/components/home/faq-section';
import CtaSection from '@/components/home/cta-section';
import MapSection from '@/components/home/map-section';
import { contacts } from '@/data/contacts';
import { getAverageRating, reviews } from '@/data/reviews';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Асфальтирование в Москве и Подмосковье — Euro-Asfalt | Цена от 1500 руб/м²',
  description:
    'Профессиональное асфальтирование в Москве и Московской области. Укладка асфальта, ремонт дорог, строительство парковок. Гарантия 3 года. Бесплатный выезд и замер. Звоните: ' + contacts.phone,
  keywords: [
    'асфальтирование Москва',
    'укладка асфальта Москва',
    'асфальтирование Подмосковье',
    'ремонт дорог Москва',
    'асфальтирование парковок Москва',
    'асфальтирование цена Москва',
    'укладка асфальта цена',
    'асфальтирование дорог Москва',
    'асфальтирование территорий Москва',
    'асфальтирование двора Москва',
    'ямочный ремонт Москва',
    'Euro-Asfalt',
    'Евро-Асфалт',
    'асфальт Московская область',
    'асфальтирование недорого Москва',
  ].join(', '),
  openGraph: {
    title: 'Асфальтирование в Москве и Подмосковье — Euro-Asfalt',
    description: 'Профессиональное асфальтирование дорог, парковок и площадок в Москве. Гарантия 3 года. Цена от 1500 руб/м².',
    type: 'website',
    siteName: 'Euro-Asfalt',
    locale: 'ru_RU',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Асфальтирование в Москве и Подмосковье — Euro-Asfalt',
    description: 'Профессиональное асфальтирование дорог, парковок и площадок в Москве. Гарантия 3 года.',
  },
  alternates: {
    canonical: 'https://euro-asfalt.ru',
  },
};

export default function HomePage() {
  const avgRating = getAverageRating();
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: contacts.companyFull,
    description: 'Профессиональное асфальтирование дорог, парковок и площадок в Москве и Московской области',
    url: 'https://euro-asfalt.ru',
    telephone: contacts.phone,
    email: contacts.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: contacts.address,
      addressLocality: 'Москва',
      addressRegion: 'Московская область',
      addressCountry: 'RU',
    },
    areaServed: ['Москва', 'Московская область', 'Подмосковье'],
    openingHours: 'Mo-Sa 08:00-20:00',
    priceRange: '$$',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: String(avgRating),
      reviewCount: reviews.length,
      bestRating: 5,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MainTemplate>
        <HeroSection />
        <ServicesSection />
        <FeaturesSection />
        <GallerySection />
        <CalculatorSection />
        <ReviewsSection />
        <FaqSection />
        <CtaSection />
        <MapSection />
      </MainTemplate>
    </>
  );
}
