const features = [
  {
    icon: 'fa-award',
    title: '12 лет опыта',
    description: 'Работаем с 2012 года по Москве и Подмосковью. За это время выполнили более 800 объектов различной сложности.',
  },
  {
    icon: 'fa-shield-check',
    title: 'Гарантия 3 года',
    description: 'Даём письменную гарантию на все виды асфальтирования. Устраняем дефекты бесплатно.',
  },
  {
    icon: 'fa-users',
    title: 'Собственная бригада',
    description: 'Работаем без посредников. Собственная техника и опытные специалисты.',
  },
  {
    icon: 'fa-truck-fast',
    title: 'Быстрые сроки',
    description: 'Выезжаем на замер в день обращения. Сроки выполнения работ строго по договору.',
  },
  {
    icon: 'fa-ruble-sign',
    title: 'Честные цены',
    description: 'Фиксированная смета без скрытых доплат. Работаем по договору с юридическими гарантиями.',
  },
  {
    icon: 'fa-layer-group',
    title: 'Полный цикл',
    description: 'Выполняем все работы под ключ: от проекта до сдачи объекта с подписанием акта.',
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-16 md:py-24 bg-asphalt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-accent text-sm font-semibold uppercase tracking-wider mb-3">
            <i className="fa-solid fa-circle-check" />
            <span>Наши преимущества</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Почему выбирают нас</h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Euro-Asfalt — надёжный подрядчик с проверенной репутацией
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-asphalt-800 border border-asphalt-700 rounded-xl p-6 hover:border-accent/50 transition-colors duration-300"
            >
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <i className={`fa-solid ${feature.icon} text-accent text-xl`} />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">{feature.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
