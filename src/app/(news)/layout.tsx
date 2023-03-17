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

      <div className="container-fluid">{children}</div>
    </>
  );
}
