import { Articles } from '@/types/api/acticles';
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
export const fetchArticles = async (
  search = '',
  page = 1
): Promise<Articles> => {
  // create url with optional search query, if search is empty remove it from the url
  const url = search
    ? process.env.NEWS_API_URL + `everything?q=${search}&page=${page}`
    : process.env.NEWS_API_URL + `top-headlines?country=us&page=${page}`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.NEWS_API_KEY}`,
    },
  });

  const data = await response.json();

  return ArticlesSchema.parse(data);
};
