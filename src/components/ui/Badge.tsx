import React from 'react'

export const Badge: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <span className="inline-flex items-center rounded-lg border border-slate-200/20 bg-slate-900/60 px-3 py-1 text-sm text-slate-100">{children}</span>
  )
}
