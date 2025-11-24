import React from 'react'
import clsx from 'clsx'

export const Card: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => {
  return (
    <div
      className={clsx(
        'glass-card relative overflow-hidden rounded-2xl p-6',
        className
      )}
    >
      {children}
    </div>
  )
}
