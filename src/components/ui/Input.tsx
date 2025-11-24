import React from 'react'
import clsx from 'clsx'

export const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
  const { className, ...rest } = props
  return (
    <input
      {...rest}
      className={clsx(
        'w-full rounded-xl border border-slate-500/40 px-3 py-2 bg-slate-950/60 text-slate-100 placeholder:text-slate-400 shadow-sm focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-500/30',
        className
      )}
    />
  )
}
