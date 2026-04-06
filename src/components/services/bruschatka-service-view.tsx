'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import BruschatkaCalculatorForm from '@/components/services/bruschatka-calculator-form';
import { getBruschatkaGalleryPaths } from '@/data/bruschatka-gallery';
import { bruschatkaFaq } from '@/data/bruschatka-faq';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.45 },
};

function FaqBlock() {
  return (
    <div className="space-y-3">
      {bruschatkaFaq.map((item, i) => (
        <motion.div
          key={item.q}
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: i * 0.04 }}
          className="group bg-white rounded-xl border border-light-200 overflow-hidden shadow-sm"
        >
          <details className="open:[&_summary_.fa-chevron-down]:rotate-180">
            <summary className="cursor-pointer list-none px-5 py-4 font-semibold text-asphalt flex items-center justify-between gap-4">
              <span>{item.q}</span>
              <i className="fa-solid fa-chevron-down text-accent shrink-0 transition-transform duration-200" />
            </summary>
            <div className="px-5 pb-4 text-text-muted text-sm leading-relaxed border-t border-light-200 pt-3">
              {item.a}
            </div>
          </details>
        </motion.div>
      ))}
    </div>
  );
}

export default function BruschatkaServiceView() {
  const gallery = getBruschatkaGalleryPaths();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-asphalt">
        <div className="absolute inset-0 opacity-30">
          <Image
            src="/images/bruschatka/bruschatka-01.jpg"
            alt="Укладка брусчатки и тротуарной плитки в Москве"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-asphalt via-asphalt/90 to-asphalt/70" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24">
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-white/50 text-sm mb-8"
          >
            <Link href="/" className="hover:text-accent transition-colors">
              Главная
            </Link>
            <i className="fa-solid fa-chevron-right text-xs" />
            <Link href="/services" className="hover:text-accent transition-colors">
              Услуги
            </Link>
            <i className="fa-solid fa-chevron-right text-xs" />
            <span className="text-white">Укладка брусчатки</span>
          </motion.nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 text-accent text-sm font-semibold uppercase tracking-wider mb-4">
              <i className="fa-solid fa-border-all" />
              Москва и Московская область
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Укладка брусчатки и тротуарной плитки под ключ
            </h1>
            <p className="text-white/75 text-lg md:text-xl mb-8 leading-relaxed">
              Профессиональное мощение брусчаткой и тротуарной плиткой для дворов, парковок, садовых дорожек и
              придомовых территорий. Подготовка основания, бордюры, гарантия 3 года —{' '}
              <strong className="text-white">той же бригадой Euro-Asfalt</strong>.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#calculator"
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-asphalt font-bold px-6 py-3 rounded-lg transition-colors"
              >
                <i className="fa-solid fa-calculator" />
                Калькулятор стоимости
              </a>
              <a
                href="#gallery"
                className="inline-flex items-center gap-2 border border-white/30 hover:border-accent text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                <i className="fa-solid fa-images" />
                Примеры работ
              </a>
            </div>
            <p className="text-accent font-bold text-xl mt-8">от 1 200 ₽/м²</p>
            <p className="text-white/45 text-sm">* ориентировочная цена работ; итог — после замера</p>
          </motion.div>
        </div>
      </section>

      {/* SEO intro */}
      <section className="py-14 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.article {...fadeUp} className="prose prose-lg max-w-none">
              <h2 className="text-2xl md:text-3xl font-bold text-asphalt not-prose mb-6">
                Укладка брусчатки: технология и опыт команды
              </h2>
              <p className="text-text leading-relaxed mb-4">
                Мы выполняем полный цикл работ по укладке брусчатки и тротуарной плитки в Москве и Московской области:
                разметка площадки, снятие растительного слоя, устройство песчано-щебёночного основания, укладка элементов
                по выбранному рисунку, подрезка, заполнение швов песком или смесью, установка бордюрного камня.
              </p>
              <p className="text-text leading-relaxed mb-4">
                Работаем с виброплитой и контролем уклонов для водоотвода — это продлевает срок службы мощения и
                предотвращает размыв песка из швов. На объекты выезжает бригада с опытом дорожных и благоустроительных
                работ Euro-Asfalt.
              </p>
              <h3 className="text-xl font-bold text-asphalt not-prose mt-8 mb-3">
                Где применяют брусчатку и тротуарную плитку
              </h3>
              <ul className="list-none space-y-2 text-text not-prose">
                {[
                  'Въезды и стоянки частных домов',
                  'Парковки и площадки у бизнес-объектов',
                  'Садовые и пешеходные дорожки',
                  'Террасы, крыльца, зоны отдыха',
                  'Благоустройство придомовой территории',
                ].map((t) => (
                  <li key={t} className="flex gap-2">
                    <i className="fa-solid fa-check text-accent mt-1 shrink-0" />
                    {t}
                  </li>
                ))}
              </ul>
            </motion.article>

            <motion.div {...fadeUp} className="lg:sticky lg:top-28" id="calculator">
              <BruschatkaCalculatorForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-14 md:py-20 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.h2
            {...fadeUp}
            className="text-2xl md:text-3xl font-bold text-asphalt text-center mb-12"
          >
            Этапы работ по укладке брусчатки
          </motion.h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                n: 1,
                t: 'Выезд и замер',
                d: 'Бесплатный осмотр объекта, замер площадей, согласование рисунка укладки и сметы',
                i: 'fa-ruler-combined',
              },
              {
                n: 2,
                t: 'Подготовка основания',
                d: 'Планировка, песчано-щебёночная «подушка», уплотнение, при необходимости геотекстиль',
                i: 'fa-layer-group',
              },
              {
                n: 3,
                t: 'Укладка',
                d: 'Укладка брусчатки или плитки с соблюдением швов и уклонов, подрезка элементов',
                i: 'fa-border-all',
              },
              {
                n: 4,
                t: 'Финиш',
                d: 'Заполнение швов, виброуплотнение, установка бордюров, приёмка и гарантия 3 года',
                i: 'fa-circle-check',
              },
            ].map((step, idx) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="bg-white rounded-2xl p-6 border border-light-200 shadow-sm"
              >
                <div className="w-12 h-12 rounded-full bg-accent/15 flex items-center justify-center mb-4">
                  <i className={`fa-solid ${step.i} text-accent text-xl`} />
                </div>
                <div className="text-accent font-bold text-sm mb-1">Шаг {step.n}</div>
                <h3 className="text-asphalt font-bold text-lg mb-2">{step.t}</h3>
                <p className="text-text-muted text-sm leading-relaxed">{step.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="py-14 md:py-20 bg-white scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div {...fadeUp} className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-asphalt mb-3">Наши работы: брусчатка и плитка</h2>
            <p className="text-text-muted max-w-2xl mx-auto">
              Реальные объекты в Москве и Подмосковье — укладка брусчатки, тротуарной плитки, благоустройство дворов и
              дорожек.
            </p>
          </motion.div>
          <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
            {gallery.map((src, idx) => (
              <motion.div
                key={src}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '0px 0px -40px 0px' }}
                transition={{ duration: 0.35, delay: (idx % 8) * 0.02 }}
                className="break-inside-avoid rounded-xl overflow-hidden border border-light-200 shadow-sm relative aspect-[4/3]"
              >
                <Image
                  src={src}
                  alt={`Укладка брусчатки и тротуарной плитки — пример ${idx + 1}`}
                  fill
                  className="object-cover hover:scale-[1.02] transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ + keywords paragraph */}
      <section className="py-14 md:py-20 bg-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.h2 {...fadeUp} className="text-2xl md:text-3xl font-bold text-asphalt text-center mb-4">
            Вопросы об укладке брусчатки и тротуарной плитки
          </motion.h2>
          <motion.p {...fadeUp} className="text-text-muted text-center text-sm mb-10 max-w-2xl mx-auto">
            Укладка брусчатки цена Москва, тротуарная плитка под ключ, мощение двора, брусчатка для парковки — ответы на
            частые вопросы ниже.
          </motion.p>
          <FaqBlock />
        </div>
      </section>
    </>
  );
}
