'use client';

import Card from '@/components/Card';
import { Nullable } from '@/types/common';
import React from 'react';
import Image from 'next/image';
import { Article as ArticleType } from '@/types/api/acticles';

export const Article = ({ article }: { article: ArticleType }) => {
  const httpsOnlyForImage = (urlToImage: Nullable<string>) =>
    urlToImage?.startsWith('https') ? urlToImage : './no-news.svg';
  return (
    <Card>
      <>
        <Image
          src={httpsOnlyForImage(article.urlToImage)}
          onClick={() =>
            article.url ? window.open(article.url, '_blank') : null
          }
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
          <h3 className="text-xl text-white font-bold">{article.title}</h3>
        </div>
      </>
    </Card>
  );
};
