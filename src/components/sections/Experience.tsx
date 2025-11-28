import React from 'react'
import { Card } from '../ui/Card'
import ScrollColorSection from '../ui/ScrollColorSection'
import { motion } from 'framer-motion'

const experiences = [
  {
    role: 'Graduate Research Assistant – Data Visualization and Insights',
    org: 'Stevens Institute of Technology',
    loc: 'Hoboken, NJ, USA',
    dates: '11/2025 – Present',
    impact: 'Created scalable analytics and visualization tooling to support cross-city fairness assessments for micromobility systems.',
    bullets: [
      'Create a multi-city analytics architecture that standardizes fairness metrics, decile ranks, and peak/off-peak service patterns across 12+ cities, enabling faster cross-region comparisons and more consistent decision-making for transportation planners',
      'Produce Python-driven visuals—including drift indicators, mismatch maps, and infrastructure-to-usage overlays—that uncover localized service gaps, empowering stakeholders to prioritize deployment and reduce underserved-zone complaints',
      'Streamline operational reporting by building an automated workflow that generates 15+ geospatial and supply–demand visuals per city, cutting manual analysis time and supporting rapid iteration during policy reviews'
    ]
  },
  {
    role: 'Graduate Assistant – Campus Recreation',
    org: 'Stevens Institute of Technology',
    loc: 'Hoboken, NJ, USA',
    dates: '09/2024 – Present',
    impact: 'Optimized campus programming with data-backed scheduling recs.',
    bullets: [
      'Analyze participation data from 50+ recreational events to uncover trends that guide scheduling decisions and improve event turnout.',
      'Manage front desk operations for 200+ daily visitors, maintaining accurate attendance records and structured datasets.',
      'Provide data-driven insights to support campus recreation planning and resource allocation.'
    ]
  },
  {
    role: 'Graduate Yielding Assistant',
    org: 'Graduate Admissions, Stevens Institute of Technology',
    loc: 'Hoboken, NJ, USA',
    dates: '10/2025 – 11/2025',
    impact: 'Improved onboarding efficiency and cross-department coordination for incoming graduate students.',
    bullets: [
      'Improved onboarding efficiency for 100+ incoming graduate students by serving as their primary contact for questions on housing, orientation, and financial aid; escalated complex cases to the correct departments, reducing follow-up volume and ensuring faster resolution.',
      'Strengthened student support workflows by documenting detailed call notes in Excel and uploading structured insights into Slate, enabling Graduate Admissions to identify recurring concerns and streamline cross-department communication.',
      'Enhanced student confidence and engagement through daily outreach calls, providing clear guidance, resolving concerns with empathy, and helping incoming students transition smoothly into their graduate programs.'
    ]
  },
  {
    role: 'Summer Research Assistant – Big Data Analytics',
    org: 'Stevens Institute of Technology',
    loc: 'Hoboken, NJ, USA',
    dates: 'May 2025 – Jul 2025',
    impact: 'Built core data engineering and modeling pipelines to enable reliable, large-scale mobility analytics.',
    bullets: [
      'Constructed a large-scale ETL pipeline (Python + AWS EC2) to ingest and clean millions of real-time mobility records from 8 systems, improving data reliability and enabling teams to run downstream analytics without pipeline failures.',
      'Engineered geospatial and statistical models that exposed 30% lower vehicle availability in disadvantaged neighborhoods, giving leadership a measurable basis for rebalancing fleet allocation and reducing wait times.',
      'Synthesized temporal, supply, and demand KPIs into dynamic Power BI dashboards that highlighted peak-hour shortages, helping resource teams plan capacity improvements tied directly to predicted rider spikes.'
    ]
  },
  {
    role: 'Undergraduate Data Analyst – Inventory & Demand Forecasting',
    org: 'Terna Engineering College',
    loc: 'Navi Mumbai, MH, India',
    dates: 'Sep 2023 – Apr 2024',
    impact: 'Implemented operational analytics and audit tooling to improve inventory reliability and surface product insights.',
    bullets: [
      'Implemented an SQL-driven auditing system tracking 500+ vendor purchase orders, flagging discrepancies and reducing supplier-related delay escalations by giving procurement clear visibility into order reliability.',
      'Extracted workflow bottlenecks by analyzing 200+ unstructured operational notes, guiding department leads to revise processes and reduce recurring service interruptions.',
      'Identified 18 high-value product affinity patterns from 5,000+ transactions, informing a new store-layout strategy that increased bundle opportunities and improved promotional targeting.'
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
