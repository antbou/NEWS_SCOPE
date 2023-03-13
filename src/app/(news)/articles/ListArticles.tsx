import Card from '@/components/Card';
import { fetchArticles } from '@/services/news';
import React from 'react';

export const ArticlesList = async () => {
  const { articles } = await fetchArticles();
  return (
    <div className="container grid grid-cols lg:grid-cols-2 gap-y-16 gap-x-10 justify-items-center">
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
