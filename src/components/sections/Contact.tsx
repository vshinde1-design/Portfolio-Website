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
              <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[#241232] text-white">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.09 4.18 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.72c.12.88.37 1.73.73 2.53a2 2 0 0 1-.45 2.11L8.91 10.91a16 16 0 0 0 6 6l1.55-1.55a2 2 0 0 1 2.11-.45c.8.36 1.65.61 2.53.73A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="text-sm text-slate-300">Phone</div>
              <div className="mt-2">
                <CopyButton textToCopy="201-668-7085" className="bg-[#241232] text-white shadow-none px-4 py-2 text-sm">201-668-7085</CopyButton>
              </div>
            </div>

            <div className="flex flex-col items-center text-center p-4">
              <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[#241232] text-white">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path d="M21 10c0 6-9 12-9 12S3 16 3 10a9 9 0 1 1 18 0z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="12" cy="10" r="2.5" fill="currentColor" />
                </svg>
              </div>
              <div className="text-sm text-slate-300">Location</div>
              <div className="mt-2">
                <CopyButton textToCopy="Jersey City, NJ 07307" className="bg-[#241232] text-white shadow-none px-4 py-2 text-sm">Jersey City, NJ 07307</CopyButton>
              </div>
            </div>
          </div>

          <div className="border-t border-white/6 my-6" />

          <div className="text-center">
            <div className="text-sm text-slate-300 mb-4">Connect with me on social platforms</div>
            <div className="flex justify-center gap-4">
              <a href="https://github.com/Vedantshi" target="_blank" rel="noreferrer">
                <Button variant="outline">GitHub</Button>
              </a>
              <a href="https://linkedin.com/in/vedantshinde25" target="_blank" rel="noreferrer">
                <Button variant="outline">LinkedIn</Button>
              </a>
            </div>
          </div>
        </Card>
      </div>
    </ScrollColorSection>
  )
}

export default Contact
