import { fetchArticles } from '@/api/news';
import { EverythingParams, TopHeadlinesParams } from '@/types/api/acticles';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  if (method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${method} Not Allowed`).end();
  }

  const endpoint = req.query.endpoint as 'everything' | 'top-headlines';

  if (
    !endpoint ||
    (endpoint !== 'everything' && endpoint !== 'top-headlines')
  ) {
    res.status(400).end('Invalid endpoint').end();
  }

  const params = getParams(req.query);

  let articles;
  try {
    if (endpoint === 'everything') {
      const everythingParams = params as EverythingParams;
      articles = await fetchArticles(endpoint, everythingParams);
    } else if (endpoint === 'top-headlines') {
      const topHeadlinesParams = params as TopHeadlinesParams;
      articles = await fetchArticles(endpoint, topHeadlinesParams);
    }
  } catch (error) {
    res.status(500).end(`Error fetching news: ${error}`);
  }

  res.status(200).json(articles);
}

function getParams(query: {
  [key: string]: string | string[] | undefined;
}): EverythingParams | TopHeadlinesParams | undefined {
  const {
    sources,
    q,
    language,
    country,
    category,
    pageSize,
    page,
    qInTitle,
    searchIn,
    domains,
  } = query;

  if (sources || q || language || country || category || pageSize || page) {
    return {
      sources: sources as string,
      q: q as string,
      language: language as string,
      country: country as string,
      category: category as string,
      pageSize: Number(pageSize),
      page: Number(page),
    } as TopHeadlinesParams;
  } else if (qInTitle || searchIn || domains) {
    return {
      q: qInTitle as string,
      searchIn: searchIn as 'title' | 'description' | 'content',
      sources: sources as string,
      domains: domains as string,
      pageSize: Number(pageSize),
      page: Number(page),
      language: language as string,
    } as EverythingParams;
  } else {
    return undefined;
  }
}
