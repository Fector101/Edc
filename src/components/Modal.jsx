import React from 'react'

export default function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose}></div>
      <div className="relative bg-white rounded-lg p-6 z-50 w-full max-w-md shadow-lg">
        {children}
      </div>
    </div>
  )
}
