import React, { useMemo, useState } from 'react'
import { Card } from '../ui/Card'
import ScrollColorSection from '../ui/ScrollColorSection'
import { motion, useReducedMotion } from 'framer-motion'

type Project = {
  name: string
  desc: string
  tech: string[]
  // media can be a single image path or an array of image paths
  media: string | string[]
  repo?: string
  category: 'Analytics Ops' | 'AI & ML' | 'Dashboards'
  impact: string
  metrics: string
  details?: string[]
}

const projects: Project[] = [
  {
    name: 'AI-Driven Personalization Engine (The Webster)',
    desc: 'Developed a GPT-style fashion recommender trained on a 25,000-product dataset, generating contextual outfits based on style, budget, and occasion.',
    tech: ['Python', 'LLMs', 'Product Embeddings', 'Vector Search'],
    media: '/certs/Industry Capstone/Industry Capstone_GPT_Photo Visualization.mp4',
    category: 'AI & ML',
    impact: 'Scaled contextual outfit generation and improved product-match relevance for conversion-driven recommendations.',
    metrics: '25,000 products · 08/2025–Present',
    details: [
      'Developed a GPT-style fashion recommender trained on a 25,000-product dataset, generating contextual outfits based on style, budget, and occasion—helping retail teams scale personalized styling without additional human labor.',
      'Formulated a style-weighting system using influencer aesthetic profiles, improving product-match relevance and enabling more engaging, conversion-driven recommendations for shoppers on the platform.'
    ]
  },
  {
    name: 'Grocerly – AI Grocery & Retail Assistant',
    desc: 'Launched an AI grocery assistant capable of SKU-aware recipe planning, price-based substitutions, and nutrition insights across a normalized catalog.',
    tech: ['Node.js', 'React', 'Ollama', 'ETL', 'MySQL'],
    media: '/certs/Grocerly/Screenshot 2025-11-24 104339.png',
    repo: 'https://github.com/Vedantshi/grocery-assistant-chatbot.git',
    category: 'AI & ML',
    impact: 'Enabled SKU-aware recipe recommendations and retail-grade ETL for accurate meal costing and inventory-aware substitutions.',
    metrics: '600+ normalized products · 09/2025–11/2025',
    details: [
      'Launched an AI grocery assistant using Node.js, React UMD, and Ollama capable of SKU-aware recipe planning, price-based substitutions, and nutrition insights—mirroring functionality used by modern retail personalization tools.',
      'Orchestrated a retail-grade ETL pipeline for fuzzy ingredient matching, unit standardization, and price/calorie enrichment across 600+ grocery products, supporting accurate meal costing and enabling data-driven promotions, inventory decisions, and upsell opportunities.'
    ]
  },
  {
    name: 'Retail Price Optimization',
    desc: 'Developed pricing and margin optimization tools combining demand forecasting and interactive pricing simulations.',
    tech: ['Python', 'XGBoost', 'Tableau', 'SQL'],
    media: [
      '/certs/Price Optimization/sales_profit.png',
      '/certs/Price Optimization/freight_impact.png',
      '/certs/Price Optimization/xgboost_output.png'
    ],
    repo: 'https://github.com/Vedantshi/retail-price-optimization',
    category: 'Analytics Ops',
    impact: 'Built demand and margin simulations to inform price decisions and recover hidden margin losses.',
    metrics: 'Pricing & margin analytics · 06/2024–10/2024',
    details: [
      'Developed an XGBoost-based demand prediction model using pricing, competitor benchmarks, and freight-cost features, enabling accurate simulation of price changes and identifying high price-sensitivity products across categories.',
      'Built a margin optimization framework that quantified how price gaps vs. competitors and freight percentages impact profitability, revealing hidden margin losses and uncovering underperforming SKUs despite strong sales volume.',
      'Designed interactive Tableau dashboards—including competitor impact analysis, freight-profit dual-axis views, and a pricing what-if simulator—empowering stakeholders to test pricing scenarios (e.g., +5% price → projected demand shift) and make revenue- and margin-aligned pricing decisions.'
    ]
  }

]

type ProjectFilter = Project['category'] | 'All'

const filters: ProjectFilter[] = ['All', 'Analytics Ops', 'AI & ML', 'Dashboards']

