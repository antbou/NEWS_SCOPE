"use client";

import { Navbar, Dropdown, Avatar, Button } from "flowbite-react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Appbar() {
  const { data: session, status } = useSession();

  const loading = status === "loading";

  console.log("session", session?.user);

  return (
    <Navbar fluid={true} rounded={true}>
      {/* Logo */}
      <Navbar.Brand href="">
        <Image
          src="/news.svg"
          className="mr-3 h-6 sm:h-9"
          alt="News scope logo"
          width={48}
          height={48}
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          News Scope
        </span>
      </Navbar.Brand>
      {/*  User settings */}
      <div className="flex md:order-2">
        <div className="flex items-center">
          {/* Loading state */}
          {loading && (
            <>
              <div role="status" className="animate-pulse">
                <Avatar
                  alt="User loading"
                  img={""}
                  rounded={true}
                  size="md"
                  className="w-20"
                />
                <span className="sr-only">Loading...</span>
              </div>
            </>
          )}
          {!session && !loading && (
            <>
              <Button
                href="/api/auth/signin"
                style={{ height: "2.5rem" }}
                className="w-20"
              >
                Login
              </Button>
            </>
          )}
        </div>
        {session?.user && (
          <Dropdown
            arrowIcon={false}
            inline={true}
            className="border-1 border-gray-300"
            label={
              <Avatar
                alt="User settings"
                img={
                  session.user && session.user.image
                    ? (props) => (
                        <img
                          referrerPolicy="no-referrer"
                          src={session.user?.image ?? ""}
                          {...props}
                        />
                      )
                    : undefined
                }
                rounded={true}
                className="w-20"
              />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">{session.user.name}</span>
              <span className="block truncate text-sm font-medium">
                {session.user.email ?? session.user.name}
              </span>
            </Dropdown.Header>
            <Dropdown.Item>Dashboard</Dropdown.Item>
            <Dropdown.Item>Settings</Dropdown.Item>
            <Dropdown.Item>Earnings</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>
              <Link href="/api/auth/signout">Sign out</Link>
            </Dropdown.Item>
          </Dropdown>
        )}
        <Navbar.Toggle />
      </div>
      {/* Navbar label */}
      <Navbar.Collapse>
        <Navbar.Link href="/">Home</Navbar.Link>
        <Navbar.Link href="/">About</Navbar.Link>
        <Navbar.Link href="/">Services</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
