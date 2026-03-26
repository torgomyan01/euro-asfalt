import { redirect } from 'next/navigation';
import Link from 'next/link';
import { checkAdminAuth } from '@/app/actions/admin-auth';
import { getContactRequests, markRequestAsRead, deleteRequest } from '@/app/actions/contact';

export default async function AdminRequestsPage() {
  const isAuth = await checkAdminAuth();
  if (!isAuth) redirect('/admin/login');

  const requests = await getContactRequests();

  return (
    <div className="min-h-screen bg-light">
      <header className="bg-asphalt text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/admin" className="text-white/60 hover:text-white">
            <i className="fa-solid fa-arrow-left text-sm" />
          </Link>
          <span className="font-bold">Заявки</span>
        </div>
        <Link href="/" target="_blank" className="text-white/60 hover:text-white text-sm">
          <i className="fa-solid fa-eye text-xs" /> Сайт
        </Link>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-asphalt">Заявки ({requests.length})</h1>
          <span className="text-text-muted text-sm">
            Непрочитанных: {requests.filter((r) => !r.isRead).length}
          </span>
        </div>

        {requests.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center text-text-muted">
            <i className="fa-solid fa-inbox text-5xl mb-4 block text-light-300" />
            <p className="text-lg font-semibold">Заявок пока нет</p>
            <p className="text-sm mt-1">Новые заявки появятся здесь</p>
          </div>
        ) : (
          <div className="space-y-3">
            {requests.map((req) => (
              <div key={req.id} className={`bg-white rounded-xl p-5 ${!req.isRead ? 'border-l-4 border-accent' : ''}`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-asphalt font-bold text-lg">{req.name}</span>
                      {!req.isRead && (
                        <span className="bg-accent text-asphalt text-xs font-bold px-2 py-0.5 rounded-full">Новая</span>
                      )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-text-muted">
                      <span className="flex items-center gap-2">
                        <i className="fa-solid fa-phone text-accent text-xs" />
                        <a href={`tel:${req.phone}`} className="hover:text-accent transition-colors font-medium text-asphalt">{req.phone}</a>
                      </span>
                      {req.service && (
                        <span className="flex items-center gap-2">
                          <i className="fa-solid fa-road text-accent text-xs" />
                          {req.service}
                        </span>
                      )}
                      {req.area && (
                        <span className="flex items-center gap-2">
                          <i className="fa-solid fa-ruler-combined text-accent text-xs" />
                          {req.area} м²
                        </span>
                      )}
                      <span className="flex items-center gap-2">
                        <i className="fa-solid fa-calendar text-accent text-xs" />
                        {new Date(req.createdAt).toLocaleString('ru-RU')}
                      </span>
                    </div>
                    {req.message && (
                      <div className="mt-3 text-sm text-text bg-light rounded-lg p-3">
                        {req.message}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {!req.isRead && (
                      <form action={async () => { 'use server'; await markRequestAsRead(req.id); }}>
                        <button type="submit" className="text-accent hover:text-accent-hover text-xs font-semibold px-3 py-1.5 border border-accent/30 rounded-lg transition-colors">
                          <i className="fa-solid fa-check mr-1" />
                          Прочитано
                        </button>
                      </form>
                    )}
                    <form action={async () => { 'use server'; await deleteRequest(req.id); }}>
                      <button type="submit" className="text-error hover:text-red-700 text-xs font-semibold px-3 py-1.5 border border-error/30 rounded-lg transition-colors">
                        <i className="fa-solid fa-trash" />
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
