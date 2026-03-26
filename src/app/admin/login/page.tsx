'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminLogin } from '@/app/actions/admin-auth';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    const res = await adminLogin(password);
    setLoading(false);
    if (res.success) {
      router.push('/admin');
    } else {
      setError(res.error || 'Ошибка');
    }
  }

  return (
    <div className="min-h-screen bg-asphalt flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl p-8 w-full max-w-sm shadow-xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
            <i className="fa-solid fa-road text-asphalt text-lg" />
          </div>
          <div>
            <div className="font-bold text-asphalt text-lg leading-none">Euro-Asfalt</div>
            <div className="text-text-muted text-xs">Панель управления</div>
          </div>
        </div>

        <h1 className="text-asphalt font-bold text-2xl mb-6">Вход</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-asphalt font-semibold text-sm mb-2">Пароль</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Введите пароль"
              required
              autoFocus
              className="w-full border border-light-300 rounded-lg px-4 py-3 text-text focus:outline-none focus:border-accent transition-colors"
            />
          </div>

          {error && (
            <div className="bg-error/10 border border-error/30 text-error text-sm px-4 py-3 rounded-lg flex items-center gap-2">
              <i className="fa-solid fa-triangle-exclamation" />
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-accent hover:bg-accent-hover disabled:opacity-60 text-asphalt font-bold py-3 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          >
            {loading ? (
              <><i className="fa-solid fa-spinner animate-spin" /> Входим...</>
            ) : (
              <><i className="fa-solid fa-right-to-bracket" /> Войти</>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
