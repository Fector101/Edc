import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import EntryPage from "./pages/EntryPage";

export default function App() {
  return (
    <div className="max-w-3xl mx-auto p-4">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/entry/:id" element={<EntryPage />} />
      </Routes>
    </div>
  );
}
