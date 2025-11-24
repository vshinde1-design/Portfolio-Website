import React from 'react'
import { render, screen } from '@testing-library/react'
import { Card } from './Card'

describe('Card', () => {
  it('renders children and merges className', () => {
    render(<Card className="test-class">Hello</Card>)
    expect(screen.getByText('Hello')).toBeInTheDocument()
    const el = screen.getByText('Hello').closest('div')
    expect(el).toHaveClass('test-class')
  })
})
