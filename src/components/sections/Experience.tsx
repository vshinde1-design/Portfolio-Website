import React from 'react'
import { Card } from '../ui/Card'
import ScrollColorSection from '../ui/ScrollColorSection'
import { motion } from 'framer-motion'

const experiences = [
  {
    role: 'Research Assistant, Data Analytics',
    org: 'Stevens Institute of Technology',
    loc: 'Hoboken, NJ',
    dates: 'Nov 2025 – Apr 2026',
    impact: 'Architected a 9-module Python analytics pipeline for bike-share data supporting Journal of Transport Geography publication.',
    bullets: [
      'Architected a 9-module Python analytics pipeline consolidating real-time bike-share data across 7 U.S. city systems, reducing multi-day manual workflows to a single automated solution supporting a Journal of Transport Geography publication',
      'Quantified service equity gaps across 12+ U.S. cities by applying statistical distribution metrics across 5 operational dimensions, delivering findings that directly informed multi-city transportation investment recommendations',
      'Eliminated critical data gaps via automated location-matching and high-frequency usage inference, transforming 7 disconnected research notebooks into structured reusable Python modules that enabled rapid reuse across follow-on analyses'
    ]
  },
  {
    role: 'Research Assistant, Data Analytics (Summer Fellow)',
    org: 'Stevens Institute of Technology',
    loc: 'Hoboken, NJ',
    dates: 'May 2025 – Jul 2025',
    impact: 'Built a Python + AWS pipeline consolidating millions of operational records from 8 systems for cross-regional benchmarking.',
    bullets: [
      'Built a Python + AWS data pipeline consolidating millions of operational records from 8 systems into a centralized dataset for cross-regional benchmarking and trend analysis',
      'Identified critical service gaps across 9 regions by analyzing demographic and performance datasets, informing research on service distribution and operational equity',
      'Created Tableau dashboards isolating the top three drivers of operational delays by geography, supporting investment decisions across multiple city-level agencies'
    ]
  },
  {
    role: 'Student Data Analyst',
    org: 'Terna Engineering College',
    loc: 'Navi Mumbai, MH, India',
    dates: 'Feb 2023 – May 2024',
    impact: 'Designed inventory analytics pipeline and deployed 4-dashboard Power BI suite, cutting reporting time by 40%.',
    bullets: [
      'Designed an inventory analytics pipeline querying a 50,000+ row SQL database and restructuring 3 years of historical data with Pandas, consolidating procurement records across 8+ product categories into a single analysis-ready dataset',
      'Deployed a 4-dashboard Power BI suite covering inventory turnover, supplier lead times, and enrollment-driven demand — eliminated legacy Excel reporting and cut prep time by 40%',
      'Constructed a Python forecasting model using moving averages, exponential smoothing, and enrollment-driven calendar variables; backtested against 3 prior years of data, projecting a 15% stockout reduction during peak periods'
    ]
  }
]

const Experience: React.FC = () => {
  return (
    <ScrollColorSection id="experience" className="relative section-wrapper scroll-mt-24 py-12 md:py-16 mx-auto max-w-6xl px-4 md:px-6 mb-24 md:mb-32">
      <h2 className="section-heading-sticky text-3xl sm:text-5xl font-extrabold text-gradient mb-3">Experience</h2>

      <div className="relative mt-8">
        <div className="absolute inset-y-0 left-[15px] hidden w-px bg-gradient-to-b from-purple-400/40 via-purple-400/20 to-purple-400/0 md:block" aria-hidden />
        <ol className="relative space-y-6">
          {experiences.map((e, i) => (
            <motion.li key={e.role} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.06 }}>
              <Card className="relative overflow-hidden pl-10 md:pl-16">
                <div className="absolute left-4 top-6 hidden h-3 w-3 -translate-x-1/2 rounded-full bg-gradient-to-br from-purple-300 via-violet-400 to-blue-400 shadow-[0_0_16px_rgba(140,120,255,0.65)] md:block" aria-hidden />

                {/* Glass pill that appears when the card scrolls into view */}
                <motion.div
                  aria-hidden
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.06 + 0.08 }}
                  className="absolute right-4 top-4 hidden rounded-full px-4 py-2 text-sm font-semibold bg-white/6 backdrop-blur-md border border-white/12 text-white shadow-md md:block"
                >
                  {e.dates}
                </motion.div>

                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="flex-1">
                    <div className="flex flex-col gap-1">
                      <div className="text-sm font-semibold uppercase tracking-[0.12em] text-purple-200/70">{e.org}</div>
                      <div className="text-xl font-semibold text-slate-50">{e.role}</div>
                      <div className="text-sm text-slate-200/80">{e.loc}</div>
                    </div>

                    <p className="mt-3 text-sm text-purple-200/70">{e.impact}</p>

                    <ul className="mt-4 space-y-3 text-sm text-slate-200/90 leading-relaxed">
                      {e.bullets.map((b) => (
                        <li key={b} className="relative pl-4">
                          <span className="absolute left-0 top-2 h-1.5 w-1.5 rounded-full bg-purple-300/70" aria-hidden />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* date is shown in the glass pill at the top-right; remove the duplicate static date here */}
                </div>
              </Card>
            </motion.li>
          ))}
        </ol>
      </div>
    </ScrollColorSection>
  )
}

export default Experience
