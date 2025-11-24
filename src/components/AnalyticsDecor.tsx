import React from 'react'

export const AnalyticsDecor: React.FC<{ position?: 'left' | 'right'; className?: string }> = ({ position = 'left', className = '' }) => {
  const isLeft = position === 'left'
  const containerPos = isLeft ? 'left-0 -translate-x-1/2' : 'right-0 translate-x-1/2'

  return (
    <div className={`hidden md:block absolute top-1/2 transform -translate-y-1/2 ${containerPos} pointer-events-none z-0 ${className}`} aria-hidden>
      {/* subtle grouped SVG decorations: bars, line, dots (very low opacity for dark theme) */}
      <svg className="block opacity-6 text-white w-36 mb-4" viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="24" width="10" height="30" rx="1" fill="currentColor" />
        <rect x="24" y="10" width="10" height="44" rx="1" fill="currentColor" />
        <rect x="42" y="18" width="10" height="36" rx="1" fill="currentColor" />
        <rect x="60" y="6" width="10" height="48" rx="1" fill="currentColor" />
      </svg>
      <svg className="block opacity-6 text-white w-44 mb-3" viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polyline points="6,44 30,30 54,36 78,18 102,24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="30" cy="30" r="2.2" fill="currentColor" />
        <circle cx="78" cy="18" r="2.2" fill="currentColor" />
      </svg>
      <svg className="block opacity-6 text-white w-32" viewBox="0 0 80 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="2.5" fill="currentColor" />
        <circle cx="30" cy="30" r="2.5" fill="currentColor" />
        <circle cx="54" cy="42" r="2.5" fill="currentColor" />
        <circle cx="68" cy="18" r="2.5" fill="currentColor" />
      </svg>
    </div>
  )
}

export default AnalyticsDecor
