import React from "react";

export default function EntryCard({ entry, onClick }) {
  return (
    <article
      onClick={onClick}
      className="cursor-pointer bg-white p-4 rounded-lg shadow hover:shadow-lg transition flex flex-col justify-between"
    >
      <div>
        <h3 className="font-bold text-lg">{entry.title}</h3>
        <h4 className="text-sm font-semibold text-slate-600">{entry.subtitle}</h4>
        <p className="text-sm text-slate-700 mt-2 line-clamp-3">{entry.notes}</p>
      </div>

      <div className="flex items-center justify-between mt-4">
        <span className="text-xs text-slate-500">{formatDate(entry.createdAt)}</span>
        <span className="text-xs text-slate-600">{entry.rating || ""}</span>
      </div>
    </article>
  );
}

function formatDate(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}