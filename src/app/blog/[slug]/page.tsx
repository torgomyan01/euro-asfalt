import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import MainTemplate from '@/components/layout/main-template/main-template';
import { blogPosts, getBlogPostBySlug } from '@/data/blog';
import CtaSection from '@/components/home/cta-section';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.seoTitle,
    description: post.seoDescription,
    keywords: post.keywords.join(', '),
    openGraph: {
      title: post.seoTitle,
      description: post.seoDescription,
      type: 'article',
      publishedTime: post.publishedAt,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    author: { '@type': 'Organization', name: 'Euro-Asfalt' },
    publisher: { '@type': 'Organization', name: 'Euro-Asfalt' },
    datePublished: post.publishedAt,
    keywords: post.keywords.join(', '),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <MainTemplate>
        <div className="py-12 md:py-16 bg-asphalt">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <nav className="flex items-center gap-2 text-white/50 text-sm mb-6">
              <Link href="/" className="hover:text-accent transition-colors">Главная</Link>
              <i className="fa-solid fa-chevron-right text-xs" />
              <Link href="/blog" className="hover:text-accent transition-colors">Блог</Link>
              <i className="fa-solid fa-chevron-right text-xs" />
              <span className="text-white truncate max-w-[200px]">{post.title}</span>
            </nav>
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-accent/10 border border-accent/30 text-accent text-sm font-semibold px-3 py-1 rounded-full">
                {post.category}
              </span>
              <span className="text-white/50 text-sm flex items-center gap-1">
                <i className="fa-solid fa-clock text-xs" /> {post.readTime} мин чтения
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{post.title}</h1>
            <div className="text-white/50 text-sm">
              {new Date(post.publishedAt).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}
            </div>
          </div>
        </div>

        <div className="py-12 md:py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            {/* Excerpt */}
            <p className="text-text-muted text-xl leading-relaxed mb-8 pb-8 border-b border-light-200">
              {post.excerpt}
            </p>

            {/* Content */}
            <div
              className="prose prose-lg max-w-none prose-headings:text-asphalt prose-headings:font-bold prose-a:text-accent prose-strong:text-asphalt"
              dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br>').replace(/## (.*)/g, '<h2>$1</h2>').replace(/### (.*)/g, '<h3>$1</h3>') }}
            />

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-light-200">
              {post.tags.map((tag) => (
                <span key={tag} className="bg-light text-text-muted text-sm px-3 py-1 rounded-full">
                  #{tag}
                </span>
              ))}
            </div>

            {/* Back */}
            <div className="mt-8">
              <Link href="/blog" className="inline-flex items-center gap-2 text-accent font-semibold hover:underline">
                <i className="fa-solid fa-arrow-left text-sm" />
                Все статьи
              </Link>
            </div>
          </div>
        </div>

        <CtaSection />
      </MainTemplate>
    </>
  );
}
