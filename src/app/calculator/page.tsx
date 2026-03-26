import { Metadata } from 'next';
import Link from 'next/link';
import MainTemplate from '@/components/layout/main-template/main-template';
import CalculatorSection from '@/components/home/calculator-section';
import CtaSection from '@/components/home/cta-section';

export const metadata: Metadata = {
  title: 'Калькулятор стоимости асфальтирования в Москве — Euro-Asfalt',
  description: 'Рассчитайте стоимость асфальтирования в Москве и Подмосковье онлайн. Введите площадь и вид работ — получите предварительный расчёт за секунды.',
  keywords: 'калькулятор асфальтирования Москва, стоимость асфальта Москва онлайн, расчёт асфальтирования Москва, цена асфальтирования Подмосковье',
};

export default function CalculatorPage() {
  return (
    <MainTemplate>
      <div className="py-12 md:py-16 bg-asphalt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <nav className="flex items-center gap-2 text-white/50 text-sm mb-6">
            <Link href="/" className="hover:text-accent transition-colors">Главная</Link>
            <i className="fa-solid fa-chevron-right text-xs" />
            <span className="text-white">Калькулятор</span>
          </nav>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Калькулятор стоимости</h1>
          <p className="text-white/60 text-lg">Предварительный расчёт стоимости асфальтирования онлайн</p>
        </div>
      </div>

      <CalculatorSection />
      <CtaSection />
    </MainTemplate>
  );
}
