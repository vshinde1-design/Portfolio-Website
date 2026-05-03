import React from 'react'
import { createPortal } from 'react-dom'
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'
import { Card } from '../ui/Card'
import ScrollColorSection from '../ui/ScrollColorSection'
import GlassContainer from '../ui/GlassContainer'

const certifications = [
  'Power BI (PL-300) — Microsoft',
  'Google Data Analytics — Google',
  'Rutgers Supply Chain Management Specialization — Rutgers'
]

// map a certification (issuer or title) to an image filename placed in `public/certs/`
const certImageMap: Record<string, string> = {
  // exact matches based on the strings above
  'Rutgers Supply Chain Management Specialization — Rutgers': 'Rutgers Supply Chain Management Specialization-1.png',
  'Power BI (PL-300) — Microsoft': 'PL 300 Certificate_page-0001.jpg',
  'Google Data Analytics — Google': 'Google Data Analytics Certificate_page-0001.jpg'
}

const EducationSection: React.FC = () => {
  const prefersReduced = useReducedMotion()
  return (
    <ScrollColorSection id="education" className="relative section-wrapper scroll-mt-24 py-12 md:py-16 mx-auto max-w-6xl px-4 md:px-6">
      <h2 className="section-heading-sticky text-3xl sm:text-5xl font-extrabold text-gradient mb-3">Education</h2>

      <div className="relative z-10 mt-8 grid gap-6 md:grid-cols-2">
        {[
          <Card key="ms" className="space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-lg font-semibold text-slate-50">Master of Science in Information Systems</div>
                <div className="text-sm text-slate-200/80">Stevens Institute of Technology · Hoboken, NJ</div>
              </div>
              <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-100">GPA 3.94</span>
            </div>
            <div className="text-xs uppercase tracking-[0.18em] text-slate-200/60">Expected May 2026 · Beta Gamma Sigma Honor Society</div>
            <ul className="mt-3 space-y-2 text-sm text-slate-200/90">
              <li>Data Analytics &amp; Machine Learning, Marketing Analytics, Supply Chain Analytics</li>
            </ul>
          </Card>,

          <Card key="be" className="space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-lg font-semibold text-slate-50">Bachelor of Engineering in Information Technology</div>
                <div className="text-sm text-slate-200/80">University of Mumbai · Mumbai, India</div>
              </div>
              <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-100">GPA 3.44</span>
            </div>
            <div className="text-xs uppercase tracking-[0.18em] text-slate-200/60">Completed May 2024</div>
            <ul className="mt-3 space-y-2 text-sm text-slate-200/90">
              <li>Graduated with focus on software systems, database design, and applied analytics.</li>
            </ul>
          </Card>
        ].map((card, i) => (
          <motion.div
            key={i}
            initial={prefersReduced ? undefined : { opacity: 0, y: 12 }}
            whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.12 }}
          >
            {card}
          </motion.div>
        ))}
      </div>
    </ScrollColorSection>
  )
}