const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>('All')
  const prefersReduced = useReducedMotion()
  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return projects
    return projects.filter((p) => p.category === activeFilter)
  }, [activeFilter])

  return (
    <ScrollColorSection id="projects" className="relative section-wrapper scroll-mt-24 py-12 md:py-16 mx-auto max-w-6xl px-4 md:px-6">
      <h2 className="section-heading-sticky text-3xl sm:text-5xl font-extrabold text-gradient mb-3">Projects</h2>

      <div className="relative z-10 mt-8 flex flex-wrap items-center gap-2 text-xs sm:text-sm">
        {filters.map((filter) => {
          const isActive = filter === activeFilter
          return (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={
                isActive
                  ? 'rounded-full border border-purple-400/60 bg-purple-500/20 px-4 py-1.5 font-semibold text-purple-100 shadow-[0_0_0_1px_rgba(120,90,255,0.25)]'
                  : 'rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-slate-200/80 transition hover:border-purple-400/40 hover:text-slate-100'
              }
            >
              {filter}
            </button>
          )
        })}
      </div>

      <div className="relative z-10 mt-8 flex flex-col gap-6">
        {filteredProjects.map((p, idx) => {
          const delay = prefersReduced ? 0 : idx * 0.12
          return (
            <motion.div
              key={p.name}
              initial={prefersReduced ? undefined : { opacity: 0, y: 18 }}
              whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={prefersReduced ? undefined : { duration: 0.55, delay, ease: [0.2, 0.8, 0.2, 1] }}
              whileHover={{ y: -4 }}
            >
            <Card className="p-4 md:p-6">
              <div className="grid gap-6 lg:grid-cols-[3fr,2fr] items-start">
                {/* Left: text */}
                <div>
                  <div className="font-semibold text-lg text-slate-50 flex items-center">
                    <span>{p.name}</span>
                    {p.repo && (
                      <motion.a
                        href={p.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View ${p.name} on GitHub`}
                        className="ml-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold bg-white/5 border border-white/10 transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        whileInView={{ scale: 1.06, filter: 'brightness(1.16)', boxShadow: '0 8px 36px rgba(124,58,237,0.22)' }}
                        viewport={{ once: false, amount: 0.6 }}
                        transition={{ type: 'spring', stiffness: 160, damping: 18 }}
                        style={{ WebkitBackfaceVisibility: 'hidden' }}
                      >
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-slate-100" aria-hidden="true">
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.11.82-.26.82-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.238 1.84 1.238 1.07 1.835 2.807 1.305 3.492.997.108-.775.418-1.305.762-1.605-2.665-.303-5.466-1.333-5.466-5.93 0-1.31.468-2.38 1.235-3.22-.125-.303-.535-1.523.115-3.176 0 0 1.005-.322 3.3 1.23A11.49 11.49 0 0112 5.8c1.02.005 2.045.138 3.003.405 2.28-1.553 3.285-1.23 3.285-1.23.655 1.653.245 2.873.12 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.805 5.625-5.475 5.92.43.37.815 1.1.815 2.22 0 1.606-.015 2.897-.015 3.293 0 .32.215.695.825.577C20.565 21.795 24 17.296 24 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                        <span className="text-slate-100">View on GitHub</span>
                      </motion.a>
                    )}
                  </div>
                  {/* short description removed from card to avoid duplication with expanded details */}
                  <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-purple-100/90">
                    <span className="rounded-full border border-purple-400/30 bg-purple-500/10 px-3 py-1 uppercase tracking-[0.15em]">{p.category}</span>
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-slate-100/80">{p.metrics}</span>
                  </div>
                  <div className="mt-3 flex gap-2 flex-wrap">
                    {p.tech.map((t) => (
                      <span key={t} className="text-xs px-2 py-1 rounded-full bg-slate-900/60 border border-slate-200/15 text-slate-100">{t}</span>
                    ))}
                  </div>

                  <p className="mt-4 text-sm text-slate-200/80">{p.impact}</p>

                  <div className="mt-4">
                    <button
                      type="button"
                      onClick={() => {
                        // Toggle expanded state handled via data attribute on the card element
                        const el = document.getElementById(`project-${idx}`)
                        if (el) {
                          el.toggleAttribute('data-expanded')
                        }
                      }}
                      className="text-sm underline decoration-transparent hover:decoration-current hover:text-[hsl(var(--primary))]"
                    >
                      View details
                    </button>
                  </div>

                  {/* expanded area: full text/details — visible when data-expanded attribute set */}
                  <div id={`project-${idx}`} className="mt-4 hidden data-[expanded]:block">
                    <div className="text-sm text-[hsl(var(--foreground)/0.84)] space-y-2 leading-relaxed">
                      {p.details ? (
                        <ul className="list-disc ml-5 space-y-1 mt-2">
                          {p.details.map((d, i) => (
                            <li key={i}>{d}</li>
                          ))}
                        </ul>
                      ) : (
                        <ul className="list-disc ml-5 space-y-1">
                          <li>Key contributions, metrics, and implementation notes can be placed here.</li>
                          <li>Use this area to expand on the summary without navigating away.</li>
                        </ul>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right: media window */}
                <div>
                  <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.25 }} className="aspect-video w-full rounded-xl overflow-hidden border border-purple-500/30 bg-[#0d0b21]/50 backdrop-blur-sm flex items-center justify-center text-purple-300/60 text-lg font-medium tracking-wide transition-all duration-300 hover:border-purple-400/60 hover:text-purple-100 hover:shadow-[0_0_20px_rgba(140,120,255,0.25)]">
                    {p.media ? (
                      Array.isArray(p.media) ? (
                        <ProjectCarousel images={p.media} altBase={p.name} />
                      ) : (
                        <ProjectMedia src={p.media} alt={p.name} />
                      )
                    ) : (
                      <div>Demo</div>
                    )}
                  </motion.div>
                </div>
              </div>
            </Card>
          </motion.div>
          )
        })}
      </div>
    </ScrollColorSection>
  )
}

// Small media component that shows an image and falls back to a styled placeholder if the image fails to load.
const ProjectMedia: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
  const [failed, setFailed] = useState(false)

  if (!src || failed) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#0d0b21] to-[#1a1233] text-center p-4">
        <div className="text-sm text-purple-200/70">{alt}</div>
      </div>
    )
  }

  const isVideo = typeof src === 'string' && /\.(mp4|webm|ogg)$/i.test(src)

  if (isVideo) {
    return (
      <div className="w-full h-full relative bg-black flex items-center justify-center">
        <video controls className="w-full h-full object-cover" onError={() => setFailed(true)} src={src} />
        <a
          href={src}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute right-3 top-3 inline-flex items-center gap-2 rounded-full bg-black/50 px-2 py-1 text-xs text-white"
          aria-label="Open video in new tab"
        >
          Open
        </a>
      </div>
    )
  }

  return (
    <a href={src} target="_blank" rel="noopener noreferrer">
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover cursor-zoom-in"
        onError={() => setFailed(true)}
      />
    </a>
  )
}

// Small carousel component for project media arrays
const ProjectCarousel: React.FC<{ images: string[]; altBase: string }> = ({ images, altBase }) => {
  const [idx, setIdx] = useState(0)
  const [isHover, setIsHover] = useState(false)

  const prev = () => setIdx((i) => (i - 1 + images.length) % images.length)
  const next = () => setIdx((i) => (i + 1) % images.length)

  const controlsVisible = isHover

  return (
    <div className="relative w-full h-full" onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
      <a href={images[idx]} target="_blank" rel="noopener noreferrer">
        <img src={images[idx]} alt={`${altBase} (${idx + 1}/${images.length})`} className="w-full h-full object-cover cursor-zoom-in" />
      </a>

      {/* Left arrow */}
      <button
        onClick={prev}
        aria-label="Previous image"
        className={`absolute left-3 top-1/2 -translate-y-1/2 z-20 inline-flex items-center justify-center w-9 h-9 rounded-full bg-black/40 hover:bg-black/50 text-white transition-opacity duration-200 ${
          controlsVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Right arrow */}
      <button
        onClick={next}
        aria-label="Next image"
        className={`absolute right-3 top-1/2 -translate-y-1/2 z-20 inline-flex items-center justify-center w-9 h-9 rounded-full bg-black/40 hover:bg-black/50 text-white transition-opacity duration-200 ${
          controlsVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Dots */}
      <div className={`absolute left-1/2 -translate-x-1/2 bottom-3 z-20 flex gap-2 transition-opacity duration-200 ${controlsVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            aria-label={`Show image ${i + 1}`}
            className={`w-2 h-2 rounded-full ${i === idx ? 'bg-white' : 'bg-white/30'} transition`}
          />
        ))}
      </div>
    </div>
  )
}

export default Projects
