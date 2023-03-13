import { ArticleSkeleton } from '@/components/ListArticlesSkeleton';
import Card from '@/components/Card';
import { fetchArticles } from '@/services/news';
import { Inter } from '@next/font/google';
import { Suspense } from 'react';
import { ArticlesList } from './articles/ListArticles';

const inter = Inter({ subsets: ['latin'] });

export default async function Home() {
  // console.log(await fetchArticles());
  const { articles } = await fetchArticles();

  return (
    <main className="pt-8 flex flex-col gap-4">
      <div className="px-4">
        <Suspense fallback={<ArticleSkeleton />}>
          {/* @ts-ignore*/}
          <ArticlesList />
        </Suspense>
      </div>
    </main>
  );
}
