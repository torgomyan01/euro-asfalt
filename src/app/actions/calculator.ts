'use server';

export interface CalculatorInput {
  serviceSlug: string;
  area: number;
  hasOldCovering?: boolean;
  needsBase?: boolean;
  needsMarkup?: boolean;
}

export interface CalculatorResult {
  serviceTitle: string;
  area: number;
  basePrice: number;
  demolitionPrice: number;
  baseLayerPrice: number;
  markupPrice: number;
  totalMin: number;
  totalMax: number;
  breakdown: { label: string; priceMin: number; priceMax: number }[];
}

const servicePrices: Record<string, { title: string; priceMin: number; priceMax: number }> = {
  'ukladka-asfalta': { title: 'Укладка асфальта (до 5 см / с материалом)', priceMin: 1000, priceMax: 1700 },
  'asfaltovanie-parkovok': { title: 'Асфальтирование парковок', priceMin: 1000, priceMax: 1700 },
  'remont-dorog': { title: 'Ремонт дорог (ямочный)', priceMin: 800, priceMax: 1200 },
  'ukladka-asfaltovoy-kroshki': { title: 'Укладка асфальтовой крошки (ШМА)', priceMin: 300, priceMax: 450 },
  'blagoustrojstvo-territorij': { title: 'Благоустройство территорий', priceMin: 1200, priceMax: 1800 },
  'promyshlennye-ploshadki': { title: 'Промышленные площадки', priceMin: 1700, priceMax: 2200 },
  'dorozhnaya-razmetka': { title: 'Дорожная разметка', priceMin: 150, priceMax: 300 },
};

export async function calculatePrice(input: CalculatorInput): Promise<{ success: boolean; result?: CalculatorResult; error?: string }> {
  try {
    if (!input.serviceSlug || !input.area || input.area <= 0) {
      return { success: false, error: 'Укажите услугу и площадь' };
    }

    if (input.area > 100000) {
      return { success: false, error: 'Для объектов свыше 100 000 м² свяжитесь с нами для расчёта' };
    }

    const service = servicePrices[input.serviceSlug];
    if (!service) {
      return { success: false, error: 'Услуга не найдена' };
    }

    const area = Number(input.area);
    const breakdown: CalculatorResult['breakdown'] = [];

    // Base asphalt price
    const basePriceMin = service.priceMin * area;
    const basePriceMax = service.priceMax * area;
    breakdown.push({
      label: service.title,
      priceMin: basePriceMin,
      priceMax: basePriceMax,
    });

    // Demolition of old covering
    let demolitionMin = 0;
    let demolitionMax = 0;
    if (input.hasOldCovering) {
      demolitionMin = 200 * area;
      demolitionMax = 400 * area;
      breakdown.push({
        label: 'Демонтаж старого покрытия',
        priceMin: demolitionMin,
        priceMax: demolitionMax,
      });
    }

    // Base layer (щебень)
    let baseLayerMin = 0;
    let baseLayerMax = 0;
    if (input.needsBase) {
      baseLayerMin = 300 * area;
      baseLayerMax = 600 * area;
      breakdown.push({
        label: 'Устройство щебёночного основания',
        priceMin: baseLayerMin,
        priceMax: baseLayerMax,
      });
    }

    // Road markup
    let markupMin = 0;
    let markupMax = 0;
    if (input.needsMarkup) {
      const perimeter = Math.sqrt(area) * 4;
      markupMin = 150 * perimeter;
      markupMax = 300 * perimeter;
      breakdown.push({
        label: 'Дорожная разметка',
        priceMin: Math.round(markupMin),
        priceMax: Math.round(markupMax),
      });
    }

    const totalMin = Math.round(basePriceMin + demolitionMin + baseLayerMin + markupMin);
    const totalMax = Math.round(basePriceMax + demolitionMax + baseLayerMax + markupMax);

    return {
      success: true,
      result: {
        serviceTitle: service.title,
        area,
        basePrice: service.priceMin,
        demolitionPrice: input.hasOldCovering ? 200 : 0,
        baseLayerPrice: input.needsBase ? 300 : 0,
        markupPrice: input.needsMarkup ? 150 : 0,
        totalMin,
        totalMax,
        breakdown,
      },
    };
  } catch (error) {
    console.error('[Calculator] Error:', error);
    return { success: false, error: 'Ошибка расчёта. Попробуйте ещё раз.' };
  }
}
