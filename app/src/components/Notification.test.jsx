import { describe, test, expect } from 'vitest'
import { render } from '@testing-library/react'
import Notification from './Notification'

describe('<Notification />', () => {
  test('renders content', () => {
    const message = 'This is a test notification'
    const component = render(<Notification message={message} />)

    component.getByText(message)
  })

  test('renders no content', () => {
    const message = null
    const component = render(<Notification message={message} />)

    expect(component.container).toBeEmptyDOMElement()
  })
})
