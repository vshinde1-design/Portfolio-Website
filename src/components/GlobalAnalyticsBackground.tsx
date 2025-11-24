import React, { useEffect, useRef } from 'react'

type Particle = { x: number; y: number; vx: number; vy: number }

const COUNT = 140

type Props = {
  intensity?: number // 0.0 - 2.0, scales visibility/brightness
}

const GlobalAnalyticsBackground: React.FC<Props> = ({ intensity = 1 }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const rafRef = useRef<number | null>(null)
  const intensityRef = useRef<number>(intensity)

  useEffect(() => {
    intensityRef.current = intensity
  }, [intensity])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // capture non-null handles for nested functions to satisfy TypeScript
    const canvasEl = canvas as HTMLCanvasElement
    const ctx2 = ctx as CanvasRenderingContext2D

    let running = true

    let width = 0
    let height = 0

    const rand = (min: number, max: number) => Math.random() * (max - min) + min

    type Star = Particle & { a: number; da: number; r: number }
    const particles: Star[] = []

    const init = () => {
      particles.length = 0
      for (let i = 0; i < COUNT; i++) {
        particles.push({
          x: rand(0, width),
          y: rand(0, height),
          vx: rand(-0.08, 0.08),
          vy: rand(-0.08, 0.08),
          a: rand(0.35, 1.0),
          da: rand(-0.01, 0.01),
          r: rand(0.6, 2.4)
        })
      }
    }

    const nodeColor = (alpha: number) => `rgba(255,255,255,${alpha})`
    const lineColor = (alpha: number) => `rgba(255,255,255,${Math.max(0.02, alpha)})`

    const draw = () => {
      if (!running) return
      ctx.clearRect(0, 0, width, height)
      // Draw a semi-transparent dark overlay to make the page/sections appear
      // darker while preserving the bright particle effects on top.
      // Alpha scales a bit with intensity so higher intensity doesn't wash out.
      // Make the overlay almost black to darken the background substantially.
      // Increase `bgAlpha` closer to 1.0 for a darker effect.
      const bgAlpha = 0.99 // nearly-black overlay with subtle blue tint
      // Slight blue tint keeps the background almost-black but cooler.
      ctx.fillStyle = `rgba(6,10,30,${bgAlpha})`
      ctx.fillRect(0, 0, width, height)

      // Move particles and update twinkle alpha
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        p.a += p.da
        const minA = 0.18 * Math.max(0.5, intensityRef.current)
        if (p.a < minA) { p.a = minA; p.da *= -1 }
        if (p.a > 1.0) { p.a = 1.0; p.da *= -1 }
        if (p.x < -20) p.x = width + 20
        if (p.x > width + 20) p.x = -20
        if (p.y < -20) p.y = height + 20
        if (p.y > height + 20) p.y = -20
      }

      // Connect nearby particles
      const maxDist = 160 * (0.8 + 0.6 * intensityRef.current)
      ctx.lineWidth = 1 * (0.7 + 0.6 * intensityRef.current)
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i]
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d = Math.hypot(dx, dy)
          if (d < maxDist) {
            const t = 1 - d / maxDist
            const alpha = (a.a + b.a) * 0.18 * t * Math.min(1, intensityRef.current)
            ctx.strokeStyle = lineColor(alpha)
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      // Draw nodes
      for (const p of particles) {
        ctx.beginPath()
        const scale = 0.7 + intensityRef.current * 0.9
        const r = p.r * (0.8 + p.a * 1.2) * scale
        const alpha = Math.min(1, p.a * 1.1 * Math.min(1.4, intensityRef.current))
        ctx.fillStyle = nodeColor(alpha)
        ctx.shadowColor = `rgba(255,255,255,${p.a * 0.9 * intensityRef.current})`
        ctx.shadowBlur = 6 * p.a * (0.8 + intensityRef.current)
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowBlur = 0
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    const onResize = () => { resize(); init() }

    function resize() {
      width = window.innerWidth
      height = window.innerHeight
      const dprNow = Math.max(1, Math.min(2, window.devicePixelRatio || 1))
      canvasEl.width = Math.floor(width * dprNow)
      canvasEl.height = Math.floor(height * dprNow)
      canvasEl.style.width = `${width}px`
      canvasEl.style.height = `${height}px`
      ctx2.setTransform(dprNow, 0, 0, dprNow, 0, 0)
    }

    resize()
    init()
    window.addEventListener('resize', onResize)
    rafRef.current = requestAnimationFrame(draw)

    return () => {
      running = false
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none opacity-85" aria-hidden />
}

export default GlobalAnalyticsBackground

