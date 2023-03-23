import Card from '@/components/Card';
import { fetchArticles } from '@/api/news';
import React from 'react';
import Image from 'next/image';
import { Nullable } from '@/types/common';
import { NewsApiParams } from '@/types/api/acticles';
import { Article } from './Article';

export const ArticleFeed = async ({
  searchParams,
}: {
  searchParams: NewsApiParams;
}) => {
  const endpoint = searchParams.q ? 'everything' : 'top-headlines';

  const { articles } = await fetchArticles(endpoint, searchParams);

  return (
    <>
      {articles.length > 0 ? (
        articles.map((article, index) => (
          <Article key={index} article={article} />
        ))
      ) : (
        <div className="col-span-2 w-full text-center text-2xl font-bold text-gray-500">
          No articles found
        </div>
      )}
    </>
  );
};
