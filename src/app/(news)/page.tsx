import { ArticleSkeleton } from '@/app/(news)/articles/ListArticlesSkeleton';
import { Suspense } from 'react';
import { ArticlesList } from './articles/ListArticles';

export default async function Home() {
  const className =
    'container grid grid-cols lg:grid-cols-2 gap-y-6 gap-x-6 justify-items-center divide-y-2';
  return (
    <main className="pt-8 flex flex-col gap-4">
      <div className="px-4">
        <Suspense fallback={<ArticleSkeleton className={className} />}>
          {/* @ts-expect-error Server Component */}
          <ArticlesList className={className} />
        </Suspense>
      </div>
    </main>
  );
}
