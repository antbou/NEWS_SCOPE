import React, { useContext, useState } from 'react';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { ArticleContext } from './Article';

export const Emoji = () => {
  const useArticle = useContext(ArticleContext);

  const [isOpen, setIsOpen] = useState(false);
  const [emoji, setEmoji] = useState(useArticle.articleDb.emoji);

  const toggleEmoji = async (emoji: string) => {
    setIsOpen(false);
    setEmoji(emoji);
    const articleDb = useArticle.articleDb;
    articleDb.emoji = emoji;
    useArticle.handleArticle(articleDb);
  };

  return (
    <div className={`flex items-center justify-center relative`}>
      <div
        className="flex items-center justify-center text-gray-300 hover:text-amber-400"
        onClick={() => setIsOpen(true)}
      >
        {emoji ? (
          <span className="text-3xl">{emoji}</span>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="bi bi-egg-fried h-8 w-8"
            viewBox="0 0 16 16"
          >
            <path d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
            <path d="M13.997 5.17a5 5 0 0 0-8.101-4.09A5 5 0 0 0 1.28 9.342a5 5 0 0 0 8.336 5.109 3.5 3.5 0 0 0 5.201-4.065 3.001 3.001 0 0 0-.822-5.216zm-1-.034a1 1 0 0 0 .668.977 2.001 2.001 0 0 1 .547 3.478 1 1 0 0 0-.341 1.113 2.5 2.5 0 0 1-3.715 2.905 1 1 0 0 0-1.262.152 4 4 0 0 1-6.67-4.087 1 1 0 0 0-.2-1 4 4 0 0 1 3.693-6.61 1 1 0 0 0 .8-.2 4 4 0 0 1 6.48 3.273z" />
          </svg>
        )}
      </div>
      {isOpen && (
        <div className="absolute top-0 left-0 -mt-4 h-full z-20 w-full">
          <Picker
            styles={{ background: 'red' }}
            data={data}
            onEmojiSelect={(emoji: {
              native: React.SetStateAction<string>;
            }) => {
              toggleEmoji(emoji.native.toString());
            }}
            onClickOutside={() => setIsOpen(false)}
            theme={'light'}
          />
        </div>
      )}
    </div>
  );
};
