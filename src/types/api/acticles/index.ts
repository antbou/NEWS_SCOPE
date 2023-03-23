import { Nullable } from '@/types/common';

export type NewsApiParams = EverythingParams | TopHeadlinesParams;
export type EverythingParams = {
  q?: string;
  qInTitle?: string;
  searchIn?: 'title' | 'description' | 'content';
  sources?: string;
  domains?: string;
  pageSize?: number;
  page?: number;
  language?: string;
};

export type TopHeadlinesParams = {
  sources?: string;
  q?: string;
  language?: string;
  country?: string;
  category?: string;
  pageSize?: number;
  page?: number;
};

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
