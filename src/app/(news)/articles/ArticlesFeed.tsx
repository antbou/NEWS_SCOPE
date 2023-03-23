import { fetchArticles } from '@/api/news';
import React from 'react';
import { NewsApiParams } from '@/types/api/acticles';
import { Article } from './Article';
import Pagination from '@/components/Pagination';

export const ArticleFeed = async ({
  searchParams,
}: {
  searchParams: NewsApiParams;
}) => {
  const endpoint = searchParams.q ? 'everything' : 'top-headlines';
  const page = searchParams.page || 1;

  searchParams.pageSize = 20;

  const { articles, totalResults } = await fetchArticles(
    endpoint,
    searchParams
  );

  return (
    <>
      {articles.length > 0 ? (
        <>
          {articles.map((article, index) => (
            <Article key={index} article={article} />
          ))}
          <div className="col-span-2">
            <Pagination
              articlesParPage={searchParams.pageSize}
              totalArticles={totalResults}
              currentPage={page}
            />
          </div>
        </>
      ) : (
        <div className="col-span-2 w-full text-center text-2xl font-bold text-gray-500">
          No articles found
        </div>
      )}
    </>
  );
};
