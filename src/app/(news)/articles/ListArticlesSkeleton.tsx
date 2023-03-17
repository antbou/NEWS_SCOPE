import Card from '@/components/Card';

export const ArticleSkeleton = () => {
  return (
    <>
      {Array.from({ length: 6 }).map((item, index) => (
        <Card key={index}>
          <div className="flex space-x-4 animate-pulse">
            <div className="flex-1 py-1 space-y-4">
              <div className="w-full h-72 bg-gray-400 rounded"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-400 rounded"></div>
                <div className="w-5/6 h-4 bg-gray-400 rounded"></div>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </>
  );
};
