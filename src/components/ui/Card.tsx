import { ReactElement } from 'react';

const Card = ({ children }: { children: ReactElement }) => (
  <div className="flex flex-col w-full bg-gray-100 rounded-xl shadow hover:z-20 hover:cursor-pointer sm:hover:scale-105 transition ease-in-out p-2">
    <div className="grow h-96 rounded-t-xl relative">{children}</div>
  </div>
);

export default Card;
