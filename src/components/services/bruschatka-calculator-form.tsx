'use client';

import { useState } from 'react';
import { InputMask } from '@react-input/mask';
import { motion } from 'framer-motion';
import {
  calculateBruschatkaPrice,
  type BruschatkaCalculatorInput,
} from '@/app/actions/bruschatka-calculator';
import { submitContactForm } from '@/app/actions/contact';

const materialOptions: { value: BruschatkaCalculatorInput['material']; label: string }[] = [
  { value: 'plitka', label: 'Тротуарная плитка' },
  { value: 'bruschatka', label: 'Брусчатка' },
  { value: 'combo', label: 'Комбинация плитки и брусчатки' },
];

export default function BruschatkaCalculatorForm() {
  const [area, setArea] = useState('');
  const [material, setMaterial] = useState<BruschatkaCalculatorInput['material']>('bruschatka');
  const [hasDemolition, setHasDemolition] = useState(false);
  const [hasBase, setHasBase] = useState(true);
  const [hasBorder, setHasBorder] = useState(false);
  const [hasDrainage, setHasDrainage] = useState(false);
  const [hasGeotextile, setHasGeotextile] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<Awaited<
    ReturnType<typeof calculateBruschatkaPrice>
  >['result']>(undefined);

  const [orderName, setOrderName] = useState('');
  const [orderPhone, setOrderPhone] = useState('');
  const [orderLoading, setOrderLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderError, setOrderError] = useState('');

  async function handleCalc() {
    setError('');
    setLoading(true);
    const res = await calculateBruschatkaPrice({
      area: Number(area),
      material,
      hasDemolition,
      hasBase,
      hasBorder,
      hasDrainage,
      hasGeotextile,
    });
    setLoading(false);
    if (res.success && res.result) setResult(res.result);
    else setError(res.error || 'Ошибка');
  }

  async function handleOrder(e: React.FormEvent) {
    e.preventDefault();
    setOrderError('');
    setOrderLoading(true);
    const summary = result
      ? `Калькулятор брусчатки: ${result.totalMin.toLocaleString('ru-RU')}–${result.totalMax.toLocaleString('ru-RU')} ₽, ${result.area} м²`
      : `Заявка с калькулятора брусчатки, площадь ${area} м²`;
    const res = await submitContactForm({
      name: orderName,
      phone: orderPhone,
      service: 'Укладка брусчатки и тротуарной плитки',
      area: area || undefined,
      message: summary,
    });
    setOrderLoading(false);
    if (res.success) setOrderSuccess(true);
    else setOrderError(res.error || 'Ошибка');
  }

  return (
    <div className="bg-white rounded-2xl border border-light-200 overflow-hidden shadow-sm">
      <div className="bg-asphalt px-6 py-4">
        <h2 className="text-white font-bold text-xl flex items-center gap-2">
          <i className="fa-solid fa-calculator text-accent" />
          Калькулятор укладки брусчатки
        </h2>
        <p className="text-white/60 text-sm mt-1">
          Предварительный расчёт по Москве и Московской области
        </p>
      </div>

      <div className="p-6 space-y-4">
        <div>
          <label className="block text-asphalt font-semibold text-sm mb-2">Площадь, м²</label>
          <input
            type="number"
            min={1}
            value={area}
            onChange={(e) => {
              setArea(e.target.value);
              setResult(undefined);
            }}
            placeholder="Например: 80"
            className="w-full border border-light-300 rounded-lg px-4 py-3 text-text focus:outline-none focus:border-accent"
          />
        </div>

        <div>
          <label className="block text-asphalt font-semibold text-sm mb-2">Тип мощения</label>
          <select
            value={material}
            onChange={(e) => {
              setMaterial(e.target.value as BruschatkaCalculatorInput['material']);
              setResult(undefined);
            }}
            className="w-full border border-light-300 rounded-lg px-4 py-3 bg-white focus:outline-none focus:border-accent"
          >
            {materialOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <span className="text-asphalt font-semibold text-sm">Дополнительные работы</span>
          {[
            { k: 'base', label: 'Усиленное / дополнительное основание (+ к смете под ключ)', v: hasBase, set: setHasBase },
            { k: 'dem', label: 'Демонтаж старого покрытия', v: hasDemolition, set: setHasDemolition },
            { k: 'geo', label: 'Геотекстиль', v: hasGeotextile, set: setHasGeotextile },
            { k: 'bor', label: 'Бордюрный камень', v: hasBorder, set: setHasBorder },
            { k: 'dr', label: 'Дренаж (предварительно)', v: hasDrainage, set: setHasDrainage },
          ].map((opt) => (
            <label key={opt.k} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={opt.v}
                onChange={() => {
                  opt.set(!opt.v);
                  setResult(undefined);
                }}
                className="w-4 h-4 accent-accent rounded"
              />
              <span className="text-text text-sm">{opt.label}</span>
            </label>
          ))}
        </div>

        {error && <p className="text-error text-sm">{error}</p>}

        <button
          type="button"
          onClick={handleCalc}
          disabled={loading}
          className="w-full bg-accent hover:bg-accent-hover disabled:opacity-60 text-asphalt font-bold py-4 rounded-lg flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <i className="fa-solid fa-spinner animate-spin" /> Считаем...
            </>
          ) : (
            <>
              <i className="fa-solid fa-calculator" /> Рассчитать стоимость
            </>
          )}
        </button>

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-asphalt rounded-xl p-5 space-y-3"
          >
            <div className="text-accent text-sm font-semibold">
              Итого за {result.area.toLocaleString('ru-RU')} м²
            </div>
            <div className="text-white font-bold text-2xl">
              {result.totalMin.toLocaleString('ru-RU')} – {result.totalMax.toLocaleString('ru-RU')} ₽
            </div>
            <div className="space-y-2 border-t border-asphalt-700 pt-3">
              {result.breakdown.map((row, i) => (
                <div key={i} className="flex justify-between text-sm gap-4">
                  <span className="text-white/70">{row.label}</span>
                  <span className="text-white font-medium shrink-0">
                    {row.priceMin.toLocaleString('ru-RU')} – {row.priceMax.toLocaleString('ru-RU')} ₽
                  </span>
                </div>
              ))}
            </div>
            <p className="text-white/45 text-xs">
              * Расчёт ориентировочный. Точная смета — после выезда мастера на объект.
            </p>

            {orderSuccess ? (
              <p className="text-accent text-sm font-semibold text-center py-2">
                Заявка отправлена! Перезвоним в течение 30 минут.
              </p>
            ) : (
              <form onSubmit={handleOrder} className="space-y-3 pt-2 border-t border-asphalt-700">
                <p className="text-white/80 text-sm font-semibold">Заказать расчёт и выезд</p>
                <input
                  type="text"
                  required
                  value={orderName}
                  onChange={(e) => setOrderName(e.target.value)}
                  placeholder="Ваше имя"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 text-sm"
                />
                <InputMask
                  mask="+7 (___) ___-__-__"
                  replacement={{ _: /\d/ }}
                  type="tel"
                  required
                  value={orderPhone}
                  onChange={(e) => setOrderPhone(e.target.value)}
                  placeholder="+7 (___) ___-__-__"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 text-sm"
                />
                {orderError && <p className="text-red-400 text-xs">{orderError}</p>}
                <button
                  type="submit"
                  disabled={orderLoading}
                  className="w-full bg-accent hover:bg-accent-hover disabled:opacity-60 text-asphalt font-bold py-3 rounded-lg"
                >
                  {orderLoading ? 'Отправляем...' : 'Отправить заявку'}
                </button>
              </form>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
