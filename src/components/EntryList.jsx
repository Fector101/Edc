import React from "react";
import EntryCard from "./EntryCard";

export default function EntryList({ entries, onOpenEntry }) {
  if (!entries.length) {
    return <p className="text-center text-slate-500">No entries yet — add your first place.</p>;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {entries.map(e => (
        <EntryCard key={e.id} entry={e} onClick={() => onOpenEntry(e.id)} />
      ))}
    </div>
  );
}
