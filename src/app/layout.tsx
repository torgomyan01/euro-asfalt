import './globals.scss';
import '../icons/icons.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './tailwind.css';

import { Metadata } from 'next';
import Script from 'next/script';
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
        <Script id="yandex-metrika" strategy="afterInteractive">
          {`
            (function(m,e,t,r,i,k,a){
              m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
            })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=108703433', 'ym');

            ym(108703433, 'init', {
              ssr: true,
              webvisor: true,
              clickmap: true,
              ecommerce: 'dataLayer',
              referrer: document.referrer,
              url: location.href,
              accurateTrackBounce: true,
              trackLinks: true
            });
          `}
        </Script>
        <noscript
          dangerouslySetInnerHTML={{
            __html:
              '<div><img src="https://mc.yandex.ru/watch/108703433" style="position:absolute; left:-9999px;" alt="" /></div>',
          }}
        />
        <NextTopLoader color="#f5a623" showSpinner={false} />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
