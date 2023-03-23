'use client'; // Error components must be Client components

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <section className="flex items-center h-full p-16 ">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md text-center">
          <h4 className="mb-8 dark:text-gray-600">
            <span className="sr-only">Error</span>
            Something went wrong!
          </h4>
          <p className="mt-4 mb-8 dark:text-gray-400">
            But dont worry, you can find plenty of other things on our homepage.
          </p>
          <button
            onClick={
              // Attempt to recover by trying to re-render the segment
              () => reset()
            }
            className="px-8 py-3 font-semibold rounded shadow-md text-white bg-sky-600 hover:bg-sky-700"
          >
            Try again
          </button>
        </div>
      </div>
    </section>
  );
}
