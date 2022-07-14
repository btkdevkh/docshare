import '../assets/css/Sidebar.css';
import { NavLink } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import useSignout from '../hooks/useSignout';

export default function Sidebar() {
  const { logout } = useSignout()
  const { user } = useAuthContext()

  return (
    <div className='sidebar'>
      <div className="sidebar-content">
        <div className="user">
        </div>
        <nav>
          <ul>
            <li>
              <NavLink to={'/'}>
                <i className="fa-solid fa-gauge"></i>
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={'/documents'}>
                <i className="fa-solid fa-file"></i>
                <span>Documents</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={'/create/documents'}>
                <i className="fa-solid fa-upload"></i>
                <span>Upload Docs</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>

      {user &&
      <button 
        type='button' 
        className='logout'
        onClick={logout}
      >
        <i className="fa-solid fa-right-from-bracket"></i>
      </button>}
    </div>
  )
}