const CertificationsSection: React.FC = () => {
  const prefersReduced = useReducedMotion()

  // Small component that adds a "glow" class when the image scrolls into view.
  // It respects the user's reduced-motion preference by immediately enabling the image
  // (no scroll-triggered animation) when reduced motion is active.
  const CertImage: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
    const ref = React.useRef<HTMLImageElement | null>(null)
    const [inView, setInView] = React.useState(false)
    const reduce = useReducedMotion()

    React.useEffect(() => {
      if (reduce) {
        // Respect reduced motion: don't animate on scroll — keep visible state
        setInView(true)
        return
      }

      const el = ref.current
      if (!el) return

      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setInView(true)
              obs.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.45 }
      )

      obs.observe(el)
      return () => obs.disconnect()
    }, [ref, reduce])

    return (
      <img
        ref={ref}
        src={src}
        alt={alt}
        className={`cert-thumb h-56 sm:h-72 md:h-[320px] w-auto rounded-xl shadow-lg object-contain border border-white/6 ${inView ? 'glow' : ''}`}
        onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
      />
    )
  }

  // helper: tags per certification (keep content, add skill-summary tags)
  const certTags: Record<string, string[]> = {
    'Power BI (PL-300) — Microsoft': [
      'Power BI',
      'DAX',
      'Data Modeling',
      'Dashboards',
      'ETL'
    ],
    'Google Data Analytics — Google': [
      'Data Analysis',
      'SQL',
      'Data Cleaning',
      'R',
      'Visualization'
    ],
    'Rutgers Supply Chain Management Specialization — Rutgers': [
      'Supply Chain',
      'Logistics',
      'Procurement',
      'Process Improvement',
      'Analytics'
    ]
  }

  return (
    <ScrollColorSection id="certifications" className="relative section-wrapper scroll-mt-24 py-12 md:py-16 mx-auto max-w-6xl px-4 md:px-6">
      <h2 className="section-heading-sticky text-3xl sm:text-5xl font-extrabold text-gradient mb-3">Certifications</h2>

      <div className="relative z-10 mt-8 flex flex-col">
        {certifications.map((c, i) => {
          const parts = c.split('—')
          const title = parts[0].trim()
          const issuer = parts[1]?.trim()
          const imgName = certImageMap[c]
          const tags = certTags[c] || []

          return (
            <motion.div
              key={c}
              initial={prefersReduced ? undefined : { opacity: 0, y: 12 }}
              whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.42, delay: i * 0.12 }}
              className={i > 0 ? 'mt-6 pt-6 border-t border-white/10' : ''} // subtle divider between cards
            >
              {/*
                Card layout: two-column on md+ (text left, image right), stacked on mobile.
                - Reduced vertical padding: `py-6 px-8` on desktop, smaller `py-4 px-4` on mobile.
                - Left column flexes to take remaining space; right column holds fixed-height image.
              */}
              <Card className="w-full flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 p-4 md:p-6 min-h-[220px] md:min-h-[320px]">
                {/* Left column: title, issuer, tags */}
                <div className="flex-1 min-w-0">
                  <div className="text-lg md:text-xl font-semibold text-slate-50 leading-tight">{title}</div>
                  {issuer && (
                    <div className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-200/60">{issuer}</div>
                  )}

                  {/* Skill tags: pill-style, wrap on small screens */}
                  {tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {tags.map((t) => (
                        <span
                          key={t}
                          className="text-xs font-medium rounded-full bg-white/5 text-white/85 px-3 py-1 leading-none"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Separator between text and image on md+ */}
                <div className="hidden md:block flex-shrink-0 self-stretch w-[1px] mx-4 cert-sep" aria-hidden="true" />

                {/* Right column: certificate image with consistent sizing and styling */}
                {imgName && (
                  <div className="flex-shrink-0 mt-3 md:mt-0 md:ml-4">
                    <a href={`/certs/${encodeURIComponent(imgName)}`} target="_blank" rel="noreferrer" className="block">
                      <CertImage src={`/certs/${encodeURIComponent(imgName)}`} alt={title + ' certificate'} />
                    </a>
                  </div>
                )}
              </Card>
            </motion.div>
          )
        })}
      </div>
    </ScrollColorSection>
  )
}

