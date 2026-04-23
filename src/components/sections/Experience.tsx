import React from 'react'
import { Card } from '../ui/Card'
import ScrollColorSection from '../ui/ScrollColorSection'
import { motion } from 'framer-motion'

const experiences = [
  {
    role: 'Data Analyst',
    org: 'Stevens Institute of Technology',
    loc: 'Hoboken, NJ',
    dates: 'Nov 2025 – Apr 2026',
    impact: 'Unified operational datasets across 12+ cities to enable analytics and inform transportation investment decisions.',
    bullets: [
      'Cut data inconsistencies 20% and reduced processing time 30% by unifying operational datasets across 12+ U.S. cities, standardizing disparate city feeds in Python (Pandas, NumPy, GeoPandas) through schema validation and geospatial joins',
      'Shaped multi-city transportation investment recommendations by quantifying service equity gaps across 12+ U.S. cities, applying statistical distribution metrics (Gini, coefficient of variation, quantile analysis) across 5 operational dimensions',
      'Automated recurring reporting to eliminate 45% of manual workload, building reusable Python scripts with parameterized refresh logic that streamlined stakeholder deliverables across the research team'
    ]
  },
  {
    role: 'Data Analyst (Summer Fellow)',
    org: 'Stevens Institute of Technology',
    loc: 'Hoboken, NJ',
    dates: 'May 2025 – Jul 2025',
    impact: 'Architected a Python and AWS pipeline enabling the team\'s first cross-regional benchmarking across 9 cities.',
    bullets: [
      'Enabled the research team\'s first cross-regional benchmarking across 9 cities by architecting a Python and AWS pipeline (S3 staging, EC2 processing), consolidating 5M+ operational records from 8 transit systems into a centralized dataset',
      'Uncovered 3 critical service coverage gaps across 9 regions through demographic and operational analysis in SQL and Python (joins, aggregations); findings cited in the team\'s policy recommendation report to city-level transit agencies',
      'Guided resource allocation at 4 city-level agencies by building Tableau dashboards visualizing the top 3 drivers of operational delays by geography, presented directly to stakeholders to inform service planning'
    ]
  },
  {
    role: 'Data Analyst',
    org: 'Terna Engineering College',
    loc: 'Navi Mumbai, MH, India',
    dates: 'Feb 2023 – May 2024',
    impact: 'Consolidated 3 years of procurement data and deployed a 4-dashboard analytics suite, cutting prep time 35-40%.',
    bullets: [
      'Consolidated 3 years of procurement data into the department\'s first unified dataset, designing an inventory analytics pipeline that queried 50,000+ rows in SQL and restructured records with Pandas across 8+ categories, cutting data prep time 35%',
      'Replaced legacy Excel reporting and improved prep time 40% by deploying a 4-dashboard Power BI suite covering inventory turnover, supplier lead times, and enrollment-driven demand with drill-through navigation',
      'Forecasted peak-period demand to reduce stockouts 15%, building a Python model using moving averages, exponential smoothing, and enrollment-driven calendar variables, validated against 3 prior years of data'
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
