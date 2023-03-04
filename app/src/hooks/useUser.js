import { useEffect, useState } from 'react'
import noteService from '../services/notes'
import loginService from '../services/login'

export const useUser = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
    if (loggedUserJSON) {
      const userResp = JSON.parse(loggedUserJSON)
      setUser(userResp)
      noteService.setToken(userResp.token)
    }
  }, [])

  const login = ({ username, password }) => {
    return loginService.login({ username, password }).then(() => {
      window.localStorage.setItem('loggedNoteAppUser', JSON.stringify(user))
      noteService.setToken(user.token)
      setUser(user)
    })
  }

  const logout = () => {
    window.localStorage.removeItem('loggedNoteAppUser')
    setUser(null)
  }

  return { user, login, logout }
}
