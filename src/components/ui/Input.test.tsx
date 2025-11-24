import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Input } from './Input'

describe('Input', () => {
  it('renders and supports typing', async () => {
    const user = userEvent.setup()
    render(<Input aria-label="name" />)
    const input = screen.getByLabelText(/name/i)
    await user.type(input, 'Vedant')
    expect((input as HTMLInputElement).value).toBe('Vedant')
  })
})
