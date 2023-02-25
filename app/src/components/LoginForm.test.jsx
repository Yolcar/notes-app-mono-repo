import { describe, test, expect, vi } from 'vitest'
import { render, fireEvent } from '@testing-library/react'
import LoginForm from './LoginForm'

describe('<LoginForm />', () => {
  test('renders content', () => {
    const component = render(<LoginForm />)
    component.getByText('login')
  })

  test('test login form fails ', () => {
    const mockHandler = vi.fn()
    const component = render(<LoginForm loginUser={mockHandler} />)
    const button = component.getByText('login')
    const username = component.getByTestId('username')
    const password = component.getByTestId('password')
    fireEvent.change(username, { target: { value: 'test' } })
    fireEvent.change(password, { target: { value: 'test' } })
    fireEvent.click(button)
    expect(button).toHaveTextContent('login')
  })

  test('test login form ', () => {
    const mockHandler = vi.fn()
    const component = render(<LoginForm loginUser={mockHandler} />)
    const button = component.getByText('login')
    const username = component.getByTestId('username')
    const password = component.getByTestId('password')
    fireEvent.change(username, { target: { value: 'midudev' } })
    fireEvent.change(password, { target: { value: 'lamidupassword' } })
    fireEvent.click(button)
    expect(button).toHaveTextContent('login')
  })
})
