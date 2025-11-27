import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link as ScrollLink } from 'react-scroll'
import { Button } from '../ui/Button'

const GitHubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false" {...props}>
    <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.1.68-.22.68-.48 0-.24-.01-.87-.01-1.71-2.78.6-3.37-1.34-3.37-1.34-.45-1.14-1.1-1.45-1.1-1.45-.9-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.64.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.8c.85.01 1.71.11 2.51.32 1.9-1.29 2.74-1.02 2.74-1.02.56 1.41.21 2.45.11 2.71.64.7 1.02 1.59 1.02 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.86 0 1.34-.01 2.42-.01 2.75 0 .27.18.59.69.48A10 10 0 0 0 22 12c0-5.52-4.48-10-10-10Z" />
  </svg>
)

const LinkedInIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false" {...props}>
    <path d="M20.45 20.45h-3.55v-5.3c0-1.26-.03-2.88-1.75-2.88-1.75 0-2.02 1.37-2.02 2.79v5.39H9.57V9h3.4v1.56h.05c.47-.89 1.62-1.83 3.33-1.83 3.57 0 4.23 2.35 4.23 5.4v6.32ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12Zm-1.78 13.02h3.55V9H3.56v11.45Z" />
  </svg>
)

// TypingTitle: loops through provided titles, typing and deleting each one.
const TypingTitle: React.FC<{ titles: string[]; typeSpeed?: number; deleteSpeed?: number; pause?: number; onTitleChange?: (title: string) => void }> = ({ titles, typeSpeed = 120, deleteSpeed = 80, pause = 2000, onTitleChange }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>
    const current = titles[currentIndex]

    if (!isDeleting && displayed.length < current.length) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, displayed.length + 1))
      }, typeSpeed)
    } else if (!isDeleting && displayed.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), pause)
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, displayed.length - 1))
      }, deleteSpeed)
    } else if (isDeleting && displayed.length === 0) {
      // move to next title
      setIsDeleting(false)
      setCurrentIndex((i) => (i + 1) % titles.length)
    }

    return () => clearTimeout(timeout)
  }, [displayed, isDeleting, currentIndex, titles, typeSpeed, deleteSpeed, pause])

  useEffect(() => {
    onTitleChange?.(titles[currentIndex])
  }, [currentIndex, titles, onTitleChange])

  return (
    <span aria-live="polite" aria-atomic="true">
      {displayed}
      <span aria-hidden="true" className="ml-1 inline-block align-middle text-current animate-pulse">|</span>
    </span>
  )
}

