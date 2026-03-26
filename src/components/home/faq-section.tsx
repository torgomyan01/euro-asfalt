'use client';

import { useState } from 'react';
import { faqItems } from '@/data/faq';

export default function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(null);
  const featured = faqItems.slice(0, 6);

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-accent text-sm font-semibold uppercase tracking-wider mb-3">
            <i className="fa-solid fa-circle-question" />
            <span>Частые вопросы</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-asphalt mb-4">FAQ</h2>
          <p className="text-text-muted text-lg">Ответы на самые популярные вопросы об асфальтировании</p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {featured.map((item) => (
            <div
              key={item.id}
              className="border border-light-300 rounded-xl overflow-hidden"
            >
              <button
                className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left hover:bg-light transition-colors duration-200"
                onClick={() => setOpenId(openId === item.id ? null : item.id)}
              >
                <span className="text-asphalt font-semibold text-base">{item.question}</span>
                <i
                  className={`fa-solid fa-chevron-down text-accent text-sm flex-shrink-0 transition-transform duration-200 ${
                    openId === item.id ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openId === item.id && (
                <div className="px-6 pb-5 text-text-muted text-sm leading-relaxed border-t border-light-200">
                  <div className="pt-4">{item.answer}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
