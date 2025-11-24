import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
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
              <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-100">GPA 4.0</span>
            </div>
            <div className="text-xs uppercase tracking-[0.18em] text-slate-200/60">Expected May 2026 · Merit scholarship</div>
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

const Education: React.FC = () => (
  <>
    <EducationSection />
    <CertificationsSection />
  </>
)

export { EducationSection, CertificationsSection }

export default Education
