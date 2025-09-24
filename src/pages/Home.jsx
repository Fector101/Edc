import { useState, useEffect } from "react";
import EntryCard from "../components/EntryCard";

export default function Home() {
  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem("entries");
    return saved ? JSON.parse(saved) : [];
  });
  const [newEntry, setNewEntry] = useState({
    title: "",
    location: "",
    rating: "",
    date: "",
  });

  useEffect(() => {
    localStorage.setItem("entries", JSON.stringify(entries));
  }, [entries]);

  function handleAddEntry(e) {
    e.preventDefault();
    if (!newEntry.title || !newEntry.location || !newEntry.rating) return;
    setEntries([
      ...entries,
      { ...newEntry, id: Date.now().toString() },
    ]);
    setNewEntry({ title: "", location: "", rating: "", date: "" });
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Travel Journal</h1>

      <form onSubmit={handleAddEntry} className="space-y-2 mb-6">
        <input
          type="text"
          placeholder="Place title"
          value={newEntry.title}
          onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Location"
          value={newEntry.location}
          onChange={(e) => setNewEntry({ ...newEntry, location: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <textarea
          placeholder="Your experience..."
          value={newEntry.rating}
          onChange={(e) => setNewEntry({ ...newEntry, rating: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <input
          type="date"
          value={newEntry.date}
          onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Add Entry
        </button>
      </form>

      <div>
        {entries.length === 0 ? (
          <p className="text-gray-500">No entries yet.</p>
        ) : (
          entries.map((entry) => <EntryCard key={entry.id} entry={entry} />)
        )}
      </div>
    </div>
  );
}
