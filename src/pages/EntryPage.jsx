import React, { useState, useRef } from "react";
import Modal from "../components/Modal";

export default function EntryPage({ entry, onBack, onUpdate, onDelete }) {
  const [showEdit, setShowEdit] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const fileRef = useRef();
  
  if (!entry) {
    return (
      <div className="max-w-3xl mx-auto">
        <button onClick={onBack} className="text-indigo-600 mb-4">← Back</button>
        <p>Entry not found.</p>
      </div>
    );
  }
  
  const handleFile = async (file) => {
    if (!file) return;
    const dataUrl = await toDataUrl(file);
    const newPhotos = [...(entry.photos || []), dataUrl];
    onUpdate({ photos: newPhotos });
  };
  
  const removePhoto = (index) => {
    const newPhotos = (entry.photos || []).filter((_, i) => i !== index);
    onUpdate({ photos: newPhotos });
  };
  
  return (
    <div className="max-w-3xl mx-auto">
      <button onClick={onBack} className="text-indigo-600 mb-4">← Back to Travel Notes</button>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold">{entry.title}</h2>
        <h3 className="text-sm font-semibold text-slate-600">{entry.subtitle}</h3>

        <p className="mt-4 text-slate-700 whitespace-pre-line">{entry.notes}</p>

        <div className="mt-4">
          <span className="text-slate-500 text-xs">{formatDate(entry.createdAt)}</span>
          <span className="ml-3 text-slate-600 text-sm">{entry.rating}</span>
        </div>

        <div className="mt-6">
          <h4 className="font-semibold mb-2">Photos</h4>
          <div className="flex flex-wrap gap-3">
            {(entry.photos || []).map((src, i) => (
              <div key={i} className="relative group">
                <img src={src} alt={`photo-${i}`} className="w-40 h-28 object-cover rounded-md shadow" />
                <button
                  onClick={() => removePhoto(i)}
                  className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-7 h-7 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                >
                  ×
                </button>
              </div>
            ))}
            <div>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleFile(e.target.files[0])}/>
              <button onClick={() => fileRef.current.click()} className="px-3 py-2 bg-emerald-500 text-white rounded">
                + Add Photo
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button onClick={() => setShowConfirm(true)} className="px-3 py-1 bg-red-500 text-white rounded">Delete</button>
          <button onClick={() => setShowEdit(true)} className="px-3 py-1 bg-indigo-600 text-white rounded">Edit</button>
        </div>
      </div>

      {showConfirm && (
        <Modal onClose={() => setShowConfirm(false)}>
          <div>
            <h3 className="text-lg font-semibold mb-2">Delete this entry?</h3>
            <p>This action cannot be undone.</p>
            <div className="mt-4 flex justify-end gap-2">
              <button onClick={() => setShowConfirm(false)} className="px-3 py-1">Cancel</button>
              <button onClick={() => { onDelete(); setShowConfirm(false); }} className="px-3 py-1 bg-red-600 text-white rounded">Delete</button>
            </div>
          </div>
        </Modal>
      )}

      {showEdit && (
        <Modal onClose={() => setShowEdit(false)}>
          <EditForm entry={entry} onSave={(patch) => { onUpdate(patch); setShowEdit(false); }} onCancel={() => setShowEdit(false)} />
        </Modal>
      )}
    </div>
  );
}

function formatDate(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function toDataUrl(file) {
  return new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onload = (e) => res(e.target.result);
    reader.onerror = rej;
    reader.readAsDataURL(file);
  });
}

function EditForm({ entry, onSave, onCancel }) {
  const [title, setTitle] = useState(entry.title || "");
  const [subtitle, setSubtitle] = useState(entry.subtitle || "");
  const [notes, setNotes] = useState(entry.notes || "");
  const [rating, setRating] = useState(entry.rating || "");
  
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Edit Entry</h3>
      <div className="flex flex-col gap-2">
        <input value={title} onChange={e => setTitle(e.target.value)} className="border p-2 rounded" />
        <input value={subtitle} onChange={e => setSubtitle(e.target.value)} className="border p-2 rounded" />
        <input value={rating} onChange={e => setRating(e.target.value)} className="border p-2 rounded" placeholder="Rating (e.g. 4.5/5)" />
        <textarea value={notes} onChange={e => setNotes(e.target.value)} className="border p-2 rounded" />
        <div className="flex justify-end gap-2 mt-2">
          <button onClick={onCancel} className="px-3 py-1">Cancel</button>
          <button onClick={() => onSave({ title, subtitle, notes, rating })} className="px-3 py-1 bg-indigo-600 text-white rounded">Save</button>
        </div>
      </div>
    </div>
  );
}