import { Link, Route, Routes } from 'react-router-dom'
import Notes from './Notes'
import { NoteDetail } from './components/NoteDetail'
import { useState } from 'react'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import './App.css'
import { useUser } from './hooks/useUser'

const Home = () => <h1>Home</h1>

const Users = () => <h1>Users</h1>

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  const { logout } = useUser()
  const inlineStyle = {
    padding: 10
  }

  return (
    <div>
    <div className='flex items-center justify-between flex-wrap bg-teal-500 p-6'>
      <div className='text-sm lg:flex-grow'>
        <Link to='/' className='block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4'>Home</Link>
        <Link to='/notes' className='block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4'>Notes</Link>
        <Link to='/users' className='block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4'>Users</Link>
        {
          user
            ? (
                <em>Logged as {user.name} <button onClick={logout}>Logout</button></em>
              )
            : <Link to='/login' style={inlineStyle}>Login</Link>
        }
      </div>
    </div>

      <Notification message={errorMessage} />
      <Routes>
        <Route path='/login' element={<LoginForm setErrorMessage={setErrorMessage} setUser={setUser} />} />
        <Route path='/notes/:id' element={<NoteDetail />} />
        <Route path='/notes' element={<Notes setErrorMessage={setErrorMessage} />} />
        <Route path='/users' element={<Users />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
