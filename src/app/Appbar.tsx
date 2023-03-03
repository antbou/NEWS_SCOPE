"use client"

import { Navbar, Dropdown, Avatar, Button } from "flowbite-react";
import Image from "next/image";
import { useSession } from "next-auth/react"
import Link from 'next/link'



export default function Appbar() {

    const { data: session, status } = useSession()

    console.log("session", session)

    return (
        <Navbar
            fluid={true}
            rounded={true}
        >
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
                {!session && (
                    <>
                        <Button href="/api/auth/signin">
                            Login
                        </Button>
                    </>
                )}
                {session?.user && (
                    <Dropdown
                        label={session.user.image && (
                            <Avatar alt="User settings" img={session.user.image} rounded={true} />
                        )}
                    >
                        <Dropdown.Header>
                            <span className="block text-sm">
                                {session.user.name}
                            </span>
                            <span className="block truncate text-sm font-medium">
                                {session.user.email ?? session.user.name}
                            </span>
                        </Dropdown.Header>
                        <Dropdown.Item>
                            Dashboard
                        </Dropdown.Item>
                        <Dropdown.Item>
                            Settings
                        </Dropdown.Item>
                        <Dropdown.Item>
                            Earnings
                        </Dropdown.Item>
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
                <Navbar.Link href="/"
                >
                    Home
                </Navbar.Link>
                <Navbar.Link href="/">
                    About
                </Navbar.Link>
                <Navbar.Link href="/">
                    Services
                </Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    );
}