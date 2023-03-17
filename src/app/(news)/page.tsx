import { ArticleSkeleton } from '@/app/(news)/articles/ListArticlesSkeleton';
import { Suspense } from 'react';
import { ArticlesList } from './articles/ListArticles';

export default function Home() {
  return (
    <main className="pt-8 flex flex-col items-center">
      <div className="container grid grid-cols lg:grid-cols-2 gap-y-6 gap-x-6 justify-items-center divide-y-2">
        <Suspense fallback={<ArticleSkeleton />}>
          {/* @ts-expect-error Server Component */}
          <ArticlesList />
        </Suspense>
      </div>
    </main>
  );
}
