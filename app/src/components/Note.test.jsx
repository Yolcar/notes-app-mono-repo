import { describe, test, expect, vi } from 'vitest'
import { render, fireEvent } from '@testing-library/react'
import Note from './Note'

describe('<Note />', () => {
  test('renders content', () => {
    const note = {
      content: 'This is a test note',
      important: true
    }

    const component = render(<Note note={note} />)

    component.getByText('This is a test note')
    component.getByText('make not important')
  })

  test('clicking the button calls event handler once', () => {
    const note = {
      content: 'This is a test note',
      important: false
    }

    const mockHandler = vi.fn()
    const component = render(
      <Note note={note} toggleImportance={mockHandler} />
    )

    const button = component.getByText('make important')
    fireEvent.click(button)

    expect(mockHandler).toHaveBeenCalled(1)
  })
})
