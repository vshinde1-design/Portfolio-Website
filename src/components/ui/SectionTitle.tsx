import React from 'react'

type SectionTitleProps = {
  title: string
  icon: React.ReactNode
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ title, icon }) => {
  return (
    <div className="flex items-center gap-3 justify-center">
      <span className="flex-shrink-0">{icon}</span>
      <h2 className="section-heading-sticky text-3xl sm:text-5xl font-extrabold text-gradient mb-6">{title}</h2>
    </div>
  )
}

export default SectionTitle
