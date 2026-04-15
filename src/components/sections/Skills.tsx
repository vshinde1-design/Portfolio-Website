import React, { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '../ui/Card'
import ScrollColorSection from '../ui/ScrollColorSection'

const skillGroups = [
  { title: 'Programming', skills: ['Python', 'Pandas', 'NumPy', 'GeoPandas', 'scikit-learn', 'SQL'] },
  { title: 'Machine Learning & AI', skills: ['Regression Models', 'Classification Models', 'LightGBM', 'XGBoost', 'Clustering', 'LLMs', 'Product Embeddings', 'Vector Search', 'Ollama'] },
  { title: 'Data Visualization & Reporting', skills: ['Microsoft Excel', 'Tableau', 'Power BI', 'DAX', 'Plotly'] },
  { title: 'Data Engineering & Cloud', skills: ['ETL Pipelines', 'AWS EC2', 'MySQL', 'PostgreSQL', 'GitHub', 'Jupyter Notebook'] },
  { title: 'Statistical & Analytical Methods', skills: ['RFM Segmentation', 'Cohort Analysis', 'Statistical Testing', 'A/B Testing', 'Demand Forecasting'] },
  { title: 'Domain Knowledge', skills: ['Supply Chain Analytics', 'Transportation Equity', 'Retail Merchandising', 'Inventory Management', 'Marketing Analytics', 'Facilities Operations'] }
]

const skillDescriptions: Record<string, string> = {
  Python: 'General-purpose language I use for data pipelines, exploration, automation scripts, and model development; commonly use Pandas, NumPy, and scikit-learn for data processing and modeling.',
  Pandas: 'DataFrame library I rely on for cleaning, joining, reshaping datasets, and working with large transactional data before modeling or visualization.',
  NumPy: 'Array toolkit that speeds up numerical operations, feature engineering, and scientific calculations across datasets.',
  GeoPandas: 'Geospatial data processing library I use for location-based analysis, spatial joins, and mapping operational data across cities and regions.',
  'scikit-learn': 'Python ML library for building and validating common models including regression, classification baselines, and clustering.',
  SQL: 'Query language for shaping relational data, building aggregate views, RFM segmentation queries, and powering dashboards across stakeholders.',
  'Regression Models': 'Supervised techniques to predict continuous outcomes — used for demand forecasting, pricing optimization, and KPI projection.',
  'Classification Models': 'Supervised techniques to assign categories — used for churn prediction, lead scoring, customer segmentation, and quality flags.',
  LightGBM: 'Gradient boosting framework optimized for structured/tabular data; used for high-performance modeling and feature interactions.',
  XGBoost: 'High-performance gradient boosting library I use when tuning for accuracy, robustness, and complex feature relationships.',
  Clustering: 'Unsupervised grouping approaches (K-means, hierarchical) used for RFM segmentation, customer grouping, and pattern discovery.',
  LLMs: 'Large Language Models used for semantic understanding, embedding generation, and AI-driven recommendations in product discovery systems.',
  'Product Embeddings': 'Vector representations of products using LLMs and neural networks to power similarity-based recommendations and personalization.',
  'Vector Search': 'Search and retrieval technique using embeddings to find semantically similar items for recommendation systems and customer matching.',
  Ollama: 'Local LLM framework used for running open-source language models efficiently in analytics and AI workflows.',
  'Microsoft Excel': 'Advanced spreadsheet workflows including PivotTables, XLOOKUP, complex formulas, and charts for quick analysis, ad-hoc reporting, forecasting, and stakeholder-ready presentations.',
  Tableau: 'Visualization tool for rapid interactive dashboard prototyping and data storytelling with business teams.',
  'Power BI': 'Microsoft BI platform for data modeling, writing DAX measures, row-level security, and publishing dashboards with advanced interactivity.',
  DAX: 'Data Analysis Expressions language for creating calculated columns, measures, and complex aggregations in Power BI dashboards.',
  Plotly: 'Python visualization library for interactive charts, dashboards, and embedded visuals in notebooks and web applications.',
  'ETL Pipelines': 'Extract, Transform, Load workflows for consolidating data from multiple sources, cleaning, and preparing datasets for analysis.',
  'AWS EC2': 'Cloud compute instances where I host notebooks, APIs, scheduled jobs, and analytics workflows at scale.',
  MySQL: 'Relational database used for transactional systems, analytics staging, and data warehouse environments.',
  PostgreSQL: 'Advanced relational database for staging analytics datasets, running complex SQL transformations, and JSON data handling.',
  GitHub: 'Version control to collaborate on code, notebooks, and dashboard definitions while preserving experiment history and reproducibility.',
  'Jupyter Notebook': 'Notebook workspace for exploratory data analysis, blending narrative documentation, code, and interactive visualizations.',
  'RFM Segmentation': 'Customer segmentation technique using Recency, Frequency, and Monetary value to identify high-value and at-risk customers.',
  'Cohort Analysis': 'Behavioral analysis technique to track customer groups over time, measure retention, and quantify churn patterns.',
  'Statistical Testing': 'Hypothesis testing methods (chi-square, t-tests, Cohen\'s d) used to validate segment differences and measure effect sizes.',
  'A/B Testing': 'Experimental design and analysis to measure the impact of changes on user behavior, retention, and business metrics.',
  'Demand Forecasting': 'Time series and regression techniques to predict future demand, inventory needs, and sales trends.',
  'Supply Chain Analytics': 'Analytical methods for procurement optimization, supplier performance, inventory management, and logistics cost reduction.',
  'Transportation Equity': 'Data-driven assessment of service distribution, access gaps, and equity metrics across urban regions to inform policy and resource allocation.',
  'Retail Merchandising': 'Analytics approaches for product assortment, pricing strategy, inventory allocation, and customer purchase pattern analysis.',
  'Inventory Management': 'Forecasting and optimization techniques for inventory levels, turnover rates, stockout prevention, and working capital efficiency.',
  'Marketing Analytics': 'Customer acquisition, retention, and lifetime value analysis to inform campaign ROI, segmentation, and funnel optimization.',
  'Facilities Operations': 'Data analysis for space utilization, demand forecasting, resource allocation, and operational efficiency in campus and institutional settings.'
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
