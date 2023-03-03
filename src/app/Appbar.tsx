"use client"

import { Navbar, Dropdown, Avatar, Button } from "flowbite-react";
import Image from "next/image";
import { useSession } from "next-auth/react"


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
                {status === "authenticated" && session.user ?
                    <Dropdown
                        arrowIcon={false}
                        inline={true}
                        label={<Avatar alt="User settings" img={session.user?.image} rounded={true} referrerpolicy="no-referrer" />}
                    >
                        <Dropdown.Header>
                            <span className="block text-sm">
                                Bonnie Green
                            </span>
                            <span className="block truncate text-sm font-medium">
                                name@flowbite.com
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
                            Sign out
                        </Dropdown.Item>
                    </Dropdown>
                    :
                    <Button href="/api/auth/signin">
                        Login
                    </Button>
                }
                <Navbar.Toggle />
            </div>
            {/* Navbar label */}
            <Navbar.Collapse>
                <Navbar.Link href=""
                >
                    Home
                </Navbar.Link>
                <Navbar.Link href="">
                    About
                </Navbar.Link>
                <Navbar.Link href="">
                    Services
                </Navbar.Link>
                <Navbar.Link href="">
                    Pricing
                </Navbar.Link>
                <Navbar.Link href="">
                    Contact
                </Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    );
}