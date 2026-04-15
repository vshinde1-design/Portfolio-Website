import React, { useCallback, useState } from 'react'
import { Card } from '../ui/Card'
import { Button } from '../ui/Button'
import ScrollColorSection from '../ui/ScrollColorSection'

const CopyButton: React.FC<{
  textToCopy: string
  className?: string
  children?: React.ReactNode
}> = ({ textToCopy, children, className }) => {
  const [copied, setCopied] = useState(false)

  const doCopy = useCallback(async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(textToCopy)
      } else {
        const ta = document.createElement('textarea')
        ta.value = textToCopy
        ta.style.position = 'fixed'
        ta.style.left = '-9999px'
        document.body.appendChild(ta)
        ta.select()
        document.execCommand('copy')
        document.body.removeChild(ta)
      }
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch (err) {
      // fallback: do nothing visible, keep console log
      // eslint-disable-next-line no-console
      console.error('Copy failed', err)
    }
  }, [textToCopy])

  return (
    <div className="relative inline-block">
      <Button onClick={doCopy} variant="primary" className={className} aria-label={`Copy ${textToCopy}`}>
        {children}
      </Button>
      {copied && (
        <span className="absolute -top-7 right-0 inline-block rounded-md bg-slate-800 px-2 py-1 text-xs text-white">Copied!</span>
      )}
    </div>
  )
}

const Contact: React.FC = () => {
  return (
    <ScrollColorSection id="contact" className="relative section-wrapper scroll-mt-24 py-12 md:py-16 mx-auto max-w-6xl px-4 md:px-6">
      <h2 className="section-heading-sticky text-3xl sm:text-5xl font-extrabold text-gradient mb-3">Let's Connect</h2>

      <div className="relative z-10 mt-8">
        <Card className="px-6 py-8">
          <div className="text-center mb-6">
            <h3 className="text-2xl sm:text-3xl font-semibold text-slate-50">Get in touch</h3>
            <p className="mt-2 text-sm text-slate-300 max-w-2xl mx-auto">Happy to discuss analytics projects, research collaborations, or full-time roles.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            <div className="flex flex-col items-center text-center p-4">
              <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[#241232] text-white">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path d="M3 8.5L12 13L21 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </div>
              <div className="text-sm text-slate-300">Email</div>
              <div className="mt-2">
                <CopyButton textToCopy="shindev124@gmail.com" className="bg-[#241232] text-white shadow-none px-4 py-2 text-sm">shindev124@gmail.com</CopyButton>
              </div>
            </div>

            <div className="flex flex-col items-center text-center p-4">
              <a href="https://github.com/Vedantshi" target="_blank" rel="noreferrer" className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[#241232] text-white hover:bg-[#3a1d42] transition-colors">
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.11.82-.26.82-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.238 1.84 1.238 1.07 1.835 2.807 1.305 3.492.997.108-.775.418-1.305.762-1.605-2.665-.303-5.466-1.333-5.466-5.93 0-1.31.468-2.38 1.235-3.22-.125-.303-.535-1.523.115-3.176 0 0 1.005-.322 3.3 1.23A11.49 11.49 0 0112 5.8c1.02.005 2.045.138 3.003.405 2.28-1.553 3.285-1.23 3.285-1.23.655 1.653.245 2.873.12 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.805 5.625-5.475 5.92.43.37.815 1.1.815 2.22 0 1.606-.015 2.897-.015 3.293 0 .32.215.695.825.577C20.565 21.795 24 17.296 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
              <div className="text-sm text-slate-300 mt-3">GitHub</div>
              <div className="mt-2">
                <a href="https://github.com/Vedantshi" target="_blank" rel="noreferrer">
                  <CopyButton textToCopy="https://github.com/Vedantshi" className="bg-[#241232] text-white shadow-none px-4 py-2 text-sm">github.com/Vedantshi</CopyButton>
                </a>
              </div>
            </div>

            <div className="flex flex-col items-center text-center p-4">
              <a href="https://linkedin.com/in/vedantshinde25" target="_blank" rel="noreferrer" className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[#241232] text-white hover:bg-[#3a1d42] transition-colors">
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
                  <path d="M20.45 20.45h-3.55v-5.3c0-1.26-.03-2.88-1.75-2.88-1.75 0-2.02 1.37-2.02 2.79v5.39H9.57V9h3.4v1.56h.05c.47-.89 1.62-1.83 3.33-1.83 3.57 0 4.23 2.35 4.23 5.4v6.32ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12Zm-1.78 13.02h3.55V9H3.56v11.45Z" />
                </svg>
              </a>
              <div className="text-sm text-slate-300 mt-3">LinkedIn</div>
              <div className="mt-2">
                <a href="https://linkedin.com/in/vedantshinde25" target="_blank" rel="noreferrer">
                  <CopyButton textToCopy="https://linkedin.com/in/vedantshinde25" className="bg-[#241232] text-white shadow-none px-4 py-2 text-sm">linkedin.com/in/vedantshinde25</CopyButton>
                </a>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </ScrollColorSection>
  )
}

export default Contact
