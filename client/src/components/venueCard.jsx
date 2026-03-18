export default function VenueCard({
  name,
  location,
  images,
  cost,
  perPerson,
  days,
  amenities,
  description,
}) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">

      <div className="w-full h-fit md:flex grid grid-cols-2 grid-rows-1 md:gap-7 gap-2 sm:h-44 md:h-60 overflow-hidden px-5 pt-5">
        <img
          src={images[0]}
          alt={name}
          className="md:w-[50%] w-full h-full object-cover rounded-lg"
        />
        <img
          src={images[1]}
          alt={name}
          className="md:w-[50%] h-full w-full object-cover rounded-lg"
        />
      </div>

      <div className="p-5 space-y-4">

        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-semibold text-white">
              {name}
            </h2>
            <p className="text-sm text-gray-400">
              {location}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <Stat title="Cost" value={cost} />
          <Stat title="Per Person" value={perPerson} />
          <Stat title="Days" value={days} />
        </div>

        <div className="flex flex-wrap gap-2 text-sm">
          {amenities.map((tag, i) => (
            <span key={i} className="px-3 py-1 bg-white/10 rounded-full">
              {tag}
            </span>
          ))}
        </div>

        <p className="text-sm text-gray-400 leading-relaxed">
          {description}
        </p>

      </div>
    </div>
  );
}

function Stat({ title, value }) {
  return (
    <div className="bg-accent p-3 rounded-lg text-center flex flex-col justify-around">
      <p className="text-sm ">{title}</p>
      <p className="text-lg font-semibold text-white">{value}</p>
    </div>
  );
}