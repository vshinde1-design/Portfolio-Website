import React from 'react'
import { render, screen } from '@testing-library/react'
import Navbar from './Navbar'

describe('Navbar', () => {
  it('renders Get in Touch button and navigation links', () => {
    render(<Navbar />)
    expect(screen.getByText(/Get in Touch/i)).toBeInTheDocument()
    expect(screen.getByText(/Experience/i)).toBeInTheDocument()
    // Theme toggle should not be visible
    const toggle = screen.queryByLabelText(/toggle theme/i)
    expect(toggle).toBeNull()
  })
})
