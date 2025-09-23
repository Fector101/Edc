import React, { useState, useEffect } from "react";
import Home from "./pages/Home";
import EntryPage from "./pages/EntryPage";
import { loadEntries, saveEntries } from "./lib/storage";

export default function App() {
  const [entries, setEntries] = useState([]);
  const [view, setView] = useState({ name: "home" }); // or {name:'entry', id}

  useEffect(() => {
    setEntries(loadEntries());
  }, []);

  useEffect(() => {
    saveEntries(entries);
  }, [entries]);

  const addEntry = (entry) => {
    const newEntry = { id: Date.now().toString(), createdAt: new Date().toISOString(), photos: [], ...entry };
    setEntries(prev => [newEntry, ...prev]);
    return newEntry.id;
  };

  const updateEntry = (id, patch) => {
    setEntries(prev => prev.map(e => e.id === id ? { ...e, ...patch } : e));
  };

  const deleteEntry = (id) => {
    setEntries(prev => prev.filter(e => e.id !== id));
  };

  return (
    <div className="min-h-screen p-6">
      {view.name === "home" && (
        <Home
          entries={entries}
          onOpenEntry={(id) => setView({ name: "entry", id })}
          onAddEntry={(entry) => {
            const id = addEntry(entry);
            setView({ name: "entry", id });
          }}
        />
      )}

      {view.name === "entry" && (
        <EntryPage
          entry={entries.find(e => e.id === view.id)}
          onBack={() => setView({ name: "home" })}
          onUpdate={(patch) => updateEntry(view.id, patch)}
          onDelete={() => {
            deleteEntry(view.id);
            setView({ name: "home" });
          }}
        />
      )}
    </div>
  );
}
