import { describe, test, expect, beforeEach } from 'vitest'
import { render, fireEvent } from '@testing-library/react'
import Togglable from './Togglable'
import i18n from '../i18n'

describe('<Togglable />', () => {
  const buttonLabel = 'show'
  let component

  beforeEach(() => {
    component = render(
          <Togglable buttonLabel='show'>
              <div className='testDiv'>testDivContent</div>
          </Togglable>
    )
  })

  test('renders its children', () => {
    component.getByText('testDivContent')
  })

  test('after clicking the button, children are displayed', () => {
    const button = component.getByText(buttonLabel)
    fireEvent.click(button)

    const li = component.getByText('testDivContent')
    expect(li.parentNode).not.toHaveStyle('display: none')
  })

  test('toggled content can be closed', () => {
    const button = component.getByText(i18n.TOGGALE.CANCEL_BUTTON)
    fireEvent.click(button)

    const cancelButton = component.getByText(i18n.TOGGALE.CANCEL_BUTTON)
    fireEvent.click(cancelButton)

    const li = component.getByText('testDivContent')
    expect(li.parentNode).toHaveStyle('display: none')
  })
})
