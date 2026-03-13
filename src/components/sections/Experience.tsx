import React from 'react'
import { Card } from '../ui/Card'
import ScrollColorSection from '../ui/ScrollColorSection'
import { motion } from 'framer-motion'

const experiences = [
  {
    role: 'Research Data Analyst',
    org: 'Stevens Institute of Technology',
    loc: 'Hoboken, NJ, USA',
    dates: '11/2025 – Present',
    impact: 'Enabled faster cross-region decision-making through standardized analytics frameworks covering 12+ cities.',
    bullets: [
      'Standardized mobility datasets from 12+ cities using Python (Pandas, NumPy, GeoPandas), achieving an estimated 20% reduction in data inconsistencies and 25-30% faster processing.',
      'Evaluated neighborhood-level supply–demand equity across 200+ census tracts using Gini and Alpha fairness metrics, enabling researchers to prioritize underserved regions for transportation policy recommendations.',
      'Reduced manual reporting workload by 45% by developing reusable analytics scripts and automated Power BI dashboards that streamlined recurring research deliverables and stakeholder presentations.'
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
    role: 'Research Data Analyst (Summer Fellow)',
    org: 'Stevens Institute of Technology',
    loc: 'Hoboken, NJ, USA',
    dates: '05/2025 – 07/2025',
    impact: 'Stabilized large-scale analytics workflows and identified systemic equity disparities in vehicle availability.',
    bullets: [
      'Designed and implemented a Python and AWS data pipeline consolidating mobility records from 8 transportation systems into a centralized research dataset, processing millions of records.',
      'Pinpointed critical service gaps across 9 urban neighborhoods by analyzing demographic and transit usage datasets, directly informing research on transportation equity and operational distribution strategies for improved accessibility.',
      'Designed user-friendly Power BI dashboards, which helped analysts to identify three biggest causes of transit delays across different geographical locations, supporting data-driven decisions for infrastructure projects.'
    ]
  },
  {
    role: 'Student Data Analyst',
    org: 'Terna Engineering College',
    loc: 'Navi Mumbai, MH, India',
    dates: '02/2023 – 04/2024',
    impact: 'Reduced supplier delays and uncovered product affinity patterns driving merchandising strategy.',
    bullets: [
      'Analyzed 6,000+ bookstore transactions across 300+ SKUs using SQL queries to identify seasonal demand patterns and slow-moving inventory trends influencing procurement and restocking strategies.',
      'Built Power BI dashboards tracking supplier fulfillment performance, demand fluctuations, and inventory turnover KPIs, reducing manual report preparation time by approximately 40%.',
      'Generated semester-level demand forecasts using moving average models in Python and Excel, improving inventory allocation planning and reducing stock shortages during peak demand periods by an estimated 15%.'
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
