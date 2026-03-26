import './globals.scss';
import '../icons/icons.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './tailwind.css';

import { Metadata } from 'next';
import NextTopLoader from 'nextjs-toploader';
import { Providers } from '@/app/providers';

export const metadata: Metadata = {
  metadataBase: new URL('https://euro-asfalt.ru'),
  title: {
    default: 'Асфальтирование в Москве — Euro-Asfalt | Цена от 1500 руб/м²',
    template: '%s | Euro-Asfalt Москва',
  },
  description: 'Профессиональное асфальтирование дорог, парковок и площадок в Москве и Подмосковье. Гарантия 3 года. Бесплатный выезд и замер. Работаем с 2012 года.',
  keywords: 'асфальтирование Москва, укладка асфальта Москва, ремонт дорог Москва, асфальтирование Подмосковье, Euro-Asfalt, Евро-Асфалт, асфальтирование цена',
  authors: [{ name: 'Euro-Asfalt' }],
  creator: 'Euro-Asfalt',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    siteName: 'Euro-Asfalt',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning={true} className="light">
      <body className="text-foreground bg-background">
        <NextTopLoader color="#f5a623" showSpinner={false} />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