const Hero: React.FC = () => {
  const [activeTitle, setActiveTitle] = useState('Data Analyst')
  const [parallax, setParallax] = useState({ x: 0, y: 0 })
  
  const handleResumeClick = async (e: React.MouseEvent) => {
    e.preventDefault()
    const url = '/certs/VedantShinde%20Resume.pdf'
    // open preview in a new tab
    const newWin = window.open(url, '_blank')
    try {
      // fetch and trigger download in background
      const res = await fetch(url)
      if (!res.ok) throw new Error('Network response was not ok')
      const blob = await res.blob()
      const blobUrl = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = blobUrl
      a.download = 'VedantShinde_Resume.pdf'
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(blobUrl)
    } catch (err) {
      // if download fails, open the PDF preview if not already opened
      if (!newWin || newWin.closed) window.open(url, '_blank')
      console.error('Resume download failed', err)
    }
    if (newWin) try { newWin.opener = null } catch {}
  }
  return (

    <section
      id="hero"
      onMouseMove={(e) => {
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
        setParallax({ x, y })
      }}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-12 md:py-16 text-center"
    >


      {/* Bright pastel hero background: base is soft light, with subtle animated blobs. */}
      {/* Light-mode layers (visible when NOT .dark) */}
      <div className="block dark:hidden">
        {/* Base layer: full-bleed soft background that sits above page background (brighter) */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#fef9ff] via-[#f5f3ff] to-[#ffffff]" aria-hidden />

        {/* pastel animated blobs for liveliness (increased saturation/opacities) */}
        <div className="absolute inset-0 z-5 opacity-100" aria-hidden>
          <div className="animate-gradient bg-[radial-gradient(1600px_800px_at_20%_25%,rgba(220,200,255,0.52),transparent_30%),radial-gradient(1400px_700px_at_80%_75%,rgba(200,230,255,0.45),transparent_35%),linear-gradient(120deg,rgba(252,252,254,1),rgba(245,244,255,1))] w-full h-full mix-blend-normal" />
        </div>

        {/* soft conic overlay to add subtle lavender hues */}
        <div className="absolute inset-0 z-10 opacity-80" aria-hidden>
          <div className="animate-hero-gradient bg-[conic-gradient(from_120deg,#f8edff,#eef5ff,#f9f0ff)] w-full h-full mix-blend-overlay" aria-hidden />
        </div>
      </div>

      {/* Dark-mode layers (visible when .dark class present) */}
      <div className="hidden dark:block">
        {/* Deep indigo base for dark theme (brighter/saturated) */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0a0820] via-[#30124f] to-[#431866]" aria-hidden />

        {/* darker animated blobs for depth (increased alpha for richer color) */}
        <div className="absolute inset-0 z-5 opacity-100" aria-hidden>
          <div className="animate-gradient bg-[radial-gradient(1600px_800px_at_20%_25%,rgba(134,108,255,0.32),transparent_30%),radial-gradient(1400px_700px_at_80%_75%,rgba(94,70,200,0.26),transparent_35%),linear-gradient(120deg,rgba(16,12,32,0.95),rgba(38,12,64,0.96))] w-full h-full mix-blend-normal" />
        </div>

        {/* conic overlay in dark mode (slightly brighter) */}
        <div className="absolute inset-0 z-10 opacity-72" aria-hidden>
          <div className="animate-hero-gradient bg-[conic-gradient(from_120deg,#1d0535,#36094a,#28073b)] w-full h-full mix-blend-overlay" aria-hidden />
        </div>
      </div>

      {/* animated color overlays synced with current role */}
      <motion.div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 12, backgroundImage: 'linear-gradient(130deg, rgba(18,32,76,0.35), rgba(11,15,32,0.35))', backgroundSize: '250% 250%' }}
        animate={{
          backgroundPosition: ['0% 40%', '100% 60%', '0% 40%'],
          opacity: activeTitle === 'Data Analyst' ? 0.7 : 0.08
        }}
        transition={{
          backgroundPosition: { duration: 38, repeat: Infinity, ease: 'linear' },
          opacity: { duration: 1.2, ease: 'easeInOut' }
        }}
      />

      <motion.div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 13, backgroundImage: 'linear-gradient(150deg, rgba(54,18,70,0.38), rgba(16,8,32,0.32))', backgroundSize: '240% 240%' }}
        animate={{
          backgroundPosition: ['100% 60%', '0% 40%', '100% 60%'],
          opacity: activeTitle === 'Business Analyst' ? 0.65 : 0.08
        }}
        transition={{
          backgroundPosition: { duration: 38, repeat: Infinity, ease: 'linear' },
          opacity: { duration: 1.2, ease: 'easeInOut' }
        }}
      />

      {/* gentle radial highlight to center text (lighter in light mode, subtle in dark mode) */}
      <div className="pointer-events-none absolute inset-0 z-15">
        {/* light radial center (brighter) */}
        <div className="absolute inset-0 block dark:hidden" aria-hidden style={{ background: 'radial-gradient(circle at center, rgba(255,255,255,0.26), transparent 40%)' }} />
        {/* dark radial center (subtle highlight to avoid grey) */}
        <div className="absolute inset-0 hidden dark:block" aria-hidden style={{ background: 'radial-gradient(circle at center, rgba(40,20,60,0.22), transparent 45%)' }} />
      </div>

      {/* hero decorative SVGs removed per user request */}

      {/* animated gradient blob behind heading (soft radial overlay to increase center contrast) */}
      <motion.div
        aria-hidden
        className="absolute -right-32 -top-16 w-[36rem] h-[36rem] rounded-full blur-[120px] opacity-22 pointer-events-none z-25"
        style={{ background: 'radial-gradient(circle at 40% 30%, rgba(150,110,255,0.42), rgba(90,110,240,0.12) 36%, transparent 55%)', transform: `translate(${parallax.x * 8}px, ${parallax.y * 6}px)` }}
        animate={{ x: [0, 18, 0], y: [0, 8, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* centered hero radial overlay for maximum contrast on text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-26">
        <div className="w-[60%] h-[60%] rounded-full opacity-26 blur-[60px]" style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 45%)' }} />
      </div>

      <motion.div
        className="container relative z-40 text-slate-50 max-w-4xl w-full px-4"
        initial={{ opacity: 0, y: 18, scale: 0.985 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
      >
        {/* halo glow behind card */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
          <div className="w-[92%] max-w-4xl rounded-[40px] blur-[40px] opacity-30" style={{ background: 'radial-gradient(circle at 40% 30%, rgba(124,58,237,0.14), rgba(99,102,241,0.06))' }} />
        </div>

        <div className="w-full rounded-[56px] glass-liquid px-6 py-8 md:px-10 md:py-10 mx-auto" style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.02), inset 0 -8px 30px rgba(0,0,0,0.18), 0 25px 90px rgba(8,0,20,0.45)' }}>
          <h1 className="text-[clamp(2.75rem,5vw,4.75rem)] font-extrabold leading-tight tracking-tight text-balance">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#ffb86b] via-[#ff6cab] to-[#7b5cff] drop-shadow-[0_18px_60px_rgba(0,0,0,0.24)]">Vedant Shinde</span>
            <span className="mt-6 block text-transparent bg-clip-text bg-gradient-to-r from-[#c4b5fd] via-[#a78bfa] to-[#7c3aed] text-[clamp(1.6rem,3.2vw,2.8rem)] font-medium">
              <TypingTitle titles={["Data Analyst", "Business Analyst"]} typeSpeed={180} deleteSpeed={120} pause={2400} onTitleChange={setActiveTitle} />
            </span>
          </h1>

          <p className="mt-6 text-sm md:text-base font-medium text-slate-200 dark:text-slate-100/95">Master's Student | Information Systems</p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
            <ScrollLink to="contact" smooth={true} offset={-80}>
              <Button variant="primary" className="group transform-gpu hover:scale-[1.02] transition-transform duration-200">Get in Touch</Button>
            </ScrollLink>
            <Button variant="outline" className="group hover:shadow-[0_8px_30px_rgba(99,102,241,0.14)] transition-shadow duration-220" onClick={handleResumeClick}>
              <span className="flex items-center gap-3">
                <span>Download CV</span>
                <svg className="h-4 w-4 transform transition-transform duration-200 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path d="M13 5l7 7-7 7M20 12H4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Button>
          </div>

          <div className="mt-6 text-base text-slate-100/90 leading-relaxed">Analytics should create clarity, not confusion — every model, metric, or dashboard should make decisions easier.</div>

          <div className="mt-10 pt-6 border-t border-white/15 flex flex-wrap items-center justify-center gap-10 text-slate-100/90">
            <a href="https://github.com/Vedantshi" className="group flex items-center gap-3 text-sm font-semibold tracking-[0.12em] uppercase hover:text-white transition-colors" aria-label="GitHub profile">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/8 text-white/95 shadow-inner shadow-white/10 transition-transform duration-200 group-hover:scale-105 group-hover:shadow-[0_8px_30px_rgba(99,102,241,0.12)]">
                <GitHubIcon className="h-5 w-5" />
              </span>
              <span className="hidden sm:inline">GitHub</span>
            </a>

            <span className="h-10 w-px bg-white/15" aria-hidden />

            <a href="https://linkedin.com/in/vedantshinde25" className="group flex items-center gap-3 text-sm font-semibold tracking-[0.12em] uppercase hover:text-white transition-colors" aria-label="LinkedIn profile">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/8 text-white/95 shadow-inner shadow-white/10 transition-transform duration-200 group-hover:scale-105 group-hover:shadow-[0_8px_30px_rgba(56,189,248,0.10)]">
                <LinkedInIcon className="h-5 w-5" />
              </span>
              <span className="hidden sm:inline">LinkedIn</span>
            </a>
          </div>
        </div>
      </motion.div>

      {/* scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
          <div className="w-6 h-10 border-2 rounded-full flex items-start justify-center p-1">
            <div className="w-2 h-2 rounded-full bg-[hsl(var(--primary))]" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
