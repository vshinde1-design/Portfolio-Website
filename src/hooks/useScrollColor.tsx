import { useEffect, useRef } from 'react'

type Options = {
  hueStart?: number
  hueEnd?: number
  saturation?: number
  lightness?: number
}

const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v))

export default function useScrollColor(ref: React.RefObject<HTMLElement>, opts: Options = {}) {
  const rafRef = useRef<number | null>(null)
  const { hueStart = 260, hueEnd = 200, saturation = 66, lightness = 52 } = opts

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const onScroll = () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect()
        // progress 0 when section top is at bottom of viewport, 1 when section top is at/above top
        const progress = clamp(1 - rect.top / window.innerHeight, 0, 1)

        // interpolate hue and a touch of lightness
        const hue = Math.round(hueStart + (hueEnd - hueStart) * progress)
        const sat = Math.round(saturation)
        const light = Math.round(lightness - Math.min(8, progress * 12))

        el.style.setProperty('--h', String(hue))
        el.style.setProperty('--s', String(sat))
        el.style.setProperty('--l', String(light))
      })
    }

    // initial set
    onScroll()

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current)
    }
  }, [ref, hueStart, hueEnd, saturation, lightness])
}
