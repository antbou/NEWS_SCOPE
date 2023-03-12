import Card from '@/components/Card';
import { Inter } from '@next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main className="pt-8 flex flex-col gap-4">
      <div className="px-4">
        <div className="container grid grid-cols sm:grid-cols-2 md:grid-cols-3 gap-y-16 gap-x-10 justify-items-center">
          <Card
            imgUrl={''}
            title={'Test'}
            description={'Blablablabllba'}
          ></Card>
          <Card
            imgUrl={''}
            title={'Test'}
            description={'Blablablabllba'}
          ></Card>
          <Card
            imgUrl={''}
            title={'Test'}
            description={'Blablablabllba'}
          ></Card>
        </div>
      </div>
    </main>
  );
}
