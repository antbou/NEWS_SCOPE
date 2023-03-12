import React from 'react';
import Navbar from './Navbar';

export default function SigninLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* @ts-expect-error Server Component */}
      <Navbar />

      <main className="container-fluid">{children}</main>
    </>
  );
}
