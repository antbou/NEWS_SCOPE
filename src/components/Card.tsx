import Image from 'next/image';

type Props = {
  imgUrl: string;
  title: string;
  description: string;
};

const Card = ({ imgUrl, title, description }: Props) => (
  <div className="flex flex-col w-full bg-gray-100 rounded-xl shadow drop-shadow-lg hover:cursor-pointer hover:scale-105 transition ease-in-out">
    <div className="grow h-64 rounded-t-xl relative ">
      <Image
        src="./no-news.svg"
        className="h-full w-full rounded-t-xl p-2"
        alt="Book cover"
        fill
      />
    </div>
    <div className="absolute bottom-0 left-0 right-0 px-4 py-2 bg-sky-800 opacity-90">
      <h3 className="text-xl text-white font-bold">{title}</h3>
      <p className="mt-2 text-sm text-white ">{description}</p>
    </div>
  </div>
);

export default Card;
