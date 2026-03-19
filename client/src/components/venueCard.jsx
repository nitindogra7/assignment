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
    <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden backdrop-blur-xl">
      <div className="grid md:grid-cols-2 gap-3 px-5 pt-5">
        <img
          src={images[0]}
          alt={name}
          className="w-full h-40 md:h-60 object-cover rounded-lg"
        />
        <img
          src={images[1]}
          alt={name}
          className="w-full h-40 md:h-60 object-cover rounded-lg"
        />
      </div>

      <div className="p-5 space-y-5">
        <div>
          <h2 className="text-xl font-semibold text-white">{name}</h2>
          <p className="text-sm text-gray-400">{location}</p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <Stat title="Cost" value={cost} />
          <Stat title="Per Person" value={perPerson} />
          <Stat title="Days" value={days} />
        </div>

        <div className="flex flex-wrap gap-2 text-xs">
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
    <div className="bg-accent/90 p-3 rounded-lg text-center">
      <p className="text-xs">{title}</p>
      <p className="text-lg font-semibold text-white">{value}</p>
    </div>
  );
}