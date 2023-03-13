import Image from 'next/image';

type Props = {
  imgUrl: string | null;
  title: string | null;
  description: string | null;
};

// check if image is https only
// if not, use a default image
const httpsOnly = (imgUrl: string | null) => {
  if (imgUrl?.startsWith('https')) {
    return imgUrl;
  } else {
    return './no-news.svg';
  }
};

const Card = ({ imgUrl, title, description }: Props) => (
  <div className="flex flex-col w-full bg-gray-100 rounded-xl shadow drop-shadow-lg hover:cursor-pointer hover:scale-105 transition ease-in-out p-2">
    <div className="grow h-96 rounded-t-xl relative ">
      <Image
        src={httpsOnly(imgUrl)}
        className="h-full w-full rounded-xl"
        alt="Article image"
        fill
        loading="lazy"
        sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
      />
    </div>
    <div className="absolute bottom-2 left-2 right-2 px-4 py-2 bg-sky-800 opacity-90 rounded-md">
      <h3 className="text-xl text-white font-bold">{title}</h3>
    </div>
  </div>
);

export default Card;
