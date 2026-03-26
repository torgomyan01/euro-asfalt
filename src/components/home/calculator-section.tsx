'use client';

import { useState } from 'react';
import { InputMask } from '@react-input/mask';
import { calculatePrice, type CalculatorResult } from '@/app/actions/calculator';
import { submitContactForm } from '@/app/actions/contact';
import { services } from '@/data/services';

export default function CalculatorSection() {
  const [serviceSlug, setServiceSlug] = useState('ukladka-asfalta');
  const [area, setArea] = useState('');
  const [hasOldCovering, setHasOldCovering] = useState(false);
  const [needsBase, setNeedsBase] = useState(false);
  const [needsMarkup, setNeedsMarkup] = useState(false);
  const [result, setResult] = useState<CalculatorResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [orderName, setOrderName] = useState('');
  const [orderPhone, setOrderPhone] = useState('');
  const [orderLoading, setOrderLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderError, setOrderError] = useState('');

  const calcServices = services.filter((s) => s.slug !== 'dorozhnaya-razmetka');

  async function handleOrder(e: React.FormEvent) {
    e.preventDefault();
    setOrderError('');
    setOrderLoading(true);
    const selectedService = services.find((s) => s.slug === serviceSlug);
    const res = await submitContactForm({
      name: orderName,
      phone: orderPhone,
      service: selectedService?.title || serviceSlug,
      area: area || undefined,
    });
    setOrderLoading(false);
    if (res.success) {
      setOrderSuccess(true);
    } else {
      setOrderError(res.error || 'Ошибка отправки');
    }
  }

  async function handleCalculate() {
    if (!area || Number(area) <= 0) {
      setError('Укажите площадь');
      return;
    }
    setError('');
    setLoading(true);
    const res = await calculatePrice({
      serviceSlug,
      area: Number(area),
      hasOldCovering,
      needsBase,
      needsMarkup,
    });
    setLoading(false);
    if (res.success && res.result) {
      setResult(res.result);
    } else {
      setError(res.error || 'Ошибка расчёта');
    }
  }

  return (
    <section className="py-16 md:py-24 bg-white" id="calculator">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 text-accent text-sm font-semibold uppercase tracking-wider mb-3">
              <i className="fa-solid fa-calculator" />
              <span>Онлайн-калькулятор</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-asphalt mb-4">
              Рассчитайте стоимость
            </h2>
            <p className="text-text-muted text-lg mb-8">
              Получите предварительный расчёт стоимости работ. Точная смета — после бесплатного выезда специалиста.
            </p>

            {/* Form */}
            <div className="space-y-4">
              {/* Service */}
              <div>
                <label className="block text-asphalt font-semibold text-sm mb-2">Вид работ</label>
                <select
                  value={serviceSlug}
                  onChange={(e) => { setServiceSlug(e.target.value); setResult(null); }}
                  className="w-full border border-light-300 rounded-lg px-4 py-3 text-text bg-white focus:outline-none focus:border-accent transition-colors"
                >
                  {calcServices.map((s) => (
                    <option key={s.slug} value={s.slug}>{s.title}</option>
                  ))}
                </select>
              </div>

              {/* Area */}
              <div>
                <label className="block text-asphalt font-semibold text-sm mb-2">Площадь (м²)</label>
                <input
                  type="number"
                  value={area}
                  onChange={(e) => { setArea(e.target.value); setResult(null); }}
                  placeholder="Например: 500"
                  min="1"
                  className="w-full border border-light-300 rounded-lg px-4 py-3 text-text focus:outline-none focus:border-accent transition-colors"
                />
              </div>

              {/* Options */}
              <div className="space-y-3">
                <label className="block text-asphalt font-semibold text-sm">Дополнительные работы</label>
                {[
                  { key: 'hasOldCovering', label: 'Демонтаж старого покрытия', value: hasOldCovering, setter: setHasOldCovering },
                  { key: 'needsBase', label: 'Устройство щебёночного основания', value: needsBase, setter: setNeedsBase },
                  { key: 'needsMarkup', label: 'Дорожная разметка', value: needsMarkup, setter: setNeedsMarkup },
                ].map((opt) => (
                  <label key={opt.key} className="flex items-center gap-3 cursor-pointer group">
                    <div
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                        opt.value ? 'bg-accent border-accent' : 'border-light-300 group-hover:border-accent'
                      }`}
                      onClick={() => { opt.setter(!opt.value); setResult(null); }}
                    >
                      {opt.value && <i className="fa-solid fa-check text-asphalt text-xs" />}
                    </div>
                    <span className="text-text text-sm">{opt.label}</span>
                  </label>
                ))}
              </div>

              {error && <p className="text-error text-sm">{error}</p>}

              <button
                onClick={handleCalculate}
                disabled={loading}
                className="w-full bg-accent hover:bg-accent-hover disabled:opacity-60 text-asphalt font-bold py-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <><i className="fa-solid fa-spinner animate-spin" /> Считаем...</>
                ) : (
                  <><i className="fa-solid fa-calculator" /> Рассчитать стоимость</>
                )}
              </button>
            </div>
          </div>

          {/* Right — Result */}
          <div>
            {result ? (
              <div className="bg-asphalt rounded-2xl p-6 md:p-8">
                <h3 className="text-white font-bold text-xl mb-6 flex items-center gap-2">
                  <i className="fa-solid fa-circle-check text-accent" />
                  Предварительный расчёт
                </h3>

                {/* Breakdown */}
                <div className="space-y-3 mb-6">
                  {result.breakdown.map((item, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-asphalt-700">
                      <span className="text-white/70 text-sm">{item.label}</span>
                      <span className="text-white font-semibold text-sm">
                        {item.priceMin.toLocaleString('ru-RU')} – {item.priceMax.toLocaleString('ru-RU')} ₽
                      </span>
                    </div>
                  ))}
                </div>

                {/* Total */}
                <div className="bg-accent/10 border border-accent/30 rounded-xl p-4 mb-6">
                  <div className="text-accent text-sm font-semibold mb-1">Итого за {result.area.toLocaleString('ru-RU')} м²</div>
                  <div className="text-white font-bold text-2xl">
                    {result.totalMin.toLocaleString('ru-RU')} – {result.totalMax.toLocaleString('ru-RU')} ₽
                  </div>
                </div>

                <p className="text-white/50 text-xs mb-4">
                  * Расчёт предварительный. Точная стоимость определяется после выезда специалиста на объект.
                </p>

                {orderSuccess ? (
                  <div className="bg-accent/10 border border-accent/30 rounded-xl p-4 text-center">
                    <i className="fa-solid fa-circle-check text-accent text-2xl mb-2 block" />
                    <p className="text-white font-semibold text-sm">Заявка принята! Перезвоним в течение 30 минут.</p>
                  </div>
                ) : (
                  <form onSubmit={handleOrder} className="space-y-3">
                    <input
                      type="text"
                      value={orderName}
                      onChange={(e) => setOrderName(e.target.value)}
                      placeholder="Ваше имя"
                      required
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-accent transition-colors text-sm"
                    />
                    <InputMask
                      mask="+7 (___) ___-__-__"
                      replacement={{ _: /\d/ }}
                      type="tel"
                      value={orderPhone}
                      onChange={(e) => setOrderPhone(e.target.value)}
                      placeholder="+7 (___) ___-__-__"
                      required
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-accent transition-colors text-sm"
                    />
                    {orderError && <p className="text-red-400 text-xs">{orderError}</p>}
                    <button
                      type="submit"
                      disabled={orderLoading}
                      className="w-full bg-accent hover:bg-accent-hover disabled:opacity-60 text-asphalt font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200"
                    >
                      {orderLoading ? (
                        <><i className="fa-solid fa-spinner animate-spin" /> Отправляем...</>
                      ) : (
                        <><i className="fa-solid fa-phone-flip" /> Заказать бесплатный замер</>
                      )}
                    </button>
                  </form>
                )}
              </div>
            ) : (
              <div className="bg-light rounded-2xl p-8 flex flex-col items-center justify-center text-center min-h-[400px]">
                <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                  <i className="fa-solid fa-calculator text-accent text-3xl" />
                </div>
                <h3 className="text-asphalt font-bold text-xl mb-2">Калькулятор стоимости</h3>
                <p className="text-text-muted text-sm max-w-xs">
                  Выберите вид работ, укажите площадь и нажмите «Рассчитать» для получения предварительной стоимости
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
