import Image from 'next/image';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/config/auth';
import UserDropdown from '@/components/UserDropdown';
import { MobileMenu } from '@/components/MobileMenu';

export default async function Navbar() {
  const session = await getServerSession(authOptions);

  return (
    <header className="outline outline-b-2 outline-gray-100 shadow-sm">
      <nav className=" flex items-center justify-center">
        <div className="container-fluid flex items-center h-navbar justify-between">
          <Link href="/" className="text-xl link flex flex-row items-center ">
            <Image
              src={'./news.svg'}
              alt={'logo'}
              width={'48'}
              height={'48'}
            ></Image>
            <span className="px-4">News scope</span>
          </Link>
          <div className="grow flex justify-end items-center text-lg">
            <div className="hidden sm:flex gap-4">
              <Link
                href="/documentation"
                className="flex my-2 items-center px-4 py-2 link"
              >
                Favorites
              </Link>
              {session ? (
                <>
                  <UserDropdown src={session.user?.image ?? null} />
                </>
              ) : (
                <Link
                  href="/api/auth/signin"
                  className={'flex my-2 items-center px-4 py-2 link'}
                >
                  Sign in
                </Link>
              )}
            </div>
          </div>
          <div className="sm:hidden z-20">
            <MobileMenu />
          </div>
        </div>
      </nav>
    </header>
  );
}
