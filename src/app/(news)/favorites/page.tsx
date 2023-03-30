import React from 'react';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '@/config/firebaseConfig';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/config/auth';
import { Article } from '@/components/articles/Article';
import { redirect } from 'next/navigation';

export default async function Page() {
  const session = await getServerSession(authOptions);

  // @ts-ignore
  if (!session?.user?.id) {
    return redirect('/login');
  }

  const articlesRef = collection(db, 'articles');

  const q = query(
    articlesRef,
    where('isFavorite', '==', true),
    // @ts-ignore
    where('userId', '==', session?.user?.id),
    orderBy('timestamp', 'desc')
  );

  const articles = await getDocs(q);

  return (
    <section className="flex flex-col items-center w-full py-5">
      <div className="container grid grid-cols lg:grid-cols-2 gap-y-6 gap-x-6 justify-items-center divide-y-2">
        {articles?.docs?.map((article, index) => {
          return (
            <Article
              key={index}
              article={{
                title: article.data().title,
                url: article.data().url,
                urlToImage: article.data().urlToImage,
                userId: article.data().userId,
                isFavorite: article.data().isFavorite,
                emoji: article.data().emoji,
                timestamp: article.data().timestamp.toDate().toString(),
              }}
              removeItself={true}
            />
          );
        })}
        {articles?.docs?.length === 0 && (
          <div className="col-span-2 w-full text-center text-2xl font-bold text-gray-500 pt-10">
            No articles found
          </div>
        )}
      </div>
    </section>
  );
}
