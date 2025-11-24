import React, { useEffect, useRef, useState } from 'react'
import GlobalAnalyticsBackground from './GlobalAnalyticsBackground'
import SectionsDynamicBackground from './SectionsDynamicBackground'
import SectionDataBackdrop from './SectionDataBackdrop'

interface Props {
  showDecor?: boolean
}

const UnifiedAnalyticsBackground: React.FC<Props> = ({ showDecor = true }) => {
  const [intensity, setIntensity] = useState(1)
  const ticking = useRef(false)

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return
      ticking.current = true
      requestAnimationFrame(() => {
        const doc = document.documentElement
        const max = Math.max(doc.scrollHeight - window.innerHeight, 1)
        const raw = Math.max(0, Math.min(1, window.scrollY / max))
        // ease slightly so changes feel smoother
        const eased = Math.pow(raw, 0.92)
        // map to intensity range
        const min = 0.6
        const maxI = 1.6
        const value = min + (maxI - min) * eased
        setIntensity(value)

        // also update glass darkness variable so panels get darker as user scrolls
        // map eased (0..1) to glass darkness range (min..max) where max is near-opaque
        const minGlass = 0.48
        const maxGlass = 0.9
        const g = Math.max(0, Math.min(1, minGlass + (maxGlass - minGlass) * eased))
        try {
          document.documentElement.style.setProperty('--glass-darkness', String(Number(g.toFixed(3))))
        } catch (e) {
          // ignore in non-browser environments
        }
        ticking.current = false
      })
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none" aria-hidden>
      {/* Base canvas particle layer */}
      <div className="absolute inset-0 z-0 opacity-100">
        <GlobalAnalyticsBackground intensity={intensity} />
      </div>

      {/* Moving SVG bands + network lines */}
      <div className="absolute inset-0 z-10 opacity-100">
        <SectionsDynamicBackground intensity={intensity} />
      </div>

      {/* Section-level decorative clusters */}
      <div className="absolute inset-0 z-20 pointer-events-none opacity-100">
        <SectionDataBackdrop className="pointer-events-none" intensity={intensity} />
      </div>
    </div>
  )
}

export default UnifiedAnalyticsBackground
