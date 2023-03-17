import { fetchArticles } from '@/providers/news';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const articles = await fetchArticles();

  res.status(200).json(articles);
}
