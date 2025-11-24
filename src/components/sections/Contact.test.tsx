import React from 'react'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Contact from './Contact'

describe('Contact form', () => {
  it('validates and submits form (stub)', async () => {
    const user = userEvent.setup()
    render(<Contact />)

    // inputs are unlabeled (no for/id), so select textboxes in document order: name, email, message
    const textboxes = screen.getAllByRole('textbox')
    const name = textboxes[0]
    const email = textboxes[1]
    const message = textboxes[2]
    const send = screen.getByRole('button', { name: /Send Message/i })

    // invalid first: submit the form directly (button is disabled when invalid)
    const { container } = render(<Contact />)
    const form = container.querySelector('form')
    if (form) fireEvent.submit(form)
    expect(await screen.findByText(/Please complete required fields\./i)).toBeInTheDocument()

    // fill and submit
    await user.type(name, 'Vedant')
    await user.type(email, 'vedant@example.com')
    await user.type(message, 'Hello there')
    await user.click(send)

    // wait for the simulated sending->success (stub uses setTimeout 800ms)
    await waitFor(() => expect(screen.getByText(/Thanks — message queued \(stub\)./i)).toBeInTheDocument(), { timeout: 2000 })
  })
})
