import { Metadata } from 'next';
import Link from 'next/link';
import MainTemplate from '@/components/layout/main-template/main-template';
import { blogPosts } from '@/data/blog';

export const metadata: Metadata = {
  title: 'Блог об асфальтировании в Москве — советы и статьи | Euro-Asfalt',
  description: 'Полезные статьи об асфальтировании в Москве и Подмосковье: технологии укладки, советы по выбору покрытия, стоимость работ, уход за асфальтом.',
  keywords: 'блог асфальтирование Москва, статьи об асфальте Москва, советы асфальтирование Подмосковье',
};

export default function BlogPage() {
  return (
    <MainTemplate>
      <div className="py-12 md:py-16 bg-asphalt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <nav className="flex items-center gap-2 text-white/50 text-sm mb-6">
            <Link href="/" className="hover:text-accent transition-colors">Главная</Link>
            <i className="fa-solid fa-chevron-right text-xs" />
            <span className="text-white">Блог</span>
          </nav>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Блог</h1>
          <p className="text-white/60 text-lg">Полезные статьи об асфальтировании и дорожном строительстве</p>
        </div>
      </div>

      <div className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group bg-white rounded-xl overflow-hidden border border-light-200 hover:shadow-md transition-shadow duration-300"
              >
                <div className="aspect-[16/9] bg-asphalt-700 overflow-hidden">
                  {post.coverImage ? (
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <i className="fa-solid fa-newspaper text-asphalt-500 text-4xl" />
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="bg-accent/10 text-accent text-xs font-semibold px-2 py-1 rounded">
                      {post.category}
                    </span>
                    <span className="text-text-light text-xs flex items-center gap-1">
                      <i className="fa-solid fa-clock text-xs" />
                      {post.readTime} мин
                    </span>
                  </div>
                  <h2 className="text-asphalt font-bold text-lg mb-2 group-hover:text-accent transition-colors duration-200 line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-text-muted text-sm leading-relaxed mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-light">
                      {new Date(post.publishedAt).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </span>
                    <span className="text-accent font-semibold flex items-center gap-1">
                      Читать <i className="fa-solid fa-arrow-right text-xs" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </MainTemplate>
  );
}
