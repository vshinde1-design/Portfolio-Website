import React from 'react'
import { render, screen } from '@testing-library/react'
import Education from './Education'

describe('Education section', () => {
  it('renders education headings and certifications', () => {
    render(<Education />)
    const headings = screen.getAllByRole('heading', { level: 2 })
    expect(headings.some((h) => h.textContent?.trim().toLowerCase() === 'education')).toBeTruthy()
    expect(headings.some((h) => h.textContent?.trim().toLowerCase() === 'certifications')).toBeTruthy()
    expect(screen.getByText(/Power BI \(PL-300\)/i)).toBeInTheDocument()
  })
})
