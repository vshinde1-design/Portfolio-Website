import React, { useEffect } from 'react'
import { ThemeProvider } from './lib/theme'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Experience from './components/sections/Experience'
import Projects from './components/sections/Projects'
import Skills from './components/sections/Skills'
import { EducationSection, CertificationsSection } from './components/sections/Education'
import Contact from './components/sections/Contact'
import UnifiedAnalyticsBackground from './components/UnifiedAnalyticsBackground'
import Starfield from './components/Starfield'

export default function App() {
  useEffect(() => {
    const root = document.documentElement
    const darkBase = ['#1a1030', '#2a1448', '#d46c92']
    const darkWarm = ['#241a47', '#3a1f5c', '#ff86a8']
    const lightBase = ['#ffe8e2', '#ffd0dc', '#ffafc8']
    const lightWarm = ['#ffdcd2', '#ffc1d6', '#ff98b9']

    const hexToRgb = (hex: string) => {
      const trimmed = hex.replace('#', '')
      const bigint = parseInt(trimmed.length === 3 ? trimmed.repeat(2) : trimmed, 16)
      return {
        r: (bigint >> 16) & 255,
        g: (bigint >> 8) & 255,
        b: bigint & 255
      }
    }

    const toHex = (r: number, g: number, b: number) => {
      const clamp = (value: number) => Math.max(0, Math.min(255, Math.round(value)))
      const value = (clamp(r) << 16) | (clamp(g) << 8) | clamp(b)
      return `#${value.toString(16).padStart(6, '0')}`
    }

    const mixColor = (from: string, to: string, amount: number) => {
      const start = hexToRgb(from)
      const end = hexToRgb(to)
      return toHex(
        start.r + (end.r - start.r) * amount,
        start.g + (end.g - start.g) * amount,
        start.b + (end.b - start.b) * amount
      )
    }

    const assignGradient = (vars: string[], base: string[], warm: string[], factor: number) => {
      vars.forEach((variable, index) => {
        root.style.setProperty(variable, mixColor(base[index], warm[index], factor))
      })
    }

    const updateGradient = () => {
      const doc = document.documentElement
      const maxScroll = Math.max(doc.scrollHeight - window.innerHeight, 1)
      const raw = Math.max(0, Math.min(1, window.scrollY / maxScroll))
      const eased = Math.pow(raw, 0.65)
      const factor = Math.min(0.18, eased * 0.18)

      assignGradient(['--sunset-top', '--sunset-mid', '--sunset-bottom'], darkBase, darkWarm, factor)
      assignGradient(['--sunset-top-light', '--sunset-mid-light', '--sunset-bottom-light'], lightBase, lightWarm, factor)
    }

    updateGradient()
    window.addEventListener('scroll', updateGradient, { passive: true })
    window.addEventListener('resize', updateGradient)

    return () => {
      window.removeEventListener('scroll', updateGradient)
      window.removeEventListener('resize', updateGradient)
    }
  }, [])

  return (
    <ThemeProvider>
      {/* Outer wrapper per request */}
      <div className="relative min-h-screen bg-[#1a0b33] overflow-hidden">
        <Starfield />
        {/* Page content above the animation */}
        <main className="relative">
          <Navbar />
          <Hero />
          <section className="relative z-10">
            <UnifiedAnalyticsBackground />
            <div className="animated-gradient" aria-hidden />
            <div className="sections-surface">
              <div className="section-wrapper">
                <About />
              </div>

              <div className="section-wrapper">
                <Experience />
              </div>

              <div className="section-wrapper">
                <Projects />
              </div>

              <div className="section-wrapper">
                <Skills />
              </div>

              <div className="section-wrapper">
                <EducationSection />
              </div>

              <div className="section-wrapper">
                <CertificationsSection />
              </div>

              <div className="section-wrapper">
                <Contact />
              </div>
            </div>
            <Footer />
          </section>
        </main>
      </div>
    </ThemeProvider>
  )
}
