import Image from 'next/image';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/config/auth';
import UserDropdown from '@/components/navbar/UserDropdown';
import { MobileMenu } from '@/components/navbar/MobileMenu';
import { Title } from '@/components/navbar/Title';

export default async function Navbar() {
  const session = await getServerSession(authOptions);

  return (
    <header className="outline outline-b-2 outline-gray-100 shadow-sm">
      <nav className=" flex items-center justify-center">
        <div className="container-fluid flex items-center h-navbar justify-between">
          <Title />
          <div className="grow flex justify-end items-center text-lg">
            <div className="hidden sm:flex gap-4">
              {session?.user ? (
                <>
                  <Link
                    href="/favorites"
                    className="flex my-2 items-center px-4 py-2 link"
                    shallow={false}
                  >
                    Favorites
                  </Link>
                  <UserDropdown src={session.user?.image ?? null} />
                </>
              ) : (
                <Link
                  href="/api/auth/signin"
                  className={'flex my-2 items-center px-4 py-2 link'}
                  shallow={false}
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
