import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import OnlineUsers from './components/OnlineUsers';
import Sidebar from './components/Sidebar';
import { useAuthContext } from './hooks/useAuthContext';
import CreateDoc from './screens/CreateDoc';
import Dashboard from './screens/Dashboard';
import Login from './screens/Login';
import Register from './screens/Register';
import UpdateDoc from './screens/UpdateDoc';

function App() {
  const { user, authIsReady } = useAuthContext()

  return (
    <div className='App'>
      {authIsReady && (
        <BrowserRouter>
          {user && <Sidebar />}
          <div className="container">
            <Navbar />
            {/* {user && <OnlineUsers />} */}
            <Routes>
              <Route path='/' element={user ? <Dashboard /> : <Navigate to={'/login'} />} />
              <Route path='/documents' element={user ? <Dashboard /> : <Navigate to={'/login'} />} />
              <Route path='/create/documents' element={user ? <CreateDoc /> : <Navigate to={'/login'} />} />
              <Route path='/update/documents/:id' element={user ? <UpdateDoc /> : <Navigate to={'/login'} />} />
              <Route path='/login' element={!user ? <Login /> : <Navigate to={'/'} />} />
              <Route path='/register' element={!user ? <Register /> : <Navigate to={'/'} />} />
            </Routes>
          </div>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
