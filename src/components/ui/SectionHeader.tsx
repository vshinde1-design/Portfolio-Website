import React from 'react'
import clsx from 'clsx'

export type SectionHeaderProps = {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  actions?: React.ReactNode
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ eyebrow, title, description, align = 'left', actions }) => {
  const alignment = align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-left'

  return (
    <div className={clsx('relative z-10 flex w-full flex-col gap-2 sm:gap-3', alignment)}>
      {eyebrow && (
        <div className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.35em] text-slate-200/60">
          <span className="h-px w-8 bg-gradient-to-r from-slate-200/0 via-slate-200/60 to-slate-200/0" aria-hidden />
          <span>{eyebrow}</span>
          <span className="hidden h-px w-8 bg-gradient-to-r from-slate-200/0 via-slate-200/60 to-slate-200/0 sm:block" aria-hidden />
        </div>
      )}

      <div className="flex flex-col gap-3 sm:gap-4">
        <div className="flex flex-col gap-1 sm:gap-2 items-center">
          <h2 className="section-heading-sticky text-3xl sm:text-5xl font-extrabold text-gradient">{title}</h2>
          {description && (
            <p className="max-w-2xl text-sm text-slate-200/80 sm:text-base">
              {description}
            </p>
          )}
        </div>
        {actions && (
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-200/70 sm:text-sm">
            {actions}
          </div>
        )}
      </div>
    </div>
  )
}

export default SectionHeader
