import Link from 'next/link';
import { contacts } from '@/data/contacts';

const serviceLinks = [
  { href: '/services/ukladka-asfalta', label: 'Укладка асфальта' },
  { href: '/services/asfaltovanie-parkovok', label: 'Асфальтирование парковок' },
  { href: '/services/remont-dorog', label: 'Ремонт дорог' },
  { href: '/services/ukladka-asfaltovoy-kroshki', label: 'Асфальтовая крошка (ШМА)' },
  { href: '/services/blagoustrojstvo-territorij', label: 'Благоустройство' },
  { href: '/services/ukladka-bruschatki', label: 'Укладка брусчатки' },
  { href: '/services/promyshlennye-ploshadki', label: 'Промышленные площадки' },
  { href: '/services/dorozhnaya-razmetka', label: 'Дорожная разметка' },
];

const companyLinks = [
  { href: '/portfolio', label: 'Портфолио' },
  { href: '/reviews', label: 'Отзывы' },
  { href: '/blog', label: 'Блог' },
  { href: '/calculator', label: 'Калькулятор' },
  { href: '/contacts', label: 'Контакты' },
  { href: '/privacy', label: 'Политика конфиденциальности' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-asphalt text-white">
      {/* Top section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-accent rounded flex items-center justify-center flex-shrink-0">
                <i className="fa-solid fa-road text-asphalt text-base" />
              </div>
              <div className="leading-tight">
                <div className="text-white font-bold text-lg leading-none">Euro-Asfalt</div>
                <div className="text-accent text-xs leading-none">Евро-Асфалт</div>
              </div>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-4">
              Профессиональное асфальтирование дорог, парковок и территорий в Москве и Подмосковье. Работаем с 2012 года.
            </p>
            {/* Social */}
            <div className="flex items-center gap-3">
              {contacts.social.whatsapp && (
                <a
                  href={contacts.social.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 bg-asphalt-700 hover:bg-accent rounded flex items-center justify-center transition-colors duration-200"
                  aria-label="WhatsApp"
                >
                  <i className="fa-brands fa-whatsapp text-sm" />
                </a>
              )}
              {contacts.social.telegram && (
                <a
                  href={contacts.social.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 bg-asphalt-700 hover:bg-accent rounded flex items-center justify-center transition-colors duration-200"
                  aria-label="Telegram"
                >
                  <i className="fa-brands fa-telegram text-sm" />
                </a>
              )}
              {contacts.social.instagram && (
                <a
                  href={contacts.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 bg-asphalt-700 hover:bg-accent rounded flex items-center justify-center transition-colors duration-200"
                  aria-label="Instagram"
                >
                  <i className="fa-brands fa-instagram text-sm" />
                </a>
              )}
              {contacts.social.vk && (
                <a
                  href={contacts.social.vk}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 bg-asphalt-700 hover:bg-accent rounded flex items-center justify-center transition-colors duration-200"
                  aria-label="ВКонтакте"
                >
                  <i className="fa-brands fa-vk text-sm" />
                </a>
              )}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Услуги</h3>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-accent text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Компания</h3>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-accent text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Контакты</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`tel:${contacts.phoneClear}`}
                  className="flex items-start gap-2 text-white/60 hover:text-accent text-sm transition-colors duration-200"
                >
                  <i className="fa-solid fa-phone text-accent mt-0.5 flex-shrink-0" />
                  <span>{contacts.phone}</span>
                </a>
              </li>
              {contacts.phoneSecond && (
                <li>
                  <a
                    href={`tel:${contacts.phoneSecondClear}`}
                    className="flex items-start gap-2 text-white/60 hover:text-accent text-sm transition-colors duration-200"
                  >
                    <i className="fa-solid fa-phone text-accent mt-0.5 flex-shrink-0" />
                    <span>{contacts.phoneSecond}</span>
                  </a>
                </li>
              )}
              <li>
                <a
                  href={`mailto:${contacts.email}`}
                  className="flex items-start gap-2 text-white/60 hover:text-accent text-sm transition-colors duration-200"
                >
                  <i className="fa-solid fa-envelope text-accent mt-0.5 flex-shrink-0" />
                  <span>{contacts.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-2 text-white/60 text-sm">
                <i className="fa-solid fa-location-dot text-accent mt-0.5 flex-shrink-0" />
                <span>{contacts.address}</span>
              </li>
              <li className="flex items-start gap-2 text-white/60 text-sm">
                <i className="fa-solid fa-clock text-accent mt-0.5 flex-shrink-0" />
                <span>{contacts.workingHours}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-asphalt-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-white/40 text-xs">
            © {year} {contacts.companyFull}. Все права защищены.
          </p>
          <p className="text-white/40 text-xs">
            Асфальтирование в Москве и Московской области
          </p>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-4 text-center">
          <p className="text-white/40 text-xs">
            Сайт создан и поддерживается{' '}
            <a
              href="https://torgomyan-studio.am/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-accent transition-colors duration-200"
            >
              TorgomyanStudio
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
