'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { contacts } from '@/data/contacts';

const navLinks = [
  { href: '/services', label: 'Услуги' },
  { href: '/portfolio', label: 'Портфолио' },
  { href: '/calculator', label: 'Калькулятор' },
  { href: '/blog', label: 'Блог' },
  { href: '/reviews', label: 'Отзывы' },
  { href: '/contacts', label: 'Контакты' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add('overflow');
    } else {
      document.body.classList.remove('overflow');
    }
  }, [menuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-asphalt shadow-lg' : 'bg-asphalt/95'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-9 h-9 bg-accent rounded flex items-center justify-center">
              <i className="fa-solid fa-road text-asphalt text-base" />
            </div>
            <div className="leading-tight">
              <div className="text-white font-bold text-lg leading-none">Euro-Asfalt</div>
              <div className="text-accent text-xs leading-none">Евро-Асфалт</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/80 hover:text-accent px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Phone + CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href={`tel:${contacts.phoneClear}`}
              className="flex items-center gap-2 text-white hover:text-accent transition-colors duration-200"
            >
              <i className="fa-solid fa-phone text-accent text-sm" />
              <span className="font-semibold text-sm">{contacts.phone}</span>
            </a>
            <Link
              href="/contacts#form"
              className="bg-accent hover:bg-accent-hover text-asphalt font-bold text-sm px-4 py-2 rounded transition-colors duration-200"
            >
              Заявка
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Меню"
          >
            <i className={`fa-solid ${menuOpen ? 'fa-xmark' : 'fa-bars'} text-xl`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-asphalt border-t border-asphalt-700">
          <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/80 hover:text-accent py-3 px-2 text-base font-medium border-b border-asphalt-700 transition-colors duration-200"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={`tel:${contacts.phoneClear}`}
              className="flex items-center gap-2 text-white py-3 px-2 mt-2"
            >
              <i className="fa-solid fa-phone text-accent" />
              <span className="font-semibold">{contacts.phone}</span>
            </a>
            <Link
              href="/contacts#form"
              className="bg-accent text-asphalt font-bold text-center py-3 rounded mt-2"
              onClick={() => setMenuOpen(false)}
            >
              Оставить заявку
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
