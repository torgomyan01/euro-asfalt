import { contacts } from '@/data/contacts';

export default function MapSection() {
  return (
    <section className="py-16 md:py-24 bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-accent text-sm font-semibold uppercase tracking-wider mb-3">
            <i className="fa-solid fa-location-dot" />
            <span>Где мы находимся</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-asphalt mb-2">
            Контакты
          </h2>
          <p className="text-text-muted text-lg">
            Работаем по Москве и Московской области
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            {[
              {
                icon: 'fa-phone',
                title: 'Телефон',
                lines: [
                  <a
                    key="p1"
                    href={`tel:${contacts.phoneClear}`}
                    className="text-text hover:text-accent transition-colors block"
                  >
                    {contacts.phone}
                  </a>,
                  contacts.phoneSecond && (
                    <a
                      key="p2"
                      href={`tel:${contacts.phoneSecondClear}`}
                      className="text-text hover:text-accent transition-colors"
                    >
                      {contacts.phoneSecond}
                    </a>
                  ),
                ],
              },
              {
                icon: 'fa-envelope',
                title: 'Email',
                lines: [
                  <a
                    key="e1"
                    href={`mailto:${contacts.email}`}
                    className="text-text hover:text-accent transition-colors"
                  >
                    {contacts.email}
                  </a>,
                ],
              },
              {
                icon: 'fa-location-dot',
                title: 'Адрес',
                lines: [
                  <span key="a1" className="text-text">
                    {contacts.addressFull}
                  </span>,
                ],
              },
              {
                icon: 'fa-clock',
                title: 'Режим работы',
                lines: [
                  <span key="w1" className="text-text">
                    {contacts.workingHoursFull}
                  </span>,
                ],
              },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-4">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <i className={`fa-solid ${item.icon} text-accent`} />
                </div>
                <div>
                  <div className="text-asphalt font-semibold text-sm mb-1">
                    {item.title}
                  </div>
                  <div className="space-y-0.5 text-sm">
                    {item.lines.filter(Boolean)}
                  </div>
                </div>
              </div>
            ))}

            {/* Social */}
            <div className="flex items-center gap-3 pt-2">
              {contacts.social.whatsapp && (
                <a
                  href={contacts.social.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-asphalt rounded-lg flex items-center justify-center hover:bg-accent transition-colors duration-200"
                  aria-label="WhatsApp"
                >
                  <i className="fa-brands fa-whatsapp text-white hover:text-asphalt text-sm" />
                </a>
              )}
              {contacts.social.telegram && (
                <a
                  href={contacts.social.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-asphalt rounded-lg flex items-center justify-center hover:bg-accent transition-colors duration-200"
                  aria-label="Telegram"
                >
                  <i className="fa-brands fa-telegram text-white text-sm" />
                </a>
              )}
              {contacts.social.instagram && (
                <a
                  href={contacts.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-asphalt rounded-lg flex items-center justify-center hover:bg-accent transition-colors duration-200"
                  aria-label="Instagram"
                >
                  <i className="fa-brands fa-instagram text-white text-sm" />
                </a>
              )}
              {contacts.social.vk && (
                <a
                  href={contacts.social.vk}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-asphalt rounded-lg flex items-center justify-center hover:bg-accent transition-colors duration-200"
                  aria-label="ВКонтакте"
                >
                  <i className="fa-brands fa-vk text-white text-sm" />
                </a>
              )}
            </div>
          </div>

          {/* Map */}
          <div className="lg:col-span-2 rounded-xl overflow-hidden min-h-[350px]">
            <iframe
              src="https://yandex.ru/map-widget/v1/?um=constructor%3A4ab456c65a66319a31f35b27ba14d0faa36dc572c095c7c5228aa9ceb503fba5&source=constructor"
              width="100%"
              height="100%"
              style={{ minHeight: '350px', border: 0, display: 'block' }}
              title="Карта"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
