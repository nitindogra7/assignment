import Dashboard from "./components/dashboard";
import { Routes, Route } from "react-router-dom";
export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/:id" element={<Dashboard />} />
      </Routes>
    </div>
  );
}
