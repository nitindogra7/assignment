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
    <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden backdrop-blur-xl overflow">
      <div className="grid md:grid-cols-2 gap-3 px-5 pt-5 overflow-hidden">
        <img
          src={images[0]}
          alt={name}
          className="w-full h-40 md:h-60 object-cover rounded-lg hover:scale-[1.02] transition-transform duration-150"
        />
        <img
          src={images[1]}
          alt={name}
          className="w-full h-40 md:h-60 object-cover rounded-lg hover:scale-[1.02] transition-transform duration-150"
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

        <div className="w-full">
          <div className="flex flex-wrap gap-2 text-xs ">
            {amenities.map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-accent rounded-full whitespace-nowrap"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <p className="text-sm text-gray-400 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

function Stat({ title, value }) {
  return (
    <div className="bg-indigo-500 backdrop-blur-xl border border-white/10 p-4 rounded-xl text-center shadow-lg hover:scale-[1.02] transition-transform duration-300">
      <p className="text-xs text-white/60">{title}</p>
      <p className="text-lg font-semibold text-white">{value}</p>
    </div>
  );
}
