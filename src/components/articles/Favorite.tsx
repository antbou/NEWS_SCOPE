import React, { useContext, useEffect, useState } from 'react';
import { ArticleContext } from './Article';

export const Favorite = () => {
  const useArticle = useContext(ArticleContext);
  const [isFavoured, setIsFavoured] = useState(useArticle.articleDb.isFavorite);

  const toggleFavorite = async () => {
    const articleDb = useArticle.articleDb;
    articleDb.isFavorite = !articleDb.isFavorite;
    useArticle.handleArticle(articleDb);
    setIsFavoured(articleDb.isFavorite);
  };

  return (
    <div
      className={`flex items-center justify-center ${
        isFavoured
          ? 'text-amber-400 hover:text-red-900'
          : 'text-gray-300 hover:text-amber-400'
      }`}
      onClick={() => toggleFavorite()}
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
  );
};
