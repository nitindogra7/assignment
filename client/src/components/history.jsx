import { X, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import Loading from "./laoding";

export default function History({ open, setOpen, items, loading }) {
  return (
    <aside
      className={`fixed md:relative z-50 top-0 left-0 h-full w-64 bg-secondary/95 border-r overflow-scroll border-white/10 p-5 transition-transform duration-300
      ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
    >
      <div className="flex items-center justify-between mb-5 md:hidden">
        <h2 className="text-base font-semibold text-white">History</h2>
        <button onClick={() => setOpen(false)}>
          <X size={18} />
        </button>
      </div>

      <h2 className="hidden md:block text-base font-semibold mb-5 text-white">
        History
      </h2>

      <Link to="/">
        <button className="w-full flex items-center justify-center gap-2 mb-5 px-3 py-2 rounded-lg bg-accent text-white text-sm font-medium hover:opacity-90 transition">
          <Plus size={16} />
          New Chat
        </button>
      </Link>

      <div className="space-y-3 text-sm">
        {loading ? (
          <Loading text="Loading..." />
        ) : (
          items.map((item) => (
            <Link to={`/${item.id}`} className="m-1" key={item.id}>
              <div className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition cursor-pointer">
                {item.title}
              </div>
            </Link>
          ))
        )}
      </div>
    </aside>
  );
}