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
        <div className="container-fluid flex flex-col flex-grow items-center">
          {children}
        </div>
      </main>
    </>
  );
}
