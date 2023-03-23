import Card from '@/components/Card';
import { fetchArticles } from '@/api/news';
import React from 'react';
import Image from 'next/image';
import { Nullable } from '@/types/common';
import { NewsApiParams } from '@/types/api/acticles';

export const ArticleFeed = async ({
  searchParams,
}: {
  searchParams: NewsApiParams;
}) => {
  const httpsOnlyForImage = (urlToImage: Nullable<string>) =>
    urlToImage?.startsWith('https') ? urlToImage : './no-news.svg';

  const endpoint = searchParams.q ? 'everything' : 'top-headlines';

  const { articles } = await fetchArticles(endpoint, searchParams);

  return (
    <>
      {articles.length > 0 ? (
        articles.map((article, index) => (
          <Card key={index}>
            <>
              <Image
                src={httpsOnlyForImage(article.urlToImage)}
                className="w-full rounded-xl object-cover relative"
                alt="Article image"
                fill
                unoptimized={true}
                loading="lazy"
                sizes="(max-width: 768px) 100vw,
                (max-width: 1200px) 50vw,
                33vw"
              />
              <div className="absolute bottom-0 left-0 right-0 px-4 py-2 bg-sky-800 opacity-90 rounded-md">
                <h3 className="text-xl text-white font-bold">
                  {article.title}
                </h3>
              </div>
            </>
          </Card>
        ))
      ) : (
        <div className="col-span-2 w-full text-center text-2xl font-bold text-gray-500">
          No articles found
        </div>
      )}
    </>
  );
};
