import { useState } from "react";
import { Menu } from "lucide-react";
import VenueCard from "../components/venueCard";
import History from "../components/history";

export default function Dashboard() {
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    console.log(input);
    setInput("");
  }

  const venueData = {
    name: "Himalayan Heights Resort",
    location: "Manali, Himachal Pradesh",
    images: [
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    ],
    cost: "₹3.8L",
    perPerson: "₹38K",
    days: "3",
    amenities: ["Mountain", "WiFi", "Hall", "Bonfire"],
    description:
      "Perfect mix of scenic environment and professional setup for team collaboration.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure, quo odit velit cupiditate pariatur explicabo, maxime praesentium perspiciatis recusandae minima expedita nobis sed modi sequi dolores soluta commodi architecto odio? Odit quae quaerat eius voluptatem, adipisci placeat laboriosam nihil cupiditate perspiciatis officia natus? Laborum sit qui, sed sint tenetur veritatis vitae, saepe officia ab dignissimos excepturi fuga accusantium ipsum quae! Quo quia, nostrum exercitationem id voluptates suscipit atque aperiam animi dicta dolorum, ducimus, dignissimos ut eum nisi natus. Omnis alias vel culpa facilis consequuntur. Cum et cumque nemo? Necessitatibus, rem. Ea, nulla quaerat quae quod laudantium rerum mollitia. Ducimus cupiditate, nesciunt dicta exercitationem eius laborum sunt perferendis eum et dolorem illo iste dolore, in suscipit. Accusantium et expedita sint possimus. Molestias voluptates nisi maiores, est dolor possimus fuga sunt perferendis? Cum illo quos saepe quaerat temporibus. Laborum ipsa quis dolorem, pariatur eum id aliquam, optio cupiditate aliquid explicabo tenetur accusantium.",
  };

  const [historyItems, setHistoryItems] = useState([
    "Leadership retreat in Manali",
    "Corporate offsite in Goa",
    "Budget team outing",
  ]);
  function newChat() {
    setHistoryItems((prev) => ["New Chat", ...prev]);
  }

  return (
    <div className="h-screen flex flex-col bg-primary text-gray-200">
      <nav className="flex items-center justify-between px-4 md:px-8 py-4 border-b border-white/10 bg-secondary/80 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <button className="md:hidden" onClick={() => setOpen(true)}>
            <Menu size={20} />
          </button>
          <h1 className="text-base md:text-lg font-semibold text-white">
            AI Event Concierge
          </h1>
        </div>

        <p className="hidden md:block text-sm text-gray-400">
          Plan smarter with AI
        </p>
      </nav>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
        />
      )}

      <div className="flex flex-1 overflow-hidden">
        <History
          open={open}
          setOpen={setOpen}
          items={historyItems}
          newChat={newChat}
        />

        <main className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto px-4 sm:px-6 md:px-10 py-6 space-y-5">
            <p className="text-sm text-gray-400">
              Plan corporate offsites with{" "}
              <span className="text-accent font-medium">
                AI-powered venue insights
              </span>
            </p>

            <VenueCard {...venueData} />
          </div>

          <div className="border-t border-white/10 bg-secondary/80 px-3 sm:px-6 md:px-10 py-3">
            <form
              onSubmit={handleSubmit}
              className="max-w-3xl mx-auto flex items-center gap-2 sm:gap-3 bg-white/5 border border-white/10 rounded-lg px-3 sm:px-4 py-2 sm:py-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Describe your event..."
                className="flex-1 min-w-0 bg-transparent outline-none placeholder-gray-500 text-sm"
              />

              <button
                type="submit"
                className="shrink-0 px-3 sm:px-4 py-2 rounded-md bg-accent text-white text-sm whitespace-nowrap"
              >
                Generate
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
