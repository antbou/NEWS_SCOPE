'use client';
import { useRouter, useSearchParams } from 'next/navigation';

import React from 'react';

const Pagination = ({
  articlesParPage,
  totalArticles,
  currentPage,
}: {
  articlesParPage: number;
  totalArticles: number;
  currentPage: number;
}) => {
  const pageNumbers = [];
  const router = useRouter();

  const paginate = (pageNumber: number) => {
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has('page')) searchParams.delete('page');
    searchParams.append('page', pageNumber.toString());
    router.push(`/?${searchParams.toString()}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  for (let i = 1; i <= Math.ceil(totalArticles / articlesParPage); i++) {
    pageNumbers.push(i);
  }
  const pageNumbersToShow = [];
  if (pageNumbers) {
    let showMax = 5;
    let endPage;
    let startPage;

    if (pageNumbers.length <= showMax) {
      startPage = 1;
      endPage = pageNumbers.length;
    } else {
      startPage = currentPage <= 3 ? 1 : currentPage - 3;
      if (
        currentPage != pageNumbers.length &&
        currentPage + 1 != pageNumbers.length
      ) {
        endPage = startPage + showMax - 1;
      } else {
        endPage = pageNumbers.length;
      }
    }

    endPage = Math.min(endPage, pageNumbers.length);
    for (let i = startPage; i <= endPage; i++) {
      pageNumbersToShow.push(i);
    }
  }
  return (
    <div aria-label="Pagination" className="flex items-center text-gray-600">
      {currentPage > 1 && (
        <a
          className="p-2 mr-4 rounded hover:bg-sky-100 cursor-pointer"
          onClick={() => paginate(currentPage - 1)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </a>
      )}
      {pageNumbersToShow.indexOf(1) < 0 && (
        <>
          <a
            className="px-4 py-2 rounded hover:bg-sky-100 cursor-pointer"
            onClick={() => paginate(1)}
          >
            1
          </a>

          {currentPage > 7 && (
            <a className="px-4 py-2 rounded hover:bg-sky-100 cursor-pointer">
              ...
            </a>
          )}
        </>
      )}
      {pageNumbersToShow.map((number) => (
        <a
          key={number}
          onClick={() => paginate(number)}
          className={
            'px-4 py-2 rounded cursor-pointer ' +
            (number == currentPage
              ? 'bg-sky-200 text-gray-900 font-medium hover:bg-sky-100'
              : 'hover:bg-sky-100')
          }
        >
          {number}
        </a>
      ))}
      {pageNumbersToShow.indexOf(pageNumbers.length) < 0 && (
        <>
          {currentPage < pageNumbers.length - 5 && (
            <a className="p-2 ml-4 rounded hover:bg-sky-100">...</a>
          )}

          <a
            className="p-2 ml-4 rounded hover:bg-sky-100 cursor-pointer"
            onClick={() => paginate(pageNumbers.length)}
          >
            {pageNumbers.length}
          </a>
        </>
      )}
      {currentPage < pageNumbers.length && (
        <a
          className="p-2 ml-4 rounded hover:bg-sky-100 cursor-pointer"
          onClick={() => paginate(Number(currentPage) + 1)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </a>
      )}
    </div>
  );
};

export default Pagination;
