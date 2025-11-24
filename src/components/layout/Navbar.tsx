import React, { useEffect, useState } from 'react'
import { Link as ScrollLink, scroller } from 'react-scroll'
import { Button } from '../ui/Button'
import clsx from 'clsx'

const sections = [
  { id: 'experience', label: 'Experience', offset: -100 },
  { id: 'projects', label: 'Projects', offset: -100 },
  { id: 'skills', label: 'Skills', offset: -100 },
  { id: 'education', label: 'Education', offset: -100 },
  { id: 'certifications', label: 'Certifications', offset: -100 },
  { id: 'contact', label: 'Contact', offset: -100 }
]

const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero')
  const [isScrolled, setIsScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observerTargets = ['hero', ...sections.map((section) => section.id)]
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      {
        root: null,
        rootMargin: '-40% 0px -40% 0px',
        threshold: 0
      }
    )

    observerTargets.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const close = () => setMenuOpen(false)
    window.addEventListener('scroll', close)
    return () => window.removeEventListener('scroll', close)
  }, [menuOpen])

  return (
    <header
      className={clsx(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 antialiased font-sans',
        isScrolled
          ? 'border-b border-white/10 bg-[rgba(9,6,18,0.85)] shadow-[0_12px_32px_rgba(8,0,20,0.4)]'
          : 'border-b border-white/5 bg-[rgba(14,8,24,0.6)]'
      )}
    >
      <div className="container flex items-center justify-between gap-4 py-3">
        <button
          onClick={() =>
            scroller.scrollTo('hero', { smooth: true, offset: -80 })
          }
          className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/20 bg-white/5 text-lg font-semibold tracking-[0.12em] text-white transition-colors hover:bg-white/15 focus:outline-none"
          aria-label="Back to hero"
        >
          VS
        </button>

        <nav className="hidden md:flex gap-2 items-center text-sm font-semibold tracking-[0.12em] text-slate-100/80 uppercase">
          {sections.map(({ id, label, offset }) => (
            <ScrollLink
              key={id}
              to={id}
              smooth={true}
              offset={offset}
              className={clsx(
                'px-3 py-1 rounded-md transition-all duration-200 cursor-pointer antialiased text-sm',
                activeSection === id
                  ? 'text-white bg-white/6 shadow-[0_6px_24px_rgba(99,102,241,0.06)]'
                  : 'text-slate-200/70 hover:text-white hover:underline hover:decoration-indigo-400/60 hover:underline-offset-4'
              )}
            >
              {label}
            </ScrollLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden md:block">
              <ScrollLink to="contact" smooth={true} offset={-100}>
              <Button className="px-3 py-1.5 text-sm font-semibold tracking-[0.12em] bg-white/6 text-white border border-white/10 hover:bg-white/12 shadow-sm">Connect</Button>
            </ScrollLink>
          </div>

          <button
            className="md:hidden flex flex-col gap-1.5 items-center justify-center h-11 w-11 rounded-xl bg-white/10 border border-white/20 text-white"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation"
          >
            <span className="h-[2px] w-6 bg-current transition-transform" style={{ transform: menuOpen ? 'rotate(45deg) translateY(6px)' : 'none' }} />
            <span className="h-[2px] w-6 bg-current opacity-80" style={{ opacity: menuOpen ? 0 : 1 }} />
            <span className="h-[2px] w-6 bg-current transition-transform" style={{ transform: menuOpen ? 'rotate(-45deg) translateY(-6px)' : 'none' }} />
          </button>
        </div>
      </div>

      {menuOpen && (
          <div className="md:hidden border-t border-white/10 bg-[rgba(5,4,12,0.95)] backdrop-blur-xl">
          <div className="container flex flex-col py-6 gap-4 text-base font-medium antialiased font-sans text-white/80">
            {sections.map(({ id, label, offset }) => (
              <ScrollLink
                key={id}
                to={id}
                smooth={true}
                offset={offset}
                className="px-2 py-2 rounded-lg hover:bg-white/10 tracking-[0.06em] font-medium text-sm"
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </ScrollLink>
            ))}
            <ScrollLink to="contact" smooth={true} offset={-100} onClick={() => setMenuOpen(false)}>
              <Button className="w-full">Get in Touch</Button>
            </ScrollLink>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
