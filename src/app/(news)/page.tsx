import { ArticleSkeleton } from '@/app/(news)/articles/ArticlesFeedSkeleton';
import { Suspense } from 'react';
import { ArticleFeed } from './articles/ArticlesFeed';

export default function Home({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  return (
    <section className="flex flex-col items-center">
      <div className="container grid grid-cols lg:grid-cols-2 gap-y-6 gap-x-6 justify-items-center divide-y-2">
        <Suspense fallback={<ArticleSkeleton />}>
          {/* @ts-expect-error Server Component */}
          <ArticleFeed
            searchParams={{
              q: searchParams.q,
            }}
          />
        </Suspense>
      </div>
    </section>
  );
}
