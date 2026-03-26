'use client';

import { useState } from 'react';
import { InputMask } from '@react-input/mask';
import { submitContactForm } from '@/app/actions/contact';
import { services } from '@/data/services';

export default function CtaSection() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    const res = await submitContactForm({ name, phone, service });
    setLoading(false);
    if (res.success) {
      setSuccess(true);
      setName('');
      setPhone('');
      setService('');
    } else {
      setError(res.error || 'Ошибка отправки');
    }
  }

  return (
    <section className="py-16 md:py-24 bg-asphalt" id="form">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 text-accent text-sm font-semibold uppercase tracking-wider mb-4">
              <i className="fa-solid fa-phone-flip" />
              <span>Бесплатная консультация</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Оставьте заявку — мы перезвоним
            </h2>
            <p className="text-white/60 text-lg mb-8">
              Бесплатный выезд специалиста на объект. Точный расчёт стоимости. Ответим в течение 30 минут.
            </p>

            {/* Benefits */}
            <ul className="space-y-3">
              {[
                'Бесплатный выезд и замер',
                'Расчёт стоимости за 1 день',
                'Договор с фиксированной ценой',
                'Гарантия 3 года на все работы',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-white/80 text-sm">
                  <i className="fa-solid fa-circle-check text-accent flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl p-6 md:p-8">
            {success ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fa-solid fa-circle-check text-success text-3xl" />
                </div>
                <h3 className="text-asphalt font-bold text-xl mb-2">Заявка принята!</h3>
                <p className="text-text-muted text-sm">
                  Мы свяжемся с вами в ближайшее время. Обычно перезваниваем в течение 30 минут.
                </p>
              </div>
            ) : (
              <>
                <h3 className="text-asphalt font-bold text-xl mb-6">Оставить заявку</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-asphalt font-semibold text-sm mb-2">
                      Ваше имя <span className="text-error">*</span>
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Иван Иванов"
                      required
                      className="w-full border border-light-300 rounded-lg px-4 py-3 text-text focus:outline-none focus:border-accent transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-asphalt font-semibold text-sm mb-2">
                      Телефон <span className="text-error">*</span>
                    </label>
                    <InputMask
                      mask="+7 (___) ___-__-__"
                      replacement={{ _: /\d/ }}
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+7 (___) ___-__-__"
                      required
                      className="w-full border border-light-300 rounded-lg px-4 py-3 text-text focus:outline-none focus:border-accent transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-asphalt font-semibold text-sm mb-2">Вид работ</label>
                    <select
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full border border-light-300 rounded-lg px-4 py-3 text-text bg-white focus:outline-none focus:border-accent transition-colors"
                    >
                      <option value="">Не выбрано</option>
                      {services.map((s) => (
                        <option key={s.slug} value={s.title}>{s.title}</option>
                      ))}
                    </select>
                  </div>

                  {error && <p className="text-error text-sm">{error}</p>}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-accent hover:bg-accent-hover disabled:opacity-60 text-asphalt font-bold py-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <><i className="fa-solid fa-spinner animate-spin" /> Отправляем...</>
                    ) : (
                      <><i className="fa-solid fa-phone-flip" /> Жду звонка</>
                    )}
                  </button>

                  <p className="text-text-light text-xs text-center">
                    Нажимая кнопку, вы соглашаетесь с{' '}
                    <a href="/privacy" className="underline hover:text-accent">политикой конфиденциальности</a>
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
