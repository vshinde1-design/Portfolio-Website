import React, { useEffect, useRef } from 'react'

type Star = {
  x: number
  y: number
  r: number
  alpha: number
  twinkleSpeed: number
  twinklePhase: number
  layer: number
  vx: number
  vy: number
  color: string
  baseX?: number
  baseY?: number
  startX?: number
  startY?: number
}

export default function Starfield({
  className = '',
  desktopCount = 150,
  mobileCount = 40,
  layers = 3,
  parallax = true,
  parallaxStrength = 0.004,
  heartThreshold = 0.98,
  heartMorphSpeed = 0.06,
}: {
  className?: string
  desktopCount?: number
  mobileCount?: number
  layers?: number
  parallax?: boolean
  parallaxStrength?: number
  heartThreshold?: number
  heartMorphSpeed?: number
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const rafRef = useRef<number | null>(null)
  const pointerRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let dpr = Math.max(1, window.devicePixelRatio || 1)

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = /Mobi|Android/i.test(navigator.userAgent)
    const STAR_COUNT = isMobile ? mobileCount : desktopCount

    let stars: Star[] = []
    let morph = 0 // 0..1 morph progress towards heart
    let prevHeartDesired = false

    function resize() {
      dpr = Math.max(1, window.devicePixelRatio || 1)
      const width = canvas.clientWidth
      const height = canvas.clientHeight
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      initStars()
    }

    function pickColor() {
      return Math.random() > 0.94 ? '#FFD8A8' : Math.random() > 0.7 ? '#BFD8FF' : '#ffffff'
    }

    function initStars() {
      const width = canvas.clientWidth
      const height = canvas.clientHeight
      stars = []
      for (let i = 0; i < STAR_COUNT; i++) {
        const layer = Math.floor(Math.random() * layers)
        const r = Math.random() * (1.2 * (layer + 1)) + 0.3
        const alpha = 0.5 + Math.random() * 0.5
        const twinkleSpeed = 0.001 + Math.random() * 0.007
        const twinklePhase = Math.random() * Math.PI * 2
        const vx = (Math.random() - 0.5) * 0.02 * (layer + 1)
        const vy = (Math.random() - 0.5) * 0.02 * (layer + 1)
        const sx = Math.random() * width
        const sy = Math.random() * height
        stars.push({
          x: sx,
          y: sy,
          r,
          alpha,
          twinkleSpeed,
          twinklePhase,
          layer,
          vx,
          vy,
          color: pickColor(),
          baseX: sx,
          baseY: sy,
        })
      }
    }

    function heartTarget(i: number, total: number, width: number, height: number) {
      const t = (i / total) * Math.PI * 2
      const X = 16 * Math.pow(Math.sin(t), 3)
      const Y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)
      const nx = X / 32
      const ny = Y / 32
      const scale = Math.min(width, height) * 0.4
      const cx = width / 2
      const cy = height / 2 - scale * 0.08
      const tx = cx + nx * scale
      const ty = cy - ny * scale
      return { tx, ty }
    }

    function draw() {
      const width = canvas.clientWidth
      const height = canvas.clientHeight
      ctx.clearRect(0, 0, width, height)
      ctx.globalCompositeOperation = 'lighter'

      const time = performance.now()

      // compute scroll progress for heart trigger
      const doc = document.documentElement
      const maxScroll = Math.max(doc.scrollHeight - window.innerHeight, 1)
      const raw = Math.max(0, Math.min(1, window.scrollY / maxScroll))
      const heartDesired = raw >= heartThreshold

      // morph progress towards heartDesired
      if (heartDesired && morph < 1) morph = Math.min(1, morph + heartMorphSpeed)
      if (!heartDesired && morph > 0) morph = Math.max(0, morph - heartMorphSpeed)

      // when heartDesired toggles on, set each star's startX/startY from current position
      if (heartDesired && !prevHeartDesired) {
        for (const s of stars) {
          s.startX = s.x
          s.startY = s.y
        }
      }
      prevHeartDesired = heartDesired

      for (let idx = 0; idx < stars.length; idx++) {
        const s = stars[idx]
        const tw = Math.sin(time * s.twinkleSpeed + s.twinklePhase) * 0.25 + 0.75
        const alpha = s.alpha * tw
        const px = parallax ? (pointerRef.current.x - width / 2) * (parallaxStrength * (s.layer + 1)) : 0
        const py = parallax ? (pointerRef.current.y - height / 2) * (parallaxStrength * (s.layer + 1)) : 0

        let drawX = s.x
        let drawY = s.y

        if (morph > 0) {
          const { tx, ty } = heartTarget(idx, stars.length, width, height)
          const sx = s.startX ?? s.x
          const sy = s.startY ?? s.y
          drawX = sx + (tx - sx) * morph
          drawY = sy + (ty - sy) * morph
        }

        const x = drawX + px
        const y = drawY + py

        ctx.beginPath()
        const grd = ctx.createRadialGradient(x, y, 0, x, y, Math.max(1, s.r * 6))
        grd.addColorStop(0, s.color)
        grd.addColorStop(0.6, s.color)
        grd.addColorStop(1, 'rgba(255,255,255,0)')
        ctx.fillStyle = grd
        ctx.globalAlpha = Math.min(1, alpha)
        ctx.fillRect(x - s.r * 6, y - s.r * 6, s.r * 12, s.r * 12)

        if (morph < 1) {
          s.x += s.vx * (s.layer + 1)
          s.y += s.vy * (s.layer + 1)
        } else {
          const { tx, ty } = heartTarget(idx, stars.length, width, height)
          s.x = tx
          s.y = ty
        }
        if (s.x < -20) s.x = width + 20
        if (s.x > width + 20) s.x = -20
        if (s.y < -20) s.y = height + 20
        if (s.y > height + 20) s.y = -20
      }
      ctx.globalAlpha = 1
      ctx.globalCompositeOperation = 'source-over'
    }

    function animate() {
      if (prefersReduced) return
      draw()
      rafRef.current = requestAnimationFrame(animate)
    }

    function onPointer(e: PointerEvent) {
      pointerRef.current.x = e.clientX
      pointerRef.current.y = e.clientY
    }

    resize()
    window.addEventListener('resize', resize, { passive: true })
    if (!prefersReduced) {
      window.addEventListener('pointermove', onPointer, { passive: true })
      animate()
    }

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointer)
    }
  }, [desktopCount, mobileCount, layers, parallax])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        // Promote to its own compositor layer to reduce paint during scroll
        willChange: 'transform, opacity',
        transform: 'translateZ(0)',
      }}
      aria-hidden="true"
    />
  )
}
