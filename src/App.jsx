import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import EntryPage from "./pages/EntryPage";

import React, { useState, useEffect } from "react";
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
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/entry/:id" element={<EntryPage />} />
      </Routes>
      
    </div>
  );
}