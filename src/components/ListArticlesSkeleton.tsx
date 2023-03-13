import React from 'react';

export const ArticleSkeleton = () => {
  return (
    <div className="container grid grid-cols lg:grid-cols-2 gap-x-10 gap-y-16 justify-items-center">
      {Array.from({ length: 6 }).map((item, index) => (
        <div className="grow w-full h-96 rounded-t-xl relative" key={index}>
          <div className="p-4 mx-auto border border-gray-300 rounded-md shadow h-full">
            <div className="flex space-x-4 animate-pulse">
              <div className="flex-1 py-1 space-y-4">
                <div className="w-full h-72 bg-gray-400 rounded"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-400 rounded"></div>
                  <div className="w-5/6 h-4 bg-gray-400 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
