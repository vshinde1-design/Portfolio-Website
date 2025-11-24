import React from 'react'

const GlassContainer: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ children, className = '' }) => {
  return (
    <div className={`glass-container relative my-12 mx-6 sm:mx-12 lg:mx-20 ${className}`}>
      <div className="glass-inner p-6 sm:p-8 lg:p-10">{children}</div>
    </div>
  )
}

export default GlassContainer
