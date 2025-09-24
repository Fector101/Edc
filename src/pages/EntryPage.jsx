import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function EntryPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [entries, setEntries] = useState([]);
  const [entry, setEntry] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("entries")) || [];
    setEntries(saved);
    const found = saved.find((e) => e.id === id);
    setEntry(found);
  }, [id]);

  function handleDelete() {
    const updated = entries.filter((e) => e.id !== id);
    localStorage.setItem("entries", JSON.stringify(updated));
    navigate("/");
  }

  if (!entry) return <p>Entry not found</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">{entry.title}</h1>
      <h2 className="text-gray-600">{entry.location}</h2>
      <p className="mt-4">{entry.rating}</p>
      <p className="text-sm text-gray-500">{entry.date}</p>

      <div className="mt-6 flex gap-2">
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Delete
        </button>
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Back
        </button>
      </div>
    </div>
  );
}
