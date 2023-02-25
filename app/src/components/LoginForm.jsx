import { useState } from 'react'
import Togglable from './Togglable'
import loginService from '../services/login'
import noteService from '../services/notes'

export default function LoginForm ({ setUser, setErrorMessage }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    try {
      event.preventDefault()

      const user = await loginService.login({ username, password })

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )

      noteService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  return (
    <Togglable buttonLabel='Show login'>
        <form onSubmit={handleLogin}>
          <div>
            <input
              data-testid='username'
              type='text'
              value={username}
              name='Username'
              placeholder='Username'
              onChange={handleUsernameChange}
            />
          </div>
          <div>
            <input
              data-testid='password'
              type='password'
              value={password}
              name='Password'
              placeholder='Password'
              onChange={handlePasswordChange}
            />
          </div>
          <button type='submit'>login</button>
        </form>
    </Togglable>
  )
}