const HonorsSection: React.FC = () => {
  const prefersReduced = useReducedMotion()
  const [lightboxOpen, setLightboxOpen] = React.useState(false)

  return (
    <ScrollColorSection id="honors" className="relative section-wrapper scroll-mt-24 py-12 md:py-16 mx-auto max-w-6xl px-4 md:px-6">
      <h2 className="section-heading-sticky text-3xl sm:text-5xl font-extrabold text-gradient mb-3">Honors &amp; Awards</h2>

      <div className="relative z-10 mt-8 flex flex-col gap-6">
        {/* Stevens 25 Under 25 */}
        <motion.div
          initial={prefersReduced ? undefined : { opacity: 0, y: 12 }}
          whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <Card className="w-full flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 p-4 md:p-6">
            <div className="flex-1 min-w-0">
              <div className="text-lg md:text-xl font-semibold text-slate-50 leading-tight">
                Stevens School of Business — Inaugural 25 Under 25
              </div>
              <div className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-200/60">
                Stevens Institute of Technology · 2026
              </div>
              <p className="mt-3 text-sm text-slate-200/80 leading-relaxed">
                Recognized among 25 exceptional students across 11 programs for founding companies, driving research,
                and transforming communities before graduation. Selected for developing a generative AI styling system
                for luxury retailer The Webster and equity-focused urban mobility research using ETL pipelines and
                geospatial visualizations.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {['AI & Generative Systems', 'Urban Analytics Research', 'Academic Excellence', 'Community Impact'].map((t) => (
                  <span key={t} className="text-xs font-medium rounded-full bg-white/5 text-white/85 px-3 py-1 leading-none">{t}</span>
                ))}
              </div>
              <a
                href="https://www.stevens.edu/page-basic/25-under-25-honoree-vedant-vijay-shinde"
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-amber-300 hover:text-amber-200 transition-colors"
              >
                View Honoree Profile
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              </a>
            </div>

            <div className="hidden md:block flex-shrink-0 self-stretch w-[1px] mx-4 cert-sep" aria-hidden="true" />

            <div className="flex-shrink-0 self-center mt-3 md:mt-0 w-56 md:w-64 h-44 md:h-52 rounded-xl border border-amber-400/40 p-[3px]">
              <button
                onClick={() => setLightboxOpen(true)}
                className="block w-full h-full rounded-[10px] overflow-hidden focus:outline-none group"
                aria-label="View 25 Under 25 cohort photo"
              >
                <img
                  src="/certs/25-under-25-cohort.png"
                  alt="Stevens School of Business Inaugural 25 Under 25 Cohort"
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
                />
              </button>
            </div>
          </Card>

          {/* Portal renders directly into document.body — escapes all parent stacking contexts */}
          {createPortal(
            <AnimatePresence>
              {lightboxOpen && (
                <motion.div
                  className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-md"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setLightboxOpen(false)}
                >
                  <button
                    onClick={() => setLightboxOpen(false)}
                    className="absolute top-4 right-4 flex items-center justify-center w-10 h-10 rounded-full bg-white/15 border border-white/25 text-white hover:bg-white/25 transition-colors text-base font-bold"
                    aria-label="Close"
                  >
                    ✕
                  </button>
                  <motion.img
                    src="/certs/25-under-25-cohort.png"
                    alt="Stevens School of Business Inaugural 25 Under 25 Cohort"
                    className="max-w-[90vw] max-h-[85vh] w-auto h-auto rounded-2xl shadow-2xl border border-white/10"
                    initial={{ scale: 0.92, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.92, opacity: 0 }}
                    transition={{ duration: 0.22 }}
                    onClick={(e) => e.stopPropagation()}
                  />
                </motion.div>
              )}
            </AnimatePresence>,
            document.body
          )}
        </motion.div>

        {/* Beta Gamma Sigma */}
        <motion.div
          initial={prefersReduced ? undefined : { opacity: 0, y: 12 }}
          whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.12 }}
        >
          <Card className="w-full flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 p-4 md:p-6">
            <div className="flex-1 min-w-0">
              <div className="text-lg md:text-xl font-semibold text-slate-50 leading-tight">
                Beta Gamma Sigma Honor Society
              </div>
              <div className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-200/60">
                International Honor Society for Collegiate Business · April 2026
              </div>
              <p className="mt-3 text-sm text-slate-200/80 leading-relaxed">
                Selected for membership in Beta Gamma Sigma at Stevens Institute of Technology — the premier
                international honor society recognizing high scholastic achievement in AACSB-accredited business
                programs. Membership is conferred in recognition of outstanding academic performance among graduate
                students in the School of Business.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {['Top Graduate Students', 'AACSB Accredited', 'Business Excellence', 'Stevens Institute'].map((t) => (
                  <span key={t} className="text-xs font-medium rounded-full bg-white/5 text-white/85 px-3 py-1 leading-none">{t}</span>
                ))}
              </div>
              <a
                href="/certs/BGS Membership Certificate.pdf"
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-blue-300 hover:text-blue-200 transition-colors"
              >
                View Certificate
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              </a>
            </div>

            <div className="hidden md:block flex-shrink-0 self-stretch w-[1px] mx-4 cert-sep" aria-hidden="true" />

            <div className="flex-shrink-0 flex flex-col items-center justify-center rounded-xl border border-blue-400/40 bg-gradient-to-br from-blue-900/40 to-indigo-900/40 w-56 h-44 md:w-64 md:h-52 gap-1 self-center shadow-[0_0_32px_rgba(99,102,241,0.2)]">
              <span className="text-4xl md:text-5xl font-black text-blue-200 leading-none" style={{ fontFamily: 'Georgia, serif' }}>ΒΓΣ</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-blue-300/70 mt-2">Est. 1913</span>
              <span className="text-[9px] uppercase tracking-wider text-blue-300/50 text-center px-4 mt-0.5">Honor Society</span>
            </div>
          </Card>
        </motion.div>
      </div>
    </ScrollColorSection>
  )
}

const Education: React.FC = () => (
  <>
    <EducationSection />
    <HonorsSection />
    <CertificationsSection />
  </>
)

export { EducationSection, HonorsSection, CertificationsSection }

export default Education
