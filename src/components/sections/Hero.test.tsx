import React from 'react'
import { render, screen } from '@testing-library/react'
import Hero from './Hero'

describe('Hero section', () => {
  it('renders heading and CTA', () => {
    render(<Hero />)
    const heading = screen.getByText(/Vedant Shinde/i)
    expect(heading).toBeInTheDocument()
    const cta = screen.getByRole('button', { name: /Get in Touch/i })
    expect(cta).toBeInTheDocument()
  })
})
