import { Metadata } from 'next';
import MainTemplate from '@/components/layout/main-template/main-template';
import HomeNewsSection from '@/components/home/home-news-section';
import CtaSection from '@/components/home/cta-section';
import BruschatkaServiceView from '@/components/services/bruschatka-service-view';
import { bruschatkaFaq } from '@/data/bruschatka-faq';

export const metadata: Metadata = {
  title:
    'Укладка брусчатки и тротуарной плитки в Москве и Подмосковье — цена от 1200 ₽/м² | Euro-Asfalt',
  description:
    'Профессиональная укладка брусчатки и тротуарной плитки под ключ в Москве и Московской области: дворы, парковки, дорожки, бордюры. Песчано-щебёночное основание, гарантия 3 года. Онлайн-калькулятор и фото работ.',
  keywords: [
    'укладка брусчатки Москва',
    'укладка брусчатки Подмосковье',
    'тротуарная плитка укладка цена',
    'укладка тротуарной плитки под ключ',
    'мощение брусчаткой Москва',
    'брусчатка для парковки',
    'укладка брусчатки цена за м2',
    'тротуарная плитка Москва',
    'благоустройство двор брусчатка',
  ],
  openGraph: {
    title: 'Укладка брусчатки и тротуарной плитки — Euro-Asfalt',
    description:
      'Укладка брусчатки и тротуарной плитки в Москве и Подмосковье. Гарантия 3 года, калькулятор стоимости.',
    type: 'website',
  },
};

export default function UkladkaBruschatkiPage() {
  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Укладка брусчатки и тротуарной плитки',
    description:
      'Укладка брусчатки и тротуарной плитки под ключ в Москве и Московской области: подготовка основания, бордюры, гарантия 3 года.',
    provider: {
      '@type': 'LocalBusiness',
      name: 'Euro-Asfalt',
      areaServed: { '@type': 'AdministrativeArea', name: 'Москва и Московская область' },
    },
    offers: {
      '@type': 'Offer',
      price: '1200',
      priceCurrency: 'RUB',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: '1200',
        unitText: 'руб/м²',
      },
    },
  };

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: bruschatkaFaq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <MainTemplate>
        <BruschatkaServiceView />
        <HomeNewsSection />
        <CtaSection />
      </MainTemplate>
    </>
  );
}
