import Image from 'next/image';
import Link from 'next/link';
import { getHomeNewsPosts } from '@/data/blog';
import { blogContentToHtml } from '@/lib/blog-render';

export default function HomeNewsSection() {
  const posts = getHomeNewsPosts();
  if (posts.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-light" id="news">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 md:mb-14">
          <div className="inline-flex items-center gap-2 text-accent text-sm font-semibold uppercase tracking-wider mb-3">
            <i className="fa-solid fa-newspaper" />
            <span>Новости и объекты</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-asphalt mb-3">Актуальные публикации</h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            Укладка тротуарной плитки и брусчатки в Московской области — примеры работ и полезные материалы для поиска
          </p>
        </div>

        <div className="space-y-16 md:space-y-20">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-2xl border border-light-200 overflow-hidden shadow-sm scroll-mt-28"
            >
              <div className="relative w-full aspect-[21/9] md:aspect-[2.4/1] bg-asphalt-700">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  priority={post.id === '5'}
                />
              </div>
              <div className="p-6 md:p-10">
                <time
                  dateTime={post.publishedAt}
                  className="text-text-light text-sm block mb-3"
                >
                  {new Date(post.publishedAt).toLocaleDateString('ru-RU', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </time>
                <h3 className="text-2xl md:text-3xl font-bold text-asphalt mb-6 leading-tight">{post.title}</h3>
                <div
                  className="max-w-none text-text [&_a]:text-accent [&_a]:underline [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-asphalt [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-asphalt"
                  dangerouslySetInnerHTML={{ __html: blogContentToHtml(post.content) }}
                />
                <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-light-200">
                  {post.tags.map((tag) => (
                    <span key={tag} className="bg-light text-text-muted text-xs px-2.5 py-1 rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>
                <div className="mt-6">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-accent font-semibold text-sm hover:underline"
                  >
                    Отдельная страница статьи
                    <i className="fa-solid fa-arrow-right text-xs" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
