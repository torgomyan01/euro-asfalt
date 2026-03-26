import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

interface MainTemplateProps {
  children: React.ReactNode;
}

export default function MainTemplate({ children }: MainTemplateProps) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 pt-16 md:pt-20">{children}</main>
      <Footer />
    </div>
  );
}
