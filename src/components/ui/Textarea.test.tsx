import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Textarea } from './Textarea'

describe('Textarea', () => {
  it('renders and supports typing', async () => {
    const user = userEvent.setup()
    render(<Textarea aria-label="message" />)
    const ta = screen.getByLabelText(/message/i)
    await user.type(ta, 'Hello world')
    expect((ta as HTMLTextAreaElement).value).toBe('Hello world')
  })
})
