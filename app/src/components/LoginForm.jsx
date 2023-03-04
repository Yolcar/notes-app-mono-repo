import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks/useField'
import { useUser } from '../hooks/useUser'

export default function LoginForm ({ setUser, setErrorMessage }) {
  const username = useField({ type: 'text' })
  const password = useField({ type: 'password' })
  const { login } = useUser()
  const navigate = useNavigate()

  const handleLogin = async (event) => {
    event.preventDefault()

    login({ username: username.value, password: password.value }).then(() => {
      navigate('/notes')
    })
      .catch(() => {
        setErrorMessage('Wrong credentials')
        setTimeout(() => {
          setErrorMessage(null)
        }, 2000)
      })
  }

  return (
      <form onSubmit={handleLogin}>
        <div>
          <input
            {...username}
            data-testid='username'
            name='Username'
            placeholder='Username'
          />
        </div>
        <div>
          <input
            {...password}
            data-testid='password'
            value={password}
            placeholder='Password'
          />
        </div>
        <button type='submit'>login</button>
      </form>
  )
}
