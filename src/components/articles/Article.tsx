'use client';

import Card from '@/components/ui/Card';
import { Nullable } from '@/types/common';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Article as ArticleType } from '@/types/api/acticles';
import { useSession } from 'next-auth/react';
import { doc, setDoc, getDoc, deleteDoc } from 'firebase/firestore';
import { db } from '@/config/firebaseConfig';
import { Emoji } from './Emoji';

export const Article = ({
  article,
  removeItself,
}: {
  article: ArticleType;
  removeItself: boolean;
}) => {
  const { data: session } = useSession();

  const [shouldRemove, setShouldRemove] = useState(false);
  const [isFavoured, setIsFavoured] = useState(false);
  const [articleId, setArticleId] = useState<string | null>(null);

  useEffect(() => {
    if (!session?.user?.email || !article.url) return;

    setArticleId(btoa(encodeURIComponent(article.url + session.user.email)));
  }, [session, article.url]);

  useEffect(() => {
    if (!articleId) return;

    const getDocFromDb = async () => {
      const articleRef = doc(db, 'articles', articleId);
      const articleSnap = await getDoc(articleRef);
      articleSnap.exists() ? setIsFavoured(true) : setIsFavoured(false);
    };
    getDocFromDb();
  }, [articleId]);

  const httpsOnlyForImage = (urlToImage: Nullable<string>) =>
    urlToImage?.startsWith('https') ? urlToImage : './no-news.svg';

  const handleFavorite = async () => {
    if (!articleId || !session?.user?.email) return;

    const favoritesRef = doc(db, 'articles', articleId);

    try {
      if (isFavoured) {
        await deleteDoc(favoritesRef);
        setIsFavoured(false);
        if (removeItself) setShouldRemove(true);
      } else {
        const data = {
          title: article.title,
          url: article.url,
          urlToImage: article.urlToImage,
          userId: session.user.email,
        };
        await setDoc(favoritesRef, data);
        setIsFavoured(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (shouldRemove) return null;

  return (
    <Card>
      <>
        {session && (
          <div
            className={`absolute top-0 left-0 px-2 py-2 z-10 rounded-md flex space-x-2 items-center justify-center`}
          >
            <div
              className={`flex items-center justify-center ${
                isFavoured
                  ? 'text-amber-400 hover:text-red-900'
                  : 'text-gray-300 hover:text-amber-400'
              }`}
              onClick={handleFavorite}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="bi bi-bookmark w-8 h-8"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5zM8.16 4.1a.178.178 0 0 0-.32 0l-.634 1.285a.178.178 0 0 1-.134.098l-1.42.206a.178.178 0 0 0-.098.303L6.58 6.993c.042.041.061.1.051.158L6.39 8.565a.178.178 0 0 0 .258.187l1.27-.668a.178.178 0 0 1 .165 0l1.27.668a.178.178 0 0 0 .257-.187L9.368 7.15a.178.178 0 0 1 .05-.158l1.028-1.001a.178.178 0 0 0-.098-.303l-1.42-.206a.178.178 0 0 1-.134-.098L8.16 4.1z"
                />
              </svg>
            </div>
            <Emoji />
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
