import { Nullable } from '@/types/common';

export type Articles = {
  status: string;
  totalResults: number;
  articles: Article[];
};

export type Article = {
  source: {
    id: Nullable<string>;
    name: Nullable<string>;
  };
  author: Nullable<string>;
  title: Nullable<string>;
  description: Nullable<string>;
  url: Nullable<string>;
  urlToImage: Nullable<string>;
  publishedAt: Nullable<string>;
  content: Nullable<string>;
};
