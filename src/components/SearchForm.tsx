'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { useDebouncedCallback } from 'use-debounce';

export const SearchForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = React.useState('');

  const debounced = useDebouncedCallback(
    (search) => {
      // replace only q param not page param
      router.replace(`/?q=${search}`);
    },
    // delay in ms
    250
  );

  useEffect(() => {
    setSearch(searchParams.get('q') ?? '');
  }, [searchParams]);

  return (
    <form className="mt-12 w-full" onSubmit={(event) => event.preventDefault()}>
      <label
        htmlFor="search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only"
      >
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
          <svg
            aria-hidden="true"
            className="w-4 h-4 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <input
          type="search"
          id="search"
          className="block w-full p-3 pl-14 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Type to search"
          defaultValue={search}
          onChange={(e) => {
            debounced(e.target.value);
          }}
        />
      </div>
    </form>
  );
};
