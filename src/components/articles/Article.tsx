'use client';

import Card from '@/components/ui/Card';
import { Nullable } from '@/types/common';
import React, { createContext, useEffect, useState } from 'react';
import Image from 'next/image';
import { Article as ArticleType, ArticleDb } from '@/types/api/acticles';
import { useSession } from 'next-auth/react';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/config/firebaseConfig';
import { Emoji } from './Emoji';
import { Favorite } from './Favorite';

export const ArticleContext = createContext<{
  handleArticle: (article: ArticleDb) => void;
  articleDb: ArticleDb;
}>({
  handleArticle: () => {},
  articleDb: {} as ArticleDb,
});

export const Article = ({
  article,
  removeItself,
}: {
  article: ArticleType | ArticleDb;
  removeItself: boolean;
}) => {
  const { data: session } = useSession();

  const [shouldRemove, setShouldRemove] = useState(false);
  const [articleDb, setArticleDb] = useState<ArticleDb>();

  const httpsOnlyForImage = (urlToImage: Nullable<string>) =>
    urlToImage?.startsWith('https') ? urlToImage : './no-news.svg';

  useEffect(() => {
    if (!session?.user?.email || !article?.url) return;

    if (article.hasOwnProperty('userId')) {
      setArticleDb(article as ArticleDb);
      return;
    }

    const articleId = btoa(
      encodeURIComponent(article?.url + session?.user?.email)
    );

    const getArticleFromDb = async () => {
      const articleRef = doc(db, 'articles', articleId);

      const articleSnap = await getDoc(articleRef);

      if (articleSnap.exists()) {
        setArticleDb(articleSnap.data() as ArticleDb);
      } else {
        setArticleDb({
          url: article?.url,
          title: article.title,
          urlToImage: article.urlToImage,
          userId: session?.user?.email,
          isFavorite: false,
          emoji: '',
        } as ArticleDb);
      }
    };
    getArticleFromDb();
  }, [session, article]);

  // Handle article changes like favorite or emoji
  const handleArticle = async (article: ArticleDb) => {
    if (!session?.user?.email || !articleDb?.url) {
      return;
    }
    const createArticle = async (article: ArticleDb) => {
      const articleId = btoa(
        encodeURIComponent(article.url + session?.user?.email)
      );
      const articleRef = doc(db, 'articles', articleId);
      await setDoc(articleRef, article);
    };
    // @ts-ignore
    articleDb.timestamp = serverTimestamp();

    try {
      await createArticle(articleDb);
    } catch (error) {
      console.error(error);
    }

    // remove article from list if unfavorited
    if (!articleDb.isFavorite && removeItself) {
      setShouldRemove(true);
      setArticleDb(undefined);
    } else {
      setArticleDb(articleDb);
    }
  };

  if (shouldRemove) return null;

  return (
    <Card>
      <>
        {session?.user?.email && (
          <div
            className={`absolute top-0 left-0 px-2 py-2 z-10 rounded-md flex space-x-2 items-center justify-center`}
          >
            {articleDb && (
              <ArticleContext.Provider value={{ handleArticle, articleDb }}>
                <Favorite />
                <Emoji />
              </ArticleContext.Provider>
            )}
          </div>
        )}
        <Image
          src={httpsOnlyForImage(article.urlToImage)}
          onClick={() =>
            article.url ? window.open(article.url, '_blank') : null
          }
          className="z-2 w-full rounded-xl object-cover"
          alt="Article image"
          fill
          unoptimized={true}
          loading="lazy"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute bottom-0 left-0 right-0 px-4 py-2 bg-sky-800 opacity-90 rounded-md">
          <h3 className="text-xl text-white font-bold">{article.title}</h3>
        </div>
      </>
    </Card>
  );
};
