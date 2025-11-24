import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Projects from './Projects'

describe('Projects section', () => {
  it('renders project list and can expand details', async () => {
    const user = userEvent.setup()
    render(<Projects />)
    const proj = screen.getByText(/AI-Driven Personalization Strategy for The Webster/i)
    expect(proj).toBeInTheDocument()
    const btn = screen.getAllByText(/View details/i)[0]
    await user.click(btn)
    // the component toggles a data-expanded attribute on the project element
    const el = document.getElementById('project-0')
    expect(el).toBeTruthy()
    expect(el?.hasAttribute('data-expanded')).toBe(true)
  })
})
