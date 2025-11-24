import React from 'react'

type Variant = 'experience' | 'projects' | 'skills' | 'education' | 'contact' | 'default'

const BarChartSvg: React.FC<{ className?: string }> = ({ className = '' }) => {
  // decorative bar chart removed per user request
  return null
}

const LineChartSvg: React.FC<{ className?: string }> = ({ className = '' }) => {
  // decorative line chart removed per user request
  return null
}

const DotsSvg: React.FC<{ className?: string }> = ({ className = '' }) => {
  // decorative dots removed per user request
  return null
}

export const SectionDataBackdrop: React.FC<{ variant?: Variant; className?: string; intensity?: number }> = ({ variant = 'default', className = '', intensity = 1 }) => {
  // density/opacity tweaks per variant
  const variantMap: Record<Variant, number> = {
    experience: 1.0,
    projects: 0.95,
    skills: 0.9,
    education: 0.85,
    contact: 0.9,
    default: 0.92
  }

  const baseMul = variantMap[variant] ?? 0.9
  const opacityMul = baseMul * Math.max(0.25, Math.min(1.6, intensity))

  // Split layouts into left and right side decorations
  const leftLayouts = [
    { x: '-420px', y: '8%', scale: 0.9, rotate: -6, opacity: 0.15, type: 'line' },
    { x: '-480px', y: '35%', scale: 0.85, rotate: 4, opacity: 0.18, type: 'line' },
    { x: '-520px', y: '62%', scale: 1.05, rotate: -3, opacity: 0.12, type: 'dots' },
    { x: '-460px', y: '88%', scale: 0.95, rotate: 2, opacity: 0.14, type: 'line' }
  ]

  const rightLayouts = [
    { x: '420px', y: '12%', scale: 1.1, rotate: 6, opacity: 0.16, type: 'line' },
    { x: '500px', y: '42%', scale: 0.8, rotate: -4, opacity: 0.14, type: 'line' },
    { x: '560px', y: '70%', scale: 0.9, rotate: 5, opacity: 0.13, type: 'dots' },
    { x: '460px', y: '92%', scale: 1.0, rotate: -2, opacity: 0.15, type: 'line' }
  ]

  return (
    <>
      {/* Left side decorations */}
      <div className={`hidden xl:block absolute left-0 top-0 bottom-0 pointer-events-none z-0 ${className}`} aria-hidden style={{ width: '560px' }}>
        {leftLayouts.map((l, i) => {
          const style: React.CSSProperties = {
            position: 'absolute',
            left: l.x,
            top: l.y,
            transform: `scale(${l.scale}) rotate(${l.rotate}deg)`,
            opacity: l.opacity * opacityMul
          }

          const svgClass = 'text-teal-300/70 w-32 xl:w-48'

          return (
            <div key={`left-${i}`} style={style}>
              {l.type === 'bars' && <BarChartSvg className={svgClass} />}
              {l.type === 'line' && <LineChartSvg className={svgClass} />}
              {l.type === 'dots' && <DotsSvg className={svgClass} />}
            </div>
          )
        })}
      </div>

      {/* Right side decorations */}
      <div className={`hidden xl:block absolute right-0 top-0 bottom-0 pointer-events-none z-0 ${className}`} aria-hidden style={{ width: '560px' }}>
        {rightLayouts.map((l, i) => {
          const style: React.CSSProperties = {
            position: 'absolute',
            right: l.x,
            top: l.y,
            transform: `scale(${l.scale}) rotate(${l.rotate}deg)`,
            opacity: l.opacity * opacityMul
          }

          const svgClass = 'text-teal-300/70 w-32 xl:w-48'

          return (
            <div key={`right-${i}`} style={style}>
              {l.type === 'bars' && <BarChartSvg className={svgClass} />}
              {l.type === 'line' && <LineChartSvg className={svgClass} />}
              {l.type === 'dots' && <DotsSvg className={svgClass} />}
            </div>
          )
        })}
      </div>
    </>
  )
}

export default SectionDataBackdrop
