import { NavLink } from 'react-router-dom';
import '../assets/css/Navbar.css';
import { useAuthContext } from '../hooks/useAuthContext';
import Avatar from './Avatar';

export default function Navbar() {
  const { user } = useAuthContext()

  return (
    <header className='navbar'>
      <nav>
        <NavLink to={'/'}><h1>DocShare</h1></NavLink>

        {!user ? (
          <ul>
            <li><NavLink to={'/login'}>Login</NavLink></li>
            <li><NavLink to={'/register'}>Register</NavLink></li>
          </ul>
        ) : (
          <div className='user-connected'>
            <p>{user.displayName}</p>
            <Avatar user={user} />
          </div>
        )}
      </nav>
    </header>
  )
}
