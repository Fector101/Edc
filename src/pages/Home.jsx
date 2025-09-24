import React, { useState } from 'react'
import EntryList from '../components/EntryList'
import Modal from '../components/Modal'

export default function Home({ entries, onAdd }) {
  const [query, setQuery] = useState('')
  const [showCreate, setShowCreate] = useState(false)

  const filtered = entries.filter(e => {
    const q = query.trim().toLowerCase()
    if(!q) return true
    return (e.title||'').toLowerCase().includes(q) || (e.subtitle||'').toLowerCase().includes(q)
  })

  return (
    <div className="max-w-4xl mx-auto">
      <header className="text-center mb-6">
        <h1 className="text-3xl font-extrabold">Travel Journal <span className="text-xl">🇳🇬</span></h1>
        <p className="text-slate-600 mt-2">A personal collection of places you've visited. Add notes and photos.</p>
      </header>

      <div className="flex gap-3 justify-center mb-5">
        <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search through states or cities" className="flex-1 max-w-lg px-3 py-2 border rounded-md" />
        <button onClick={()=>setShowCreate(true)} className="bg-indigo-600 text-white px-4 rounded-md">Add new</button>
      </div>

      <h3 className="bg-indigo-600 text-white px-4 py-2 rounded-md w-2/3 mx-auto text-center mb-4">Travel Notes</h3>

      <EntryList entries={filtered} />

      {showCreate && (
        <Modal onClose={()=>setShowCreate(false)}>
          <CreateForm onSave={(data)=>{ onAdd(data); setShowCreate(false) }} onCancel={()=>setShowCreate(false)} />
        </Modal>
      )}
    </div>
  )
}

function CreateForm({ onSave, onCancel }){
  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [notes, setNotes] = useState('')
  const [rating, setRating] = useState('')

  return (
    <div>
      <h3 className="text-xl font-semibold mb-3">Add New Place</h3>
      <div className="flex flex-col gap-2">
        <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="City" className="border p-2 rounded" />
        <input value={subtitle} onChange={e=>setSubtitle(e.target.value)} placeholder="State" className="border p-2 rounded" />
        <input value={rating} onChange={e=>setRating(e.target.value)} placeholder="Rating (e.g. 4.5/5)" className="border p-2 rounded" />
        <textarea value={notes} onChange={e=>setNotes(e.target.value)} placeholder="Thoughts..." className="border p-2 rounded" />
        <div className="flex justify-end gap-2 mt-2">
          <button onClick={onCancel} className="px-3 py-1">Cancel</button>
          <button onClick={()=>onSave({ title, subtitle, notes, rating })} className="bg-indigo-600 text-white px-3 py-1 rounded">Save</button>
        </div>
      </div>
    </div>
  )
}
