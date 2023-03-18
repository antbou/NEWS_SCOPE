import { SearchForm } from '@/components/SearchForm';
import React from 'react';

export default function NewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="flex flex-grow flex-col items-center">
        <div className="container-fluid">
          <SearchForm />
          {children}
        </div>
      </main>
    </>
  );
}
