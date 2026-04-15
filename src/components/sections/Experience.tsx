import React from 'react'
import { Card } from '../ui/Card'
import ScrollColorSection from '../ui/ScrollColorSection'
import { motion } from 'framer-motion'

const experiences = [
  {
    role: 'Research Assistant, Data Analytics',
    org: 'Stevens Institute of Technology',
    loc: 'Hoboken, NJ, USA',
    dates: 'Nov 2025 – Apr 2026',
    impact: 'Standardized and merged operational datasets to enable cross-city analysis and informed transportation investment decisions.',
    bullets: [
      'Standardized and merged operational datasets from 12+ U.S. cities using Python (Pandas, NumPy, GeoPandas), reducing data inconsistencies by 20% and cutting processing time by 30%.',
      'Quantified service equity gaps across 12+ U.S. cities by applying statistical distribution metrics across 5 operational dimensions, delivering findings that directly informed multi-city transportation investment recommendations.',
      'Automated recurring reporting with reusable Python scripts and Power BI dashboards, reducing manual workload by 45% and streamlining stakeholder deliverables.'
    ]
  },
  {
    role: 'Research Assistant, Data Analytics (Summer Fellow)',
    org: 'Stevens Institute of Technology',
    loc: 'Hoboken, NJ, USA',
    dates: 'May 2025 – Jul 2025',
    impact: 'Built a data pipeline consolidating 5M+ records from 8 transit systems, enabling the first cross-regional performance benchmarking across 9 cities.',
    bullets: [
      'Built a Python + AWS data pipeline consolidating 5M+ operational records from 8 transit systems into a centralized dataset, enabling the research team\'s first cross-regional performance benchmarking across 9 cities.',
      'Performed demographic and operational analysis across 9 regions using SQL and Python, uncovering 3 key service coverage gaps that were cited in the research team\'s policy recommendation report to city-level transit agencies.',
      'Developed Tableau dashboards visualizing the top 3 drivers of operational delays by geography, presented to stakeholders at 4 city-level agencies to guide resource allocation decisions.'
    ]
  },
  {
    role: 'Campus Recreation Assistant',
    org: 'Stevens Institute of Technology',
    loc: 'Hoboken, NJ, USA',
    dates: '09/2024 – Present',
    impact: 'Increased event turnout through data-driven scheduling and operational optimization.',
    bullets: [
      'Forecasted participation trends across 15+ recreational programs using rolling average models in Excel, supporting data-informed staffing allocation and equipment scheduling decisions.',
      'Structured checkout and usage datasets using PivotTables and validation rules, improving inventory visibility and enabling more efficient resource planning for facilities serving 200+ daily visitors.'
    ]
  },
  {
    role: 'Student Data Analyst',
    org: 'Terna Engineering College',
    loc: 'Navi Mumbai, MH, India',
    dates: 'Feb 2023 – May 2024',
    impact: 'Designed inventory analytics pipeline and created first unified dataset, cutting data prep time by 35%.',
    bullets: [
      'Designed an inventory analytics pipeline querying 50,000+ rows in SQL and restructuring 3 years of procurement data with Pandas across 8+ categories, creating the first unified dataset and cutting data prep time by 35%.',
      'Deployed a 4-dashboard Power BI suite covering inventory turnover, supplier lead times, and enrollment-driven demand — eliminated legacy Excel reporting and cut prep time by 40%.',
      'Constructed a Python forecasting model using moving averages, exponential smoothing, and enrollment-driven calendar variables; validated against 3 prior years of data and reduced stockouts by 15% during peak periods.'
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
