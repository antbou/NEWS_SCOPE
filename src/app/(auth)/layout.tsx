import React from 'react';

export default function SigninLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex container-fluid justify-center items-center min-h-screen ">
      {children}
    </section>
  );
}
