import { Metadata } from 'next';
import Link from 'next/link';
import MainTemplate from '@/components/layout/main-template/main-template';
import { contacts } from '@/data/contacts';

export const metadata: Metadata = {
  title: 'Политика конфиденциальности — Euro-Asfalt',
  description: 'Политика конфиденциальности и обработки персональных данных компании Euro-Asfalt. Асфальтирование в Москве и Московской области.',
};

const LAST_UPDATED = '01 января 2025 года';

export default function PrivacyPage() {
  return (
    <MainTemplate>
      {/* Hero */}
      <div className="py-12 md:py-16 bg-asphalt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <nav className="flex items-center gap-2 text-white/50 text-sm mb-6">
            <Link href="/" className="hover:text-accent transition-colors">Главная</Link>
            <i className="fa-solid fa-chevron-right text-xs" />
            <span className="text-white">Политика конфиденциальности</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Политика конфиденциальности</h1>
          <p className="text-white/50 text-sm">Последнее обновление: {LAST_UPDATED}</p>
        </div>
      </div>

      {/* Content */}
      <div className="py-12 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">

          <div className="bg-light rounded-2xl p-6 mb-10 flex items-start gap-4">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
              <i className="fa-solid fa-shield-halved text-accent" />
            </div>
            <div>
              <p className="text-asphalt font-semibold mb-1">Ваши данные под защитой</p>
              <p className="text-text-muted text-sm">
                {contacts.companyFull} строго соблюдает требования Федерального закона № 152-ФЗ «О персональных данных».
                Мы собираем только те данные, которые необходимы для выполнения заявок на асфальтирование и иные дорожные работы.
              </p>
            </div>
          </div>

          <div className="space-y-10 text-text text-[15px] leading-relaxed">

            <section>
              <h2 className="text-xl font-bold text-asphalt mb-3 flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-accent text-asphalt text-xs font-bold flex items-center justify-center">1</span>
                Общие положения
              </h2>
              <p>
                Настоящая Политика конфиденциальности (далее — «Политика») регулирует порядок сбора, хранения, использования
                и защиты персональных данных пользователей сайта <strong>{contacts.companyFull}</strong> (далее — «Компания», «мы»),
                осуществляющей деятельность в сфере асфальтирования, укладки асфальта, ямочного ремонта и благоустройства
                территорий в Москве и Московской области.
              </p>
              <p className="mt-3">
                Используя сайт и оставляя заявки, вы даёте согласие на обработку ваших персональных данных на условиях,
                описанных в настоящей Политике.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-asphalt mb-3 flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-accent text-asphalt text-xs font-bold flex items-center justify-center">2</span>
                Какие данные мы собираем
              </h2>
              <p className="mb-3">При заполнении форм обратной связи, калькулятора стоимости или заявки на выезд специалиста мы можем собирать:</p>
              <ul className="space-y-2">
                {[
                  { icon: 'fa-user', text: 'Имя и фамилия (для обращения к вам)' },
                  { icon: 'fa-phone', text: 'Номер телефона (для обратного звонка и согласования выезда специалиста)' },
                  { icon: 'fa-envelope', text: 'Адрес электронной почты (если указан, для отправки сметы или договора)' },
                  { icon: 'fa-location-dot', text: 'Адрес объекта (для расчёта стоимости работ и выезда бригады)' },
                  { icon: 'fa-ruler-combined', text: 'Площадь и характеристики объекта (для формирования предварительного расчёта)' },
                  { icon: 'fa-comment', text: 'Комментарий к заявке (при наличии)' },
                ].map((item) => (
                  <li key={item.icon} className="flex items-start gap-3">
                    <i className={`fa-solid ${item.icon} text-accent mt-1 w-4 shrink-0`} />
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-text-muted text-sm">
                Также автоматически могут собираться технические данные: IP-адрес, тип браузера, страницы посещений — исключительно
                в целях улучшения работы сайта (через системы веб-аналитики).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-asphalt mb-3 flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-accent text-asphalt text-xs font-bold flex items-center justify-center">3</span>
                Цели использования данных
              </h2>
              <p className="mb-3">Ваши данные используются исключительно для:</p>
              <ul className="space-y-2">
                {[
                  'Обработки заявок на асфальтирование, ямочный ремонт, укладку асфальта и смежные работы',
                  'Организации бесплатного выезда специалиста на объект для замера и оценки',
                  'Составления коммерческого предложения и сметы',
                  'Обратного звонка или переписки для уточнения деталей заказа',
                  'Отправки договора и сопроводительной документации',
                  'Улучшения качества обслуживания и сервиса компании',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <i className="fa-solid fa-circle-check text-accent mt-1 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-asphalt mb-3 flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-accent text-asphalt text-xs font-bold flex items-center justify-center">4</span>
                Передача данных третьим лицам
              </h2>
              <p className="mb-3">
                Мы не продаём и не передаём ваши персональные данные третьим лицам в коммерческих целях.
                Ограниченная передача данных возможна только в следующих случаях:
              </p>
              <ul className="space-y-2">
                {[
                  'Субподрядным организациям, привлекаемым для выполнения отдельных видов дорожных работ на вашем объекте — в объёме, необходимом для координации работ',
                  'Государственным органам — по их законному требованию в соответствии с законодательством РФ',
                  'Сервисам аналитики (Яндекс.Метрика и др.) — в обезличенном виде для статистики посещаемости',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <i className="fa-solid fa-chevron-right text-accent mt-1 text-xs shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-asphalt mb-3 flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-accent text-asphalt text-xs font-bold flex items-center justify-center">5</span>
                Хранение и защита данных
              </h2>
              <p className="mb-3">
                Персональные данные хранятся на защищённых серверах с применением современных средств шифрования.
                Доступ к данным имеют только уполномоченные сотрудники компании, непосредственно участвующие в обработке заявок.
              </p>
              <p>
                Данные хранятся в течение срока, необходимого для выполнения целей их сбора, но не более 3 лет с момента
                последнего взаимодействия, либо до момента отзыва вами согласия на обработку.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-asphalt mb-3 flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-accent text-asphalt text-xs font-bold flex items-center justify-center">6</span>
                Ваши права
              </h2>
              <p className="mb-3">В соответствии с Федеральным законом № 152-ФЗ вы вправе:</p>
              <ul className="space-y-2">
                {[
                  'Получить информацию об обработке ваших персональных данных',
                  'Потребовать уточнения, блокировки или уничтожения ваших данных',
                  'Отозвать согласие на обработку персональных данных в любой момент',
                  'Обжаловать действия или бездействие компании в Роскомнадзор',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <i className="fa-solid fa-circle-check text-accent mt-1 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-asphalt mb-3 flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-accent text-asphalt text-xs font-bold flex items-center justify-center">7</span>
                Cookies и аналитика
              </h2>
              <p>
                Сайт использует файлы cookie для корректной работы и сбора обезличенной статистики посещений.
                Cookie не содержат персональных данных и не позволяют идентифицировать вас лично.
                Вы можете отключить cookie в настройках браузера, однако это может повлиять на функциональность сайта.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-asphalt mb-3 flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-accent text-asphalt text-xs font-bold flex items-center justify-center">8</span>
                Изменения Политики
              </h2>
              <p>
                Компания оставляет за собой право вносить изменения в настоящую Политику. Актуальная версия всегда
                доступна на данной странице. При существенных изменениях мы уведомим пользователей через сайт.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-asphalt mb-3 flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-accent text-asphalt text-xs font-bold flex items-center justify-center">9</span>
                Контакты для обращений
              </h2>
              <p className="mb-4">
                По вопросам обработки персональных данных, отзыва согласия или удаления данных обращайтесь:
              </p>
              <div className="bg-light rounded-xl p-5 space-y-3">
                <div className="flex items-center gap-3">
                  <i className="fa-solid fa-building text-accent w-4" />
                  <span><strong>{contacts.companyFull}</strong></span>
                </div>
                <div className="flex items-center gap-3">
                  <i className="fa-solid fa-location-dot text-accent w-4" />
                  <span>{contacts.addressFull}</span>
                </div>
                <div className="flex items-center gap-3">
                  <i className="fa-solid fa-phone text-accent w-4" />
                  <a href={`tel:${contacts.phoneClear}`} className="hover:text-accent transition-colors">
                    {contacts.phone}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <i className="fa-solid fa-envelope text-accent w-4" />
                  <a href={`mailto:${contacts.email}`} className="hover:text-accent transition-colors">
                    {contacts.email}
                  </a>
                </div>
              </div>
            </section>

          </div>
        </div>
      </div>
    </MainTemplate>
  );
}
