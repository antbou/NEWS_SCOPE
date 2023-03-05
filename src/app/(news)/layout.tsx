import React from "react";
import Appbar from "./Appbar";

export default function SigninLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Appbar />
      {children}
    </>
  );
}
