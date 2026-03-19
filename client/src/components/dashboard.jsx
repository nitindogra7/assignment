import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import VenueCard from "../components/venueCard";
import History from "../components/history";
import api from "../apis/api";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../components/laoding";

export default function Dashboard() {
  const [prompt, setPrompt] = useState("");
  const [open, setOpen] = useState(false);
  const [response, setResponse] = useState(null);
  const [historyItems, setHistoryItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  async function fetchHistory() {
    setHistoryLoading(true);
    try {
      const res = await api.get("/api/history");
      const formatted = res.data.data.map((item) => ({
        id: item._id,
        title: item.name,
      }));
      setHistoryItems(formatted);
    } catch (err) {
      console.error(err);
    } finally {
      setHistoryLoading(false);
    }
  }

  useEffect(() => {
    if (!id) return setResponse(null);

    async function fetchData() {
      try {
        setLoading(true);
        const res = await api.get(`/api/event/${id}`);
        setResponse(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  useEffect(() => {
    fetchHistory();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (prompt.trim().length < 40) {
      setError(true);
      return;
    }

    setError(false);

    setLoading(true);
    try {
      const res = await api.post("/api/event", { prompt });
      const data = res.data.data;

      setResponse(data);
      setPrompt("");

      fetchHistory();

      navigate(`/${data._id}`);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
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
    <div className="h-dvh flex flex-col overflow-hidden bg-primary text-gray-200">
      <nav className="shrink-0 flex items-center justify-between px-4 md:px-8 py-6 border-b border-white/10 bg-secondary/80 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <button className="md:hidden" onClick={() => setOpen(true)}>
            <Menu size={25} />
          </button>
          <h1 className="text-xl md:text-xl font-semibold text-white">
            AI Event <span className="text-accent">Concierge</span>
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

      <div className="flex flex-1 min-h-0">
        <History
          open={open}
          setOpen={setOpen}
          items={historyItems}
          loading={historyLoading}
        />

        <main className="flex-1 flex flex-col min-h-0">
          <div className="flex-1 overflow-y-auto px-4 sm:px-6 md:px-10 py-6">
            {loading ? (
              <Loading text="Finding best venue for you..." />
            ) : (
              <div className="max-w-5xl mx-auto space-y-6">
                {!response ? (
                  <div className="flex flex-col items-center justify-center text-center mt-16 space-y-8">
                    <div className="relative">
                      <div className="absolute inset-0 bg-accent/20 blur-3xl rounded-full"></div>
                      <div className="relative w-16 h-16 rounded-2xl bg-accent/10 border border-white/10 flex items-center justify-center backdrop-blur-xl">
                        <span className="text-xl">✨</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h1 className="text-2xl md:text-3xl font-semibold text-white">
                        Smart Event Planning Starts Here
                      </h1>
                      <p className="text-gray-400 max-w-md text-sm md:text-base">
                        Describe your event and get AI-powered venue
                        recommendations with pricing, amenities, and curated
                        experiences.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-w-lg">
                      {[
                        "Corporate offsite in Manali",
                        "Beach team retreat Goa",
                        "Luxury wedding venue Jaipur",
                        "Startup meetup Delhi",
                        "Budget trip for 20 people",
                        "Mountain resort 3 days",
                      ].map((example, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            setPrompt(example);
                            setError(false);
                          }}
                          className="text-left px-3 py-2 text-xs sm:text-sm bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition backdrop-blur-xl"
                        >
                          {example}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <VenueCard {...venueData} />
                )}
              </div>
            )}
          </div>

          <div className="max-w-3xl mx-auto px-4 mb-1">
            {error ? (
              <p className="text-xs text-red-400">
                Prompt should include location, budget, people & be 40+
                characters
              </p>
            ) : (
              <p className="text-xs text-gray-400">
                Example: Plan a Goa offsite corporate for 20 people under ₹40k
              </p>
            )}
          </div>
          <div className="shrink-0 border-t border-white/10 bg-secondary/80 px-3 sm:px-6 md:px-10 py-3">
            <form
              onSubmit={handleSubmit}
              className="max-w-3xl mx-auto flex items-center gap-3 bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus-within:ring-1 focus-within:ring-accent"
            >
              <input
                onClick={() => setError(false)}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your event..."
                className="flex-1 bg-transparent outline-none text-sm placeholder-gray-500"
              />

              <button className="px-4 py-2 rounded-md bg-accent text-white text-sm hover:opacity-90 transition">
                Generate
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
