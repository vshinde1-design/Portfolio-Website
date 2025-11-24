import React, { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '../ui/Card'
import ScrollColorSection from '../ui/ScrollColorSection'

const skillGroups = [
  { title: 'Programming', skills: ['Python', 'Pandas', 'NumPy', 'scikit-learn', 'SQL'] },
  { title: 'Machine Learning', skills: ['Regression Models', 'Classification Models', 'LightGBM', 'XGBoost', 'Clustering'] },
  { title: 'Data Visualization & Reporting', skills: ['Excel (PivotTables, XLOOKUP, Advanced Formulas, Charts)', 'Tableau', 'Power BI', 'Plotly'] },
  { title: 'Cloud & Developer Tools', skills: ['AWS EC2', 'GitHub', 'Jupyter Notebook', 'MySQL', 'PostgreSQL', 'Node.js'] }
]

const skillDescriptions: Record<string, string> = {
  Python: 'General-purpose language I use for data pipelines, exploration, and automation scripts; commonly use Pandas, NumPy, and scikit-learn for data processing and modeling.',
  Pandas: 'DataFrame library I rely on for cleaning, joining, and reshaping datasets before modeling or visualization.',
  NumPy: 'Array toolkit that speeds up numerical operations, feature engineering, and scientific calculations.',
  'scikit-learn': 'Python ML library for building and validating common models including regression and classification baselines.',
  SQL: 'Query language for shaping relational data, building aggregate views, and powering dashboards across stakeholders.',
  'Regression Models': 'Supervised techniques to predict continuous outcomes — used for demand forecasting and KPI projection.',
  'Classification Models': 'Supervised techniques to assign categories — used for churn prediction, lead scoring, and quality flags.',
  LightGBM: 'Gradient boosting framework optimized for structured/tabular data; used for high-performance modeling.',
  XGBoost: 'Another high-performance gradient boosting library I use when tuning for accuracy and robustness.',
  Clustering: 'Unsupervised grouping approaches used for customer segmentation and discovering usage patterns.',
  'Excel (PivotTables, XLOOKUP, Advanced Formulas, Charts)': 'Advanced spreadsheet workflows for quick analysis, ad-hoc reporting, and stakeholder-ready tables.',
  Tableau: 'Visualization tool for rapid dashboard prototyping and storytelling with business teams.',
  'Power BI': 'Microsoft BI platform for modeling data, writing DAX measures, and publishing interactive dashboards.',
  Plotly: 'Python visualization library for interactive charts embedded in notebooks and web apps.',
  'AWS EC2': 'Cloud compute instances where I host notebooks, APIs, or scheduled analytics jobs.',
  GitHub: 'Version control to collaborate on code, notebooks, and dashboard definitions while preserving experiment history.',
  'Jupyter Notebook': 'Notebook workspace for exploratory data analysis, blending narrative, code, and quick visuals.',
  MySQL: 'Relational database used for transactional or analytics staging environments.',
  PostgreSQL: 'Relational database used for staging analytics datasets and running repeatable SQL transformations.',
  'Node.js': 'JavaScript runtime used for lightweight APIs and integrating analytics workflows into web tools.'
}

const Skills: React.FC = () => {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null)
  const description = useMemo(() => {
    if (!selectedSkill) return null
    return skillDescriptions[selectedSkill] ?? 'Definition coming soon.'
  }, [selectedSkill])

  return (
    <ScrollColorSection id="skills" className="relative section-wrapper scroll-mt-24 py-12 md:py-16 mx-auto max-w-6xl px-4 md:px-6">
      <h2 className="section-heading-sticky text-3xl sm:text-5xl font-extrabold text-gradient mb-6">Skills</h2>
      <div className="relative z-10 grid md:grid-cols-2 gap-6">
        {skillGroups.map((g) => (
          <motion.div key={g.title} className="h-full" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <Card className="h-full flex flex-col justify-start">
              <div className="font-semibold mb-3">{g.title}</div>
              <div className="flex flex-wrap gap-2">
                {g.skills.map((s) => {
                  const active = selectedSkill === s
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSelectedSkill((prev) => (prev === s ? null : s))}
                      className={
                        active
                          ? 'inline-flex items-center rounded-lg border border-violet-400/60 bg-violet-500/20 px-3 py-1 text-sm font-semibold text-violet-100 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400'
                          : 'inline-flex items-center rounded-lg border border-slate-200/20 bg-slate-900/60 px-3 py-1 text-sm text-slate-100 transition hover:border-violet-300/50 hover:text-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400'
                      }
                      aria-pressed={active}
                    >
                      {s}
                    </button>
                  )
                })}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card className="relative z-10 mt-8">
        <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-200/70">Skill Details</div>
        <AnimatePresence initial={false} mode="wait">
          {selectedSkill && description ? (
            <motion.div
              key={selectedSkill}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="mt-4"
            >
              <div className="text-lg font-semibold text-slate-50">{selectedSkill}</div>
              <p className="mt-2 text-sm text-slate-200/90">{description}</p>
            </motion.div>
          ) : (
            <motion.p
              key="hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="mt-2 text-sm text-slate-200/80"
            >
              Click any badge to see how I use that tool in analytics work. Click the same badge again to collapse.
            </motion.p>
          )}
        </AnimatePresence>
      </Card>
    </ScrollColorSection>
  )
}

export default Skills
