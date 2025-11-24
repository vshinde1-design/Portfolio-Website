import React from 'react'
import { motion } from 'framer-motion'
import clsx from 'clsx'

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'outline' }> = ({ children, variant = 'primary', className, disabled, ...props }) => {
  const base = 'relative inline-flex items-center justify-center gap-2 rounded-2xl font-medium transition-all duration-200 outline-none overflow-hidden'
  const primary = 'px-6 py-3 bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 text-white shadow-[0_18px_60px_rgba(90,60,200,0.45)] hover:shadow-[0_25px_70px_rgba(124,58,237,0.65)] hover:brightness-110 focus-visible:ring-4 focus-visible:ring-violet-400/30'
  const outline = 'px-5 py-2.5 border border-white/30 bg-white/5 text-slate-100 hover:border-white/60 hover:bg-white/10 backdrop-blur'
  const disabledCls = disabled ? 'opacity-60 cursor-not-allowed filter-none' : 'cursor-pointer'

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      whileHover={disabled ? undefined : { y: -2, scale: 1.015 }}
      className={clsx(base, variant === 'primary' ? primary : outline, disabledCls, className)}
      disabled={disabled}
      {...props}
    >
      {children}
    </motion.button>
  )
}
