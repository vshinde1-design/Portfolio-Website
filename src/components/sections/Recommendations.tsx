import React, { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Card } from '../ui/Card'
import ScrollColorSection from '../ui/ScrollColorSection'

const recommendations = [
  {
    quote: 'Vedant completed all assigned tasks on time, produced high-quality results, and took initiative through clear communication. His strong Python and data analytics skills were evident in building and testing data collection pipelines, processing data to generate system utilities, and applying fairness metrics to evaluate system performance.',
    name: 'Dr. Violet Chen',
    title: 'Assistant Professor, Analytics and Information Systems',
    institution: 'Stevens Institute of Technology',
    relation: 'Research Mentor, Summer 2025',
    linkedIn: true,
    photo: '/certs/prof_image.jpg'
  }
]

const Recommendations: React.FC = () => {
  const prefersReduced = useReducedMotion()
  const [imageError, setImageError] = useState<Record<string, boolean>>({})

  const LinkedInIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false" {...props}>
      <path d="M20.45 20.45h-3.55v-5.3c0-1.26-.03-2.88-1.75-2.88-1.75 0-2.02 1.37-2.02 2.79v5.39H9.57V9h3.4v1.56h.05c.47-.89 1.62-1.83 3.33-1.83 3.57 0 4.23 2.35 4.23 5.4v6.32ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12Zm-1.78 13.02h3.55V9H3.56v11.45Z" />
    </svg>
  )

  // Avatar component with initials fallback
  const AvatarPlaceholder: React.FC<{ name: string }> = ({ name }) => {
    const initials = name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()

    return (
      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-purple-400/60 to-violet-500/60 border border-purple-300/40 flex items-center justify-center">
        <span className="text-sm font-bold text-white">{initials}</span>
      </div>
    )
  }

  return (
    <ScrollColorSection id="recommendations" className="relative section-wrapper scroll-mt-24 py-12 md:py-16 mx-auto max-w-6xl px-4 md:px-6">
      <h2 className="section-heading-sticky text-3xl sm:text-5xl font-extrabold text-gradient mb-8">Recommendations</h2>

      <div className="relative z-10 flex flex-col gap-6">
        {recommendations.map((rec, idx) => (
          <motion.div
            key={rec.name}
            initial={prefersReduced ? undefined : { opacity: 0, y: 18 }}
            whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.18 }}
            transition={prefersReduced ? undefined : { duration: 0.55, delay: idx * 0.12, ease: [0.2, 0.8, 0.2, 1] }}
            whileHover={{ y: -4 }}
          >
            <Card className="p-6 md:p-8">
              {/* Quote section */}
              <div className="mb-6">
                <div className="flex items-start gap-3">
                  <span className="text-4xl font-bold text-purple-400/40 leading-none flex-shrink-0">"</span>
                  <p className="text-sm md:text-base text-slate-200/90 leading-relaxed italic">{rec.quote}</p>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-white/6 my-6" />

              {/* Recommender info */}
              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-3">
                  {/* Avatar */}
                  {rec.photo && !imageError[rec.name] ? (
                    <img
                      src={rec.photo}
                      alt={rec.name}
                      className="flex-shrink-0 w-12 h-12 rounded-full object-cover border border-purple-300/40"
                      onError={() => setImageError({ ...imageError, [rec.name]: true })}
                    />
                  ) : (
                    <AvatarPlaceholder name={rec.name} />
                  )}

                  {/* Name and LinkedIn badge */}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-50">{rec.name}</h3>
                    {rec.linkedIn && (
                      <div className="flex items-center gap-1 mt-0.5">
                        <span className="text-xs text-slate-400">Verified on LinkedIn</span>
                        <LinkedInIcon className="w-3.5 h-3.5 text-blue-400" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Title and institution */}
                <div>
                  <div className="text-sm text-slate-300">{rec.title}</div>
                  <div className="text-sm text-slate-400">{rec.institution}</div>
                </div>

                {/* Relation */}
                <div className="text-xs uppercase tracking-[0.1em] text-primary font-semibold mt-1">{rec.relation}</div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </ScrollColorSection>
  )
}

export default Recommendations
