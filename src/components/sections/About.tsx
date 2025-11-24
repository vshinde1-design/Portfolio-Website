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
            <p key="p1" className="mt-4 text-[1.125rem] leading-7 text-slate-100/90">I am a detail-oriented and analytical Master's candidate in Information Systems with a strong foundation in <span className="text-indigo-300"> data analytics, machine learning, and data visualization.</span> <span className="inline-block rounded-full bg-white/10 px-3 py-1 mx-2 text-xs font-semibold text-white/90 border border-white/15">Microsoft Power BI Data Analyst Associate (PL-300)</span> I transform complex data into actionable insights that drive strategic decisions and operational excellence.</p>,
            <p key="p2" className="mt-4 text-[1.125rem] leading-7 text-slate-100/90">With advanced proficiency in <span className="text-indigo-300">Python and SQL</span>, I specialize in demand forecasting, inventory optimization, and building machine learning models that enhance operational agility. My expertise extends to designing intuitive BI dashboards that illuminate KPIs and empower data-driven strategies.</p>,
            <p key="p3" className="mt-4 text-[1.125rem] leading-7 text-slate-100/90">I thrive in collaborative environments, working seamlessly with cross-functional teams to achieve project goals. Whether leading research initiatives or contributing to team efforts, I approach every challenge with clarity, focus, and a commitment to excellence.</p>,
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
