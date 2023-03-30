import { Nullable } from '@/types/common';

export type NewsApiParams = EverythingParams | TopHeadlinesParams;

// Params for News API Everything endpoint
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

// Params for News API Top Headlines endpoint
export type TopHeadlinesParams = {
  sources?: string;
  q?: string;
  language?: string;
  country?: string;
  category?: string;
  pageSize?: number;
  page?: number;
};

// Response from News API
export type Articles = {
  status: string;
  totalResults: number;
  articles: Article[];
};

// Article get from News API
export type Article = {
  source?: {
    id: Nullable<string>;
    name: Nullable<string>;
  };
  author?: Nullable<string>;
  title: Nullable<string>;
  description?: Nullable<string>;
  url: Nullable<string>;
  urlToImage: Nullable<string>;
  publishedAt?: Nullable<string>;
  content?: Nullable<string>;
};

// Article get from Firestore
export type ArticleDb = {
  title: Nullable<string>;
  url: string;
  urlToImage: Nullable<string>;
  userId: string;
  isFavorite: boolean;
  emoji: string;
  timestamp?: string;
};
