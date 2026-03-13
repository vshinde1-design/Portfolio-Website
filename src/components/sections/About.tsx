import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Badge } from '../ui/Badge'
import ScrollColorSection from '../ui/ScrollColorSection'

const highlightedSkills = ['Data Analytics', 'Machine Learning', 'Python & SQL', 'Power BI', 'Supply Chain Analytics']

const About: React.FC = () => {
  const prefersReduced = useReducedMotion()

  return (
    <ScrollColorSection id="about" className="relative section-wrapper scroll-mt-24 py-12 md:py-16 mx-auto max-w-6xl px-4 md:px-6 mt-24 md:mt-32">
      <h2 className="section-heading-sticky text-3xl sm:text-5xl font-extrabold text-gradient mb-6">About Me</h2>

      <div className="grid md:grid-cols-2 gap-8 items-center">
        <motion.div
          initial={prefersReduced ? undefined : { opacity: 0, y: 12 }}
          whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center"
        >
          <div className="relative w-full max-w-md group">
            <div
              className="absolute -inset-8 z-0 rounded-[40px] pointer-events-none transition duration-300 opacity-30 group-hover:opacity-60 group-hover:scale-105 group-hover:blur-[60px]"
              style={{
                background: 'radial-gradient(circle at 60% 40%, rgba(124,58,237,0.22) 0%, rgba(59,130,246,0.13) 40%, transparent 80%)'
              }}
              aria-hidden
            />
            <div className="relative z-10 rounded-[26px] border border-white/10 glass-card p-4 shadow-[0_20px_80px_rgba(9,5,24,0.65)] transition-transform duration-300 group-hover:scale-105">
              <img src="/certs/VedantShinde0939.jpg" alt="Portrait of Vedant Shinde" className="w-full rounded-[18px] object-cover" />
            </div>
          </div>
        </motion.div>

        <div className="space-y-6 text-slate-100">

          {[
            <p key="p1" className="mt-4 text-[1.125rem] leading-7 text-slate-100/90">I am a Master’s candidate in Information Systems with 2+ years of experience using data to solve operational and business problems across transportation, retail, and facilities environments. I work comfortably with large, unstructured datasets and focus on building analytical workflows that translate raw data into decisions.</p>,
            <p key="p2" className="mt-4 text-[1.125rem] leading-7 text-slate-100/90">My experience includes developing Python and SQL pipelines, designing Power BI dashboards for KPI tracking, and applying forecasting and statistical analysis to understand demand patterns, service gaps, and performance trends. I am particularly interested in roles where analytics directly improves efficiency, planning, and customer experience.</p>,
            <p key="p3" className="mt-4 text-[1.125rem] leading-7 text-slate-100/90">I am naturally curious, structured in my approach, and motivated by measurable outcomes. I enjoy working in fast-moving environments where data is incomplete, questions are evolving, and insights need to be practical and actionable.</p>,
            <div key="badges" className="flex flex-wrap gap-2">{highlightedSkills.map((skill) => (<Badge key={skill}>{skill}</Badge>))}</div>
          ].map((el, i) => (
            <motion.div
              key={i}
              initial={prefersReduced ? undefined : { opacity: 0, y: 12 }}
              whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.12 }}
            >
              {el}
            </motion.div>
          ))}

        </div>
      </div>
    </ScrollColorSection>
  )
}

export default About
