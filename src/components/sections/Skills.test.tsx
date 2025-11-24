import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Skills from './Skills'

describe('Skills section', () => {
  it('renders skill groups and updates description on selection', async () => {
    const user = userEvent.setup()
    render(<Skills />)

    expect(screen.getByText(/Programming/i)).toBeInTheDocument()
    expect(screen.getByText(/Data Visualization/i)).toBeInTheDocument()
    const hint = /Click any badge to see how I use that tool in analytics work/i
    expect(screen.getByText(hint)).toBeInTheDocument()

    const sqlButton = screen.getByRole('button', { name: 'SQL' })
    expect(screen.queryByText(/Query language for shaping relational data/i)).not.toBeInTheDocument()
    await user.click(sqlButton)

    expect(screen.queryByText(hint)).not.toBeInTheDocument()
    expect(screen.getByText(/Query language for shaping relational data/i)).toBeInTheDocument()

    await user.click(sqlButton)
    expect(screen.getByText(hint)).toBeInTheDocument()
    expect(screen.queryByText(/Query language for shaping relational data/i)).not.toBeInTheDocument()
  })
})
