import { ArticleSkeleton } from '@/app/(news)/articles/ArticlesFeedSkeleton';
import { SearchForm } from '@/components/SearchForm';
import { Suspense } from 'react';
import { ArticleFeed } from './articles/ArticlesFeed';

export default function Home({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  return (
    <>
      <div className="container">
        <SearchForm />
      </div>
      <section className="flex flex-col items-center w-full py-5">
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
    </>
  );
}
