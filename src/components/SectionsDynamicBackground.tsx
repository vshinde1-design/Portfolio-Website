import React from 'react'

interface SectionsDynamicBackgroundProps {
  intensity?: number
}

// Lightweight SVG-based animated analytics background for all non-hero sections.
// It sits behind the section containers but above the page gradient.
const SectionsDynamicBackground: React.FC<SectionsDynamicBackgroundProps> = ({ intensity = 1 }) => {
  const clamped = Math.max(0.4, Math.min(1.6, intensity))

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <svg
        className="w-full h-full animate-[sections-bg-move_40s_linear_infinite] opacity-70"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* brighter cyan/teal strokes for network lines */}
          <linearGradient id="sections-line" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity={0.06 * clamped} />
            <stop offset="100%" stopColor="#ffffff" stopOpacity={0.12 * clamped} />
          </linearGradient>
          <radialGradient id="sections-node" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#ffffff" stopOpacity={0.36 * clamped} />
            <stop offset="100%" stopColor="#ffffff" stopOpacity={0} />
          </radialGradient>
        </defs>

        {/* soft diagonal bands to add structure */}
        <g>
          <rect x="-200" y="150" width="900" height="260" fill="url(#sections-line)" fillOpacity={0.06 * clamped} transform="rotate(-8 0 0)" />
          <rect x="400" y="520" width="900" height="260" fill="url(#sections-line)" fillOpacity={0.06 * clamped} transform="rotate(-12 0 0)" />
        </g>

        {/* network lines */}
        <g stroke="url(#sections-line)" strokeWidth="1.2">
          <polyline points="80,140 260,110 420,180 620,150 820,210 1040,190 1260,240" fill="none" />
          <polyline points="60,360 260,330 520,380 760,340 980,420 1220,390" fill="none" />
          <polyline points="120,620 340,580 560,640 780,600 1020,660 1280,640" fill="none" />
        </g>

        {/* glowing nodes along the lines */}
        <g>
          {[140, 260, 420, 620, 820, 1040, 1260].map((x, idx) => (
            <circle key={`top-${x}`} cx={x} cy={idx % 2 === 0 ? 140 : 190} r={10} fill="url(#sections-node)" />
          ))}
          {[60, 260, 520, 760, 980, 1220].map((x, idx) => (
            <circle key={`mid-${x}`} cx={x} cy={idx % 2 === 0 ? 360 : 410} r={9} fill="url(#sections-node)" />
          ))}
          {[120, 340, 560, 780, 1020, 1280].map((x, idx) => (
            <circle key={`bot-${x}`} cx={x} cy={idx % 2 === 0 ? 620 : 670} r={11} fill="url(#sections-node)" />
          ))}
        </g>

        {/* bright star scatter to give analytical constellation feel */}
        <g fill="#ffffff" fillOpacity={0.18 * clamped}>
          {[80, 220, 360, 520, 680, 840, 1000, 1180, 1340, 1400, 60, 300, 200, 460].map((x, i) => (
            <circle key={x + i} cx={x} cy={120 + (i % 4) * 160} r={2.6} />
          ))}
        </g>
      </svg>
    </div>
  )
}

export default SectionsDynamicBackground
