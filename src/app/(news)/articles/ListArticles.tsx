import Card from '@/components/Card';
import { fetchArticles } from '@/services/news';
import React from 'react';

export const ArticlesList = async ({ className }: { className: string }) => {
  const { articles } = await fetchArticles();
  return (
    <div className={className}>
      {articles.map((article) => (
        <Card
          key={article.title}
          imgUrl={article.urlToImage}
          title={article.title}
          description={article.description}
        ></Card>
      ))}
    </div>
  );
};
