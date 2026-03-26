import { redirect } from 'next/navigation';
import Link from 'next/link';
import { checkAdminAuth, adminLogout } from '@/app/actions/admin-auth';
import { getContactRequests } from '@/app/actions/contact';
import { services } from '@/data/services';
import { portfolio } from '@/data/portfolio';
import { blogPosts } from '@/data/blog';
import { reviews } from '@/data/reviews';

export default async function AdminPage() {
  const isAuth = await checkAdminAuth();
  if (!isAuth) redirect('/admin/login');

  const requests = await getContactRequests();
  const unreadCount = requests.filter((r) => !r.isRead).length;

  const stats = [
    { label: 'Заявки', value: requests.length, unread: unreadCount, icon: 'fa-phone', href: '/admin/requests', color: 'bg-accent' },
    { label: 'Услуги', value: services.length, icon: 'fa-road', href: '/admin/services', color: 'bg-blue-500' },
    { label: 'Портфолио', value: portfolio.length, icon: 'fa-images', href: '/admin/portfolio', color: 'bg-green-500' },
    { label: 'Статьи', value: blogPosts.length, icon: 'fa-newspaper', href: '/admin/blog', color: 'bg-purple-500' },
    { label: 'Отзывы', value: reviews.length, icon: 'fa-star', href: '/admin/reviews', color: 'bg-yellow-500' },
  ];

  return (
    <div className="min-h-screen bg-light">
      {/* Admin Header */}
      <header className="bg-asphalt text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-accent rounded flex items-center justify-center">
            <i className="fa-solid fa-road text-asphalt text-sm" />
          </div>
          <span className="font-bold">Euro-Asfalt Admin</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/" target="_blank" className="text-white/60 hover:text-white text-sm flex items-center gap-1">
            <i className="fa-solid fa-eye text-xs" /> Сайт
          </Link>
          <form action={async () => { 'use server'; await adminLogout(); redirect('/admin/login'); }}>
            <button type="submit" className="text-white/60 hover:text-white text-sm flex items-center gap-1">
              <i className="fa-solid fa-right-from-bracket text-xs" /> Выйти
            </button>
          </form>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <h1 className="text-2xl font-bold text-asphalt mb-8">Панель управления</h1>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {stats.map((stat) => (
            <Link
              key={stat.label}
              href={stat.href}
              className="bg-white rounded-xl p-5 hover:shadow-md transition-shadow duration-200 relative"
            >
              {stat.unread ? (
                <div className="absolute top-3 right-3 w-5 h-5 bg-error rounded-full flex items-center justify-center text-white text-xs font-bold">
                  {stat.unread}
                </div>
              ) : null}
              <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center mb-3`}>
                <i className={`fa-solid ${stat.icon} text-white text-sm`} />
              </div>
              <div className="text-asphalt font-bold text-2xl">{stat.value}</div>
              <div className="text-text-muted text-sm">{stat.label}</div>
            </Link>
          ))}
        </div>

        {/* Recent requests */}
        <div className="bg-white rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-asphalt font-bold text-lg">Последние заявки</h2>
            <Link href="/admin/requests" className="text-accent text-sm font-semibold hover:underline">
              Все заявки <i className="fa-solid fa-arrow-right text-xs" />
            </Link>
          </div>

          {requests.length === 0 ? (
            <div className="text-center py-8 text-text-muted">
              <i className="fa-solid fa-inbox text-3xl mb-2 block" />
              Заявок пока нет
            </div>
          ) : (
            <div className="space-y-3">
              {requests.slice(0, 5).map((req) => (
                <div key={req.id} className={`flex items-center gap-4 p-3 rounded-lg ${req.isRead ? 'bg-light' : 'bg-accent/5 border border-accent/20'}`}>
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${req.isRead ? 'bg-light-300' : 'bg-accent'}`} />
                  <div className="flex-1 min-w-0">
                    <div className="text-asphalt font-semibold text-sm">{req.name}</div>
                    <div className="text-text-muted text-xs">{req.phone} {req.service ? `· ${req.service}` : ''}</div>
                  </div>
                  <div className="text-text-light text-xs flex-shrink-0">
                    {new Date(req.createdAt).toLocaleDateString('ru-RU')}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
