import React, { PropsWithChildren, useRef } from 'react'
import useScrollColor from '../../hooks/useScrollColor'

type Props = PropsWithChildren<{
  id?: string
  className?: string
  // color tuning for dark professional tone
  hueStart?: number
  hueEnd?: number
  saturation?: number
  lightness?: number
}> 

const ScrollColorSection: React.FC<Props> = ({ id, className = '', children, hueStart = 270, hueEnd = 140, saturation = 78, lightness = 22 }) => {
  const ref = useRef<HTMLElement | null>(null)
  // attach hook with dark-toned defaults
  useScrollColor(ref, { hueStart, hueEnd, saturation, lightness })

  return (
    <section id={id} ref={ref} className={className}>
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 5,
          // stronger dark-toned layered gradient that reads CSS vars for hue/sat/light
          background: 'linear-gradient(135deg, hsl(var(--h) var(--s)% var(--l)% / 0.95, hsl(calc(var(--h) + 40) var(--s)% calc(var(--l) - 12)% / 0.66))',
          mixBlendMode: 'overlay',
          transition: 'background 420ms linear'
        }}
      />

      <div className="relative z-20">
        {children}
      </div>
    </section>
  )
}

export default ScrollColorSection
