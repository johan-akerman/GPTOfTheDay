export default function CarouselCard({ image, title, creator }) {
  return (
    <div className="bg-mediumBrown text-white font-semibold grid grid-cols-4 w-72 rounded-lg items-center py-3 px-4">
      <img className="w-12 aspect-square rounded-full" src={image} />
      <div className="col-span-3 text-left text-darkBrown ">
        <h1 className="truncate">{title}</h1>
        <h1 className="text-xs">By: {creator}</h1>
      </div>
    </div>
  );
}
