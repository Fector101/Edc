import React, { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import EntryPage from './pages/EntryPage'
import { loadEntries, saveEntries } from './lib/storage'

export default function App(){
  const [entries, setEntries] = useState([])
  const navigate = useNavigate()

  useEffect(()=> {
    setEntries(loadEntries())
  }, [])

  useEffect(()=> {
    saveEntries(entries)
  }, [entries])

  const addEntry = (entry) => {
    const newEntry = { id: Date.now().toString(), createdAt: new Date().toISOString(), photos: [], ...entry }
    setEntries(prev => [newEntry, ...prev])
    navigate(`/entry/${newEntry.id}`)
  }

  const updateEntry = (id, patch) => {
    setEntries(prev => prev.map(e => e.id === id ? { ...e, ...patch } : e))
  }

  const deleteEntry = (id) => {
    setEntries(prev => prev.filter(e => e.id !== id))
    navigate('/')
  }

  return (
    <div className="min-h-screen p-6">
      <Routes>
        <Route path="/" element={<Home entries={entries} onAdd={addEntry} />} />
        <Route path="/entry/:id" element={<EntryPage entries={entries} onUpdate={updateEntry} onDelete={deleteEntry} />} />
      </Routes>
    </div>
  )
}
