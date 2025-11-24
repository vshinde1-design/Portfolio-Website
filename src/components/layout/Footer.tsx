import React from 'react'

const Footer: React.FC = () => {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-[hsl(var(--border)/0.08)] py-8">
      <div className="container flex items-center justify-between">
        <div>© {year} Vedant Shinde. All rights reserved.</div>
        <div className="flex gap-3">
          <a href="https://github.com/Vedantshi" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://linkedin.com/in/vedantshinde25" target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
