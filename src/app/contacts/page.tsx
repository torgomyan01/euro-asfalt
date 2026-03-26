import { Metadata } from 'next';
import Link from 'next/link';
import MainTemplate from '@/components/layout/main-template/main-template';
import CtaSection from '@/components/home/cta-section';
import MapSection from '@/components/home/map-section';
import { contacts } from '@/data/contacts';

export const metadata: Metadata = {
  title: 'Контакты — Euro-Asfalt | Асфальтирование в Москве и Подмосковье',
  description: `Свяжитесь с Euro-Asfalt. Телефон: ${contacts.phone}. Адрес: ${contacts.address}. Бесплатный выезд и замер по Москве и Московской области.`,
  keywords: 'контакты Euro-Asfalt, асфальтирование Москва телефон, заказать асфальтирование Москва, Euro-Asfalt Москва',
};

export default function ContactsPage() {
  return (
    <MainTemplate>
      <div className="py-12 md:py-16 bg-asphalt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <nav className="flex items-center gap-2 text-white/50 text-sm mb-6">
            <Link href="/" className="hover:text-accent transition-colors">Главная</Link>
            <i className="fa-solid fa-chevron-right text-xs" />
            <span className="text-white">Контакты</span>
          </nav>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Контакты</h1>
          <p className="text-white/60 text-lg">Свяжитесь с нами — ответим в течение 30 минут</p>
        </div>
      </div>

      <MapSection />
      <CtaSection />
    </MainTemplate>
  );
}
