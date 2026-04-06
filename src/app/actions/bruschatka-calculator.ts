'use server';

export interface BruschatkaCalculatorInput {
  area: number;
  material: 'plitka' | 'bruschatka' | 'combo';
  hasDemolition: boolean;
  hasBase: boolean;
  hasBorder: boolean;
  hasDrainage: boolean;
  hasGeotextile: boolean;
}

export interface BruschatkaCalculatorResult {
  area: number;
  totalMin: number;
  totalMax: number;
  breakdown: { label: string; priceMin: number; priceMax: number }[];
}

const MATERIAL: Record<BruschatkaCalculatorInput['material'], { label: string; min: number; max: number }> = {
  plitka: { label: 'Укладка тротуарной плитки', min: 1100, max: 1800 },
  bruschatka: { label: 'Укладка брусчатки', min: 1500, max: 2400 },
  combo: { label: 'Комбинированная укладка (плитка + брусчатка)', min: 1300, max: 2100 },
};

export async function calculateBruschatkaPrice(
  input: BruschatkaCalculatorInput
): Promise<{ success: boolean; result?: BruschatkaCalculatorResult; error?: string }> {
  try {
    if (!input.area || input.area <= 0) {
      return { success: false, error: 'Укажите площадь' };
    }
    if (input.area > 50000) {
      return { success: false, error: 'Для объектов свыше 50 000 м² свяжитесь с нами для расчёта' };
    }

    const area = Number(input.area);
    const mat = MATERIAL[input.material];
    const breakdown: BruschatkaCalculatorResult['breakdown'] = [];

    const baseMin = mat.min * area;
    const baseMax = mat.max * area;
    breakdown.push({ label: mat.label, priceMin: Math.round(baseMin), priceMax: Math.round(baseMax) });

    let extraMin = 0;
    let extraMax = 0;

    if (input.hasDemolition) {
      const dMin = 200 * area;
      const dMax = 350 * area;
      extraMin += dMin;
      extraMax += dMax;
      breakdown.push({
        label: 'Демонтаж старого покрытия',
        priceMin: Math.round(dMin),
        priceMax: Math.round(dMax),
      });
    }

    if (input.hasBase) {
      const bMin = 350 * area;
      const bMax = 600 * area;
      extraMin += bMin;
      extraMax += bMax;
      breakdown.push({
        label: 'Устройство песчано-щебёночного основания',
        priceMin: Math.round(bMin),
        priceMax: Math.round(bMax),
      });
    }

    if (input.hasGeotextile) {
      const gMin = 80 * area;
      const gMax = 150 * area;
      extraMin += gMin;
      extraMax += gMax;
      breakdown.push({
        label: 'Геотекстиль',
        priceMin: Math.round(gMin),
        priceMax: Math.round(gMax),
      });
    }

    const perimeter = 4 * Math.sqrt(area);

    if (input.hasBorder) {
      const brMin = 450 * perimeter;
      const brMax = 650 * perimeter;
      extraMin += brMin;
      extraMax += brMax;
      breakdown.push({
        label: 'Установка бордюрного камня (оценка по периметру)',
        priceMin: Math.round(brMin),
        priceMax: Math.round(brMax),
      });
    }

    if (input.hasDrainage) {
      const drMin = 250 * area;
      const drMax = 450 * area;
      extraMin += drMin;
      extraMax += drMax;
      breakdown.push({
        label: 'Дренажные работы (предварительно)',
        priceMin: Math.round(drMin),
        priceMax: Math.round(drMax),
      });
    }

    const totalMin = Math.round(baseMin + extraMin);
    const totalMax = Math.round(baseMax + extraMax);

    return {
      success: true,
      result: {
        area,
        totalMin,
        totalMax,
        breakdown,
      },
    };
  } catch (e) {
    console.error('[Bruschatka calculator]', e);
    return { success: false, error: 'Ошибка расчёта' };
  }
}
