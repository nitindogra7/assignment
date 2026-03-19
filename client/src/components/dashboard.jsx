import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import VenueCard from "../components/venueCard";
import History from "../components/history";
import api from "../apis/api";
import { useNavigate, useParams } from "react-router-dom";
export default function Dashboard() {
  const [prompt, setPrompt] = useState("");
  const [open, setOpen] = useState(false);
  const [response, setResponse] = useState(null);
  const [historyItems, setHistoryItems] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  async function fetchHistory() {
    try {
      const res = await api.get("/api/history");
      const formatted = res.data.data.map((item) => ({
        id: item._id,
        title: item.name,
      }));

      setHistoryItems(formatted);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    if (!id) return setResponse(null);
    async function fetchData() {
      try {
        const res = await api.get(`/api/event/${id}`);
        setResponse(res.data.data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, [id]);

  useEffect(() => {
    fetchHistory();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!prompt.trim()) return;

    try {
      const res = await api.post("/api/event", { prompt });
      const data = res.data.data;
      console.log(data);
      setResponse(data.data);
      fetchHistory();
      navigate(`/${data._id}`);
      setPrompt("");
    } catch (err) {
      console.error(err);
    }
  }

  const venueData = response
    ? {
        name: response.name,
        location: response.location,
        images: response.images,
        cost: response.cost,
        perPerson: response.perPerson,
        days: response.days,
        amenities: response.amenities || [],
        description: response.description,
      }
    : null;

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
        <History open={open} setOpen={setOpen} items={historyItems} />

        <main className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto px-4 sm:px-6 md:px-10 py-6 space-y-5">
            <p className="text-sm text-gray-400">
              Plan corporate offsites with{" "}
              <span className="text-accent font-medium">
                AI-powered venue insights
              </span>
            </p>

            {!response ? (
              <h1 className="text-gray-500 text-sm">
                Type a prompt to generate event plan
              </h1>
            ) : (
              <VenueCard {...venueData} />
            )}
          </div>

          <div className="border-t border-white/10 bg-secondary/80 px-3 sm:px-6 md:px-10 py-3">
            <form
              onSubmit={handleSubmit}
              className="max-w-3xl mx-auto flex items-center gap-2 sm:gap-3 bg-white/5 border border-white/10 rounded-lg px-3 sm:px-4 py-2 sm:py-3"
            >
              <input
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
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
