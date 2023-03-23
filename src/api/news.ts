import {
  Articles,
  EverythingParams,
  NewsApiParams,
  TopHeadlinesParams,
} from '@/types/api/acticles';
import { cache } from 'react';
import { z } from 'zod';

const ArticlesSchema = z.object({
  status: z.string(),
  totalResults: z.number(),
  articles: z.array(
    z.object({
      source: z.object({
        id: z.string().nullable(),
        name: z.string().nullable(),
      }),
      author: z.string().nullable(),
      title: z.string().nullable(),
      description: z.string().nullable(),
      url: z.string().nullable(),
      urlToImage: z.string().nullable(),
      publishedAt: z.string().nullable(),
      content: z.string().nullable(),
    })
  ),
});

// Fetch functions
export const fetchArticles = cache(
  async (
    endpoint: 'everything' | 'top-headlines',
    params?: NewsApiParams
  ): Promise<Articles> => {
    let url = process.env.NEWS_API_URL + endpoint + '?';

    // Set default params for each endpoint
    if (endpoint === 'everything') {
      const defaultParams: EverythingParams = {
        q: 'news',
        qInTitle: '',
        sources: '',
        domains: '',
        pageSize: 20,
        page: 1,
        language: 'en',
      };
      params = { ...defaultParams, ...params };
    } else if (endpoint === 'top-headlines') {
      const defaultParams: TopHeadlinesParams = {
        sources: '',
        q: '',
        language: 'en',
        country: 'us',
        category: '',
        pageSize: 20,
        page: 1,
      };
      params = { ...defaultParams, ...params };
    }

    for (const key in params) {
      const value = params[key as keyof NewsApiParams];
      if (value) {
        url += `&${key}=${encodeURIComponent(value)}`;
      }
    }

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.NEWS_API_KEY}`,
      },
    });

    const data = await response.json();

    // Handle errors
    if (!response.ok) {
      throw new Error(data.message);
    }

    // validate articles
    const validatedArticles = ArticlesSchema.parse(await data);

    return validatedArticles;
  }
);
