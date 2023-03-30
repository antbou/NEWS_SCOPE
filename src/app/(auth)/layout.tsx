import React from 'react';

export default function SigninLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-grow justify-center items-center">
      <div className="container flex justify-center items-center">
        {children}
      </div>
    </section>
  );
}
